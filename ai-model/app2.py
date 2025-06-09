import os
from flask import Flask, request, render_template
from dotenv import load_dotenv
import whisper

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

@app.route('/', methods=['GET', 'POST'])
def index():
    response = None
    transcribed_text = None

    if request.method == 'POST':
        text_input = request.form.get('text_input')
        audio_file = request.files.get('audio_file')

        if text_input:
            response = chain.invoke({"input": text_input})

        elif audio_file and audio_file.filename != '':
            audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file.filename)
            audio_file.save(audio_path)
            transcribed_text = whisper_model.transcribe(audio_path)["text"]
            response = chain.invoke({"input": transcribed_text})

    return render_template('index2.html', response=response, transcript=transcribed_text)

if __name__ == '__main__':
    app.run(debug=True)
