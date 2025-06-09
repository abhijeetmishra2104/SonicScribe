from flask import Flask, render_template, request
import pickle
import numpy as np
import os

app = Flask(__name__)

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'model4.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/', methods=['GET', 'POST'])
def index4():
    risk = None
    decision = None

    if request.method == 'POST':
        try:
            # Get form values
            age = int(request.form['age'])
            gender = int(request.form['gender'])
            primary_diagnosis = int(request.form['primary_diagnosis'])
            num_procedures = int(request.form['num_procedures'])
            days_in_hospital = int(request.form['days_in_hospital'])
            comorbidity_score = int(request.form['comorbidity_score'])
            discharge_to = int(request.form['discharge_to'])

            # Input for model
            features = np.array([[age, gender, primary_diagnosis, num_procedures,
                                  days_in_hospital, comorbidity_score, discharge_to]])

            # Predict risk (probability)
            risk = model.predict_proba(features)[0][1] * 100
            decision = "Hospitalize Patient" if risk > 50 else "No Hospitalization Needed"
        except Exception as e:
            print("Error:", e)

    return render_template('index4.html', risk=risk, decision=decision)

if __name__ == '__main__':
    app.run(debug=True)
