import apiClient from './api';

export const loginUser = async (email: string, password: string) => {
  return apiClient.post('/auth/login', { email, password });
};

export const registerUser = async (name: string, email: string, password: string) => {
  return apiClient.post('/auth/register', { name, email, password });
};

export const getProfile = async () => {
  return apiClient.get('/auth/profile');
};
