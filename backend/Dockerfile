FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libffi-dev \
    libssl-dev \
    libblas-dev \
    liblapack-dev \
    && apt-get clean

# Set the working directory to /backend
WORKDIR /backend

# Copy application code and model files into the container
COPY server.py .
COPY xgb_model.pkl .
COPY word2vec_genres.model .
COPY label_encoder.pkl .
COPY requirements.txt .

# Install dependencies from requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose the port for the app
EXPOSE 5000

# Set the command to run the app
CMD ["python", "server.py"]
