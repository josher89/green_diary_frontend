import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Might be http://localhost:8000
});

export default api; // Might be instance