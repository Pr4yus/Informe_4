import api from './api.js';

export const register = (data) => api.post('/auth/register', data); 
export const login = (data) => api.post('/auth/login', data);
export const forgot = (data) => api.post('/auth/forgot', data);
