import { apiClient, API_ENDPOINTS } from '../config/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials, false);
    apiClient.setToken(response.token);
    return response;
  },

  async verify(): Promise<{ user: User }> {
    return apiClient.get(API_ENDPOINTS.VERIFY);
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    });
  },

  logout() {
    apiClient.clearToken();
  }
};