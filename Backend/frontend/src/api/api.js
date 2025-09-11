import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',  // Asegúrate de que esta URL esté correcta
});

// Configura los encabezados para el token si está presente
const token = localStorage.getItem('campus.token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
