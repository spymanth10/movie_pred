import joblib
import gensim
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)


# Load the model files
try:
    xgb_model = joblib.load('xgb_model.pkl')
    word2vec = gensim.models.Word2Vec.load('word2vec_genres.model')
    label_encoder = joblib.load("label_encoders.pkl")
    companies_encoder = label_encoder['companies_encoder']
    credits_encoder = label_encoder['credits_encoder']
except Exception as e:
    print(f"Error loading model files: {e}")
    exit(1)

def preprocess_input(sample):
    # Process genres
    genres = sample.get('genres', [])
    genre_embedding = np.mean([word2vec.wv[g] for g in genres if g in word2vec.wv], axis=0)
    if genre_embedding.size == 0:
        genre_embedding = np.zeros(word2vec.vector_size)

    # Process production companies
    companies = sample.get('production_companies', [])
    companies_encoded = sum(label_encoder.transform([c])[0] for c in companies if c in label_encoder.classes_)
    # Process credits
    credits = sample.get('credits', [])
    credits_encoded = sum(credits_encoder.transform([c])[0] for c in credits if c in credits_encoder.classes_)

    # Combine features
    features = [
        sample.get('level_0', 0),
        sample.get('popularity', 0),
        sample.get('budget', 0),
        sample.get('runtime', 0),
        sample.get('vote_average', 0),
        sample.get('vote_count', 0),
        sample.get('release_month', 0),
        *genre_embedding,
        companies_encoded,
        credits_encoded
    ]
    return np.array(features).reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    
    try:
        processed_data = preprocess_input(data)
        prediction = xgb_model.predict(processed_data)
        return jsonify({'revenue': float(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
