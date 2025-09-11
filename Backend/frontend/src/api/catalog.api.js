import api from './api.js';

export const getCourses = (q = '') => api.get('/catalog/courses', { params: q ? { q } : {} });
export const getTeachers = (q = '') => api.get('/catalog/teachers', { params: q ? { q } : {} });
