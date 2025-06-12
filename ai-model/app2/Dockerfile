FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ai-model/app1/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ai-model/app1/app.py .


EXPOSE 5000

CMD ["python", "app.py"]
