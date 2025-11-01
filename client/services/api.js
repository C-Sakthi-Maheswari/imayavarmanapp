import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // change port if needed
});

export default api;
