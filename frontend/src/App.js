import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    level_0: 0,
    popularity: 0,
    budget: 0,
    runtime: 0,
    vote_average: 0,
    vote_count: 0,
    release_month: 1,
    genres: [],
    production_companies: [],
    credits: []
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      console.log(formData);
      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const result = await response.json();
      setPrediction(result.revenue);
    } catch (err) {
      setError('An error occurred while making the prediction.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'genres' || name === 'production_companies' || name === 'credits' 
        ? value.split(',').map(item => item.trim()) 
        : name === 'release_month' ? parseInt(value, 10) : parseFloat(value)
    }));
  };

  return (
    <div className="app">
      <div className="content">
        <h1 className="netflix-logo">Netflix</h1>
        <h2 className="title">Predictive Revenue System</h2>
        
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="popularity">Popularity</label>
              <input
                type="number"
                id="popularity"
                name="popularity"
                placeholder="Enter popularity score"
                value={formData.popularity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="vote_count">Vote Count</label>
              <input
                type="number"
                id="vote_count"
                name="vote_count"
                placeholder="Enter pre-release vote count here"
                value={formData.vote_count}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="vote_average">Vote Average</label>
              <input
                type="number"
                id="vote_average"
                name="vote_average"
                placeholder="Enter pre-release vote average here"
                value={formData.vote_average}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                id="budget"
                name="budget"
                placeholder="Enter movie budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="runtime">Runtime (minutes)</label>
              <input
                type="number"
                id="runtime"
                name="runtime"
                placeholder="Enter movie runtime"
                value={formData.runtime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="genres">Genres (comma-separated)</label>
              <input
                type="text"
                id="genres"
                name="genres"
                placeholder="Enter genres (e.g., Action, Drama)"
                value={formData.genres.join(', ')}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="production_companies">Production Companies (comma-separated)</label>
              <input
                type="text"
                id="production_companies"
                name="production_companies"
                placeholder="Enter production companies"
                value={formData.production_companies.join(', ')}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="credits">Cast (comma-separated)</label>
              <input
                type="text"
                id="credits"
                name="credits"
                placeholder="Enter Cast"
                value={formData.credits.join(', ')}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label htmlFor="release_month">Release Month</label>
              <select
                id="release_month"
                name="release_month"
                value={formData.release_month}
                onChange={handleChange}
                required
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={i+1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="predict-button">
              Predict Success
            </button>
          </form>
        </div>

        {prediction && (
          <div className="prediction-result">
            <h3>Predicted Revenue:</h3>
            <p>${prediction.toLocaleString()}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;