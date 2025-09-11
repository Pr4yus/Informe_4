import api from './api.js';
export const list = () => api.get('/users');
export const getByRegistro = (registro) => api.get(`/users/${encodeURIComponent(registro)}`);
export const getMe = () => api.get('/users/me/profile');
export const updateMe = (data) => api.put('/users/me/profile', data);

export const getCoursesByRegistro = (registro) =>
  api.get(`/users/${encodeURIComponent(registro)}/courses`);

export const getMyCourses = () => api.get('/users/me/courses');
export const addMyCourse = (courseId) => api.post('/users/me/courses', { courseId });
export const removeMyCourse = (courseId) => api.delete(`/users/me/courses/${courseId}`);
