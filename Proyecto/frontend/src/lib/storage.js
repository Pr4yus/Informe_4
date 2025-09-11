const KEY = 'campus.token';
export const getToken = () => localStorage.getItem(KEY) || null;
export const setToken = (t) => localStorage.setItem(KEY, t);
export const clearToken = () => localStorage.removeItem(KEY);
