import { api } from '..';

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UseAuthReturn = {
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
};

export const useAuth = (): UseAuthReturn => {
  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { login };
};
