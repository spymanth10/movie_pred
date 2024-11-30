import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Make sure Flask server is running here
});

export const predictRevenue = async (sample) => {
    try {
        const response = await api.post('/predict', { sample });  // Ensure this is a POST request
        return response.data;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
};
