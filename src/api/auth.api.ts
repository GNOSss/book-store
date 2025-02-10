import { SignupProps } from '@/pages/Signup';
// import { SignupProps } from '@pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post('/users/join', userData);
  return response.data;
};

export const resetRequest = async (userData: SignupProps) => {
  const response = await httpClient.post('/users/reset', userData);
  return response.data;
};

export const resetPassword = async (userData: SignupProps) => {
  const response = await httpClient.put('/users/reset', userData);
  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (userData: SignupProps) => {
  const response = await httpClient.post<LoginResponse>('/users/login', userData);
  return response.data;
};
