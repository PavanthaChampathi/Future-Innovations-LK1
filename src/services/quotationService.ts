import { apiClient, API_ENDPOINTS } from '../config/api';

export interface QuotationRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: string;
  material: string;
  quantity: number;
  files: File[];
}

export interface Quotation {
  id: number;
  quote_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_type: string;
  material: string;
  quantity: number;
  estimated_price: number;
  delivery_time: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  files?: string[];
}

export interface QuotationResponse {
  quoteId: string;
  estimatedPrice: number;
  deliveryTime: string;
  message: string;
}

export const quotationService = {
  async create(request: QuotationRequest): Promise<QuotationResponse> {
    const formData = new FormData();
    
    // Add form fields
    formData.append('customerName', request.customerName);
    formData.append('customerEmail', request.customerEmail);
    if (request.customerPhone) {
      formData.append('customerPhone', request.customerPhone);
    }
    formData.append('serviceType', request.serviceType);
    formData.append('material', request.material);
    formData.append('quantity', request.quantity.toString());
    
    // Add files
    request.files.forEach(file => {
      formData.append('files', file);
    });

    return apiClient.postFormData(API_ENDPOINTS.QUOTATIONS, formData, false);
  },

  async getAll(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    quotations: Quotation[];
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

    const url = `${API_ENDPOINTS.QUOTATIONS}?${searchParams.toString()}`;
    return apiClient.get(url);
  },

  async getById(id: number): Promise<Quotation> {
    return apiClient.get(`${API_ENDPOINTS.QUOTATIONS}/${id}`);
  },

  async updateStatus(id: number, status: string, notes?: string): Promise<Quotation> {
    return apiClient.patch(`${API_ENDPOINTS.QUOTATIONS}/${id}/status`, {
      status,
      notes
    });
  },

  async convertToOrder(id: number, deadline?: string, notes?: string): Promise<{ orderId: string; message: string }> {
    return apiClient.post(`${API_ENDPOINTS.QUOTATIONS}/${id}/convert-to-order`, {
      deadline,
      notes
    });
  }
};