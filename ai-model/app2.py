import os
from flask import Flask, request, render_template
from dotenv import load_dotenv
import whisper
import requests
import json 

# Load environment variables
load_dotenv()
os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = os.getenv("LANGCHAIN_PROJECT")

# Langchain setup
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o")

prompt = ChatPromptTemplate.from_messages([
    ("system", '''You are a professional healthcare assistant. The user will enter their symptoms. 
                  Based on the symptoms, provide:
                  1. Probable conditions (up to 3).
                  2. Triage level: Emergency / Urgent / Non-Urgent.
                  3. Specialist to consult.
                  Always advise consulting a real doctor.'''),
    ("user", "{input}")
])
chain = prompt | llm | StrOutputParser()

# Whisper model
whisper_model = whisper.load_model("base")

# Flask app setup
app = Flask(__name__)
UPLOAD_FOLDER = 'audio'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Utility to determine bounding box from coordinates (static for now)
with open("city_bboxes.json", "r") as f:
    city_bboxes = json.load(f) 

def generate_overpass_query(specialty, bbox):
    return f"""
    [out:json][timeout:25];
    (
      node["amenity"="hospital"]({bbox});
      way["amenity"="hospital"]({bbox});
      relation["amenity"="hospital"]({bbox});
    );
    out center;
    """

def get_hospitals_from_overpass(query):
    url = "https://overpass-api.de/api/interpreter"
    try:
        response = requests.post(url, data={"data": query})
        if response.status_code == 200:
            return response.json().get("elements", [])
    except Exception as e:
        print("Error querying Overpass API:", e)
    return []

@app.route('/', methods=['GET', 'POST'])
def index():
    response = None
    transcribed_text = None
    hospitals = []
    location = ""
    map_points = []

    if request.method == 'POST':
        text_input = request.form.get('text_input')
        audio_file = request.files.get('audio_file')
        location = request.form.get('location', '').lower()

        if text_input:
            response = chain.invoke({"input": text_input})
        elif audio_file and audio_file.filename != '':
            audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file.filename)
            audio_file.save(audio_path)
            transcribed_text = whisper_model.transcribe(audio_path)["text"]
            response = chain.invoke({"input": transcribed_text})

        if response and location in city_bboxes:
            lines = response.split('\n')
            specialist = "doctor"
            for line in lines:
                if "Specialist" in line:
                    specialist = line.split(':')[-1].strip()
                    break
            query = generate_overpass_query(specialist, city_bboxes[location])
            hospitals = get_hospitals_from_overpass(query)

            for h in hospitals:
                lat = h.get('lat') or h.get('center', {}).get('lat')
                lon = h.get('lon') or h.get('center', {}).get('lon')
                name = h.get('tags', {}).get('name', 'Unknown Hospital')
                info = []
                if 'addr:street' in h.get('tags', {}):
                    info.append(h['tags']['addr:street'])
                if 'addr:city' in h.get('tags', {}):
                    info.append(h['tags']['addr:city'])
                if 'phone' in h.get('tags', {}):
                    info.append("Phone: " + h['tags']['phone'])

                popup_info = f"{name}<br>{'<br>'.join(info)}"
                
                if lat and lon:
                    map_points.append({"lat": lat, "lon": lon, "info": popup_info})


    return render_template('index2.html', response=response, transcript=transcribed_text,
                           hospitals=hospitals, location=location, map_points=map_points)

if __name__ == '__main__':
    app.run(debug=True)