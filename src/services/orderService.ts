import { apiClient, API_ENDPOINTS } from '../config/api';

export interface Order {
  id: number;
  order_id: string;
  quotation_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_type: string;
  material: string;
  quantity: number;
  total_amount: number;
  status: string;
  progress: number;
  deadline?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  files?: string[];
}

export interface OrderStats {
  total: number;
  byStatus: { status: string; count: string }[];
  revenue: number;
  recent: {
    order_id: string;
    customer_name: string;
    service_type: string;
    status: string;
    total_amount: number;
    created_at: string;
  }[];
}

export const orderService = {
  async getAll(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const url = `${API_ENDPOINTS.ORDERS}?${searchParams.toString()}`;
    return apiClient.get(url);
  },

  async getById(id: number): Promise<Order> {
    return apiClient.get(`${API_ENDPOINTS.ORDERS}/${id}`);
  },

  async update(id: number, updates: {
    status?: string;
    progress?: number;
    notes?: string;
  }): Promise<Order> {
    return apiClient.patch(`${API_ENDPOINTS.ORDERS}/${id}`, updates);
  },

  async getStats(): Promise<OrderStats> {
    return apiClient.get(API_ENDPOINTS.ORDER_STATS);
  }
};