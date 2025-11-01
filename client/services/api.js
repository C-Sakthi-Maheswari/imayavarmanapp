// frontend/api.js

import axios from 'axios';

// Replace 'localhost' with your PC IP if testing on real device
const API_BASE = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export default api;
