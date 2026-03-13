
import { apiRequest } from './api';

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  role: 'student' | 'developer' | 'freelancer' | 'other';
  email: string;
  password: string;
};

// LOGIN
export async function login(email: string, password: string) {
  return apiRequest<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// REGISTER
export async function register(data: RegisterPayload) {
  return apiRequest<{ message: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
