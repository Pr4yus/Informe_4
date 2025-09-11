import api from './api.js';

export const getAll = (filters = {}) => api.get('/posts', { params: filters });
export const getById = (id) => api.get(`/posts/${id}`);
export const create = (payload) => api.post('/posts', payload);

export const getComments = (id) => api.get(`/posts/${id}/comments`);
export const addComment = (id, payload) => api.post(`/posts/${id}/comments`, payload);

