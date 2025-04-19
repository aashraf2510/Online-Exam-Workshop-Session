import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginAdapterResponse {
  message: string;
  token: string;
  email: string;
  id: string;
  role: string;
}
