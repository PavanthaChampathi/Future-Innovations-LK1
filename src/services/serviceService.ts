import { apiClient, API_ENDPOINTS } from '../config/api';

export interface Service {
  id: number;
  name: string;
  category: string;
  material: string;
  price: number;
  unit: string;
  description?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  name: string;
  category: string;
  material: string;
  price: number;
  unit: string;
  description?: string;
  active?: boolean;
}

export const serviceService = {
  async getAll(activeOnly = false): Promise<Service[]> {
    const url = activeOnly ? `${API_ENDPOINTS.SERVICES}?active=true` : API_ENDPOINTS.SERVICES;
    return apiClient.get(url, false);
  },

  async getById(id: number): Promise<Service> {
    return apiClient.get(`${API_ENDPOINTS.SERVICES}/${id}`, false);
  },

  async create(service: ServiceRequest): Promise<Service> {
    return apiClient.post(API_ENDPOINTS.SERVICES, service);
  },

  async update(id: number, service: ServiceRequest): Promise<Service> {
    return apiClient.put(`${API_ENDPOINTS.SERVICES}/${id}`, service);
  },

  async toggle(id: number): Promise<Service> {
    return apiClient.patch(`${API_ENDPOINTS.SERVICES}/${id}/toggle`, {});
  },

  async delete(id: number): Promise<{ message: string }> {
    return apiClient.delete(`${API_ENDPOINTS.SERVICES}/${id}`);
  }
};