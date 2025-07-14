// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY: `${API_BASE_URL}/auth/verify`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  
  // Quotations
  QUOTATIONS: `${API_BASE_URL}/quotations`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_STATS: `${API_BASE_URL}/orders/stats/dashboard`,
  
  // Services
  SERVICES: `${API_BASE_URL}/services`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`
};

// API client with authentication
class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }
    return response.json();
  }

  async get(url: string, includeAuth = true) {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(includeAuth),
    });
    return this.handleResponse(response);
  }

  async post(url: string, data: any, includeAuth = true) {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(includeAuth),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async postFormData(url: string, formData: FormData, includeAuth = true) {
    const headers: HeadersInit = {};
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });
    return this.handleResponse(response);
  }

  async put(url: string, data: any, includeAuth = true) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(includeAuth),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async patch(url: string, data: any, includeAuth = true) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(includeAuth),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete(url: string, includeAuth = true) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(includeAuth),
    });
    return this.handleResponse(response);
  }
}

export const apiClient = new ApiClient();