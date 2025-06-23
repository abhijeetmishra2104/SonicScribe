from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow cross-origin requests from frontend if needed

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'model4.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        age = int(data['age'])
        gender = int(data['gender'])
        primary_diagnosis = int(data['primaryDiagnosis'])
        num_procedures = int(data['numProcedures'])
        days_in_hospital = int(data['daysInHospital'])
        comorbidity_score = int(data['comorbidityScore'])
        discharge_to = int(data['dischargeTo'])

        import pandas as pd
        features = pd.DataFrame([[age, gender, primary_diagnosis, num_procedures,
                                  days_in_hospital, comorbidity_score, discharge_to]],
                                columns=["age", "gender", "primary_diagnosis", "num_procedures",
                                         "days_in_hospital", "comorbidity_score", "discharge_to"])

        risk = model.predict_proba(features)[0][1] * 100
        decision = "Hospitalize Patient" if risk > 50 else "No Hospitalization Needed"

        return jsonify({
            "risk": risk,
            "decision": decision
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal server error"}), 500

