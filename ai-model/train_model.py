import numpy as np
import pandas as pd
import pickle
test = pd.read_csv(r'C:\Users\vaimi\OneDrive\Desktop\SonicScribe\ai-model\Dataset\train_cyf.csv')
train=pd.read_csv(r'C:\Users\vaimi\OneDrive\Desktop\SonicScribe\ai-model\Dataset\train_cyf.csv')
from sklearn.preprocessing import LabelEncoder
# Categorical data -> numerical data  (using LabelEncoding)

categorical_cols = ['gender', 'primary_diagnosis', 'discharge_to']
label_encoders = {}

for col in categorical_cols:
    encoder = LabelEncoder()
    train[col] = encoder.fit_transform(train[col])
    test[col] = encoder.transform(test[col])
    label_encoders[col] = encoder
X_train=train.drop(columns="readmitted")
y_train=train["readmitted"]
X_test=test.drop(columns="readmitted")
y_test=test["readmitted"]
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
# Predictions (0 or 1)
y_pred = model.predict(X_test)

# Risk scores (probability of readmission)
y_proba = model.predict_proba(X_test)[:, 1]  # Probability of class 1 (readmitted)
from sklearn.metrics import roc_auc_score, classification_report

print("ROC-AUC Score:", roc_auc_score(y_test, y_proba))
print("Classification Report:\n", classification_report(y_test, y_pred))
for i in range(len(X_test)):
    risk = y_proba[i] * 100  # percentage
    decision = "Admit" if risk > 50 else "No Need to Admit"
    print(f"Patient {i+1}: Risk = {risk:.2f}% -> {decision}")


with open('model4.pkl', 'wb') as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as model4.pkl")
