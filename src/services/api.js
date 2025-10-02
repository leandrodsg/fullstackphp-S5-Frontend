import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service API functions
export const serviceAPI = {
  // Get all services for the authenticated user
  getAll: () => api.get('/services'),
  
  // Get a specific service by ID
  getById: (id) => api.get(`/services/${id}`),
  
  // Create a new service
  create: (serviceData) => api.post('/services', serviceData),
  
  // Update an existing service
  update: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  
  // Delete a service
  delete: (id) => api.delete(`/services/${id}`),
  
  // Get service statistics/summary
  getStats: () => api.get('/services/stats')
};

// Subscription API functions
export const subscriptionAPI = {
  // Get all subscriptions for the authenticated user
  getAll: () => api.get('/subscriptions'),
  
  // Get a specific subscription by ID
  getById: (id) => api.get(`/subscriptions/${id}`),
  
  // Create a new subscription
  create: (subscriptionData) => api.post('/subscriptions', subscriptionData),
  
  // Update an existing subscription
  update: (id, subscriptionData) => api.put(`/subscriptions/${id}`, subscriptionData),
  
  // Partially update a subscription
  patch: (id, subscriptionData) => api.patch(`/subscriptions/${id}`, subscriptionData),
  
  // Cancel a subscription
  cancel: (id) => api.patch(`/subscriptions/${id}/cancel`),
  
  // Reactivate a subscription
  reactivate: (id) => api.patch(`/subscriptions/${id}/reactivate`),
  
  // Delete a subscription
  delete: (id) => api.delete(`/subscriptions/${id}`),
  
  // Get subscription statistics/summary
  getStats: () => api.get('/subscriptions/stats')
};

// Reports API functions
export const getReports = async (filters = {}) => {
  // This function is deprecated - use subscriptionAPI.getAll() instead
  console.warn('getReports is deprecated. Use subscriptionAPI.getAll() instead.');
  return subscriptionAPI.getAll();
};

export const exportReports = async (filters = {}) => {
  try {
    // Get all subscriptions using the correct endpoint
    const response = await subscriptionAPI.getAll();
    let subscriptions = response.data || [];
    
    // Apply filters
    if (filters.dateFrom) {
      const filterDate = new Date(filters.dateFrom);
      subscriptions = subscriptions.filter(sub => {
        const subDate = new Date(sub.created_at);
        return subDate >= filterDate;
      });
    }
    
    if (filters.service && filters.service !== 'all') {
      subscriptions = subscriptions.filter(sub => 
        sub.service_name && sub.service_name.toLowerCase().includes(filters.service.toLowerCase())
      );
    }
    
    if (filters.status && filters.status !== 'all') {
      subscriptions = subscriptions.filter(sub => sub.status === filters.status);
    }
    
    // Generate CSV content
    const csvHeaders = ['Service Name', 'Price', 'Billing Cycle', 'Status', 'Start Date', 'Next Billing'];
    const csvRows = subscriptions.map(sub => [
      sub.service_name || 'N/A',
      sub.price || '0',
      sub.billing_cycle || 'monthly',
      sub.status || 'active',
      sub.created_at || 'N/A',
      sub.next_billing_date || 'N/A'
    ]);
    
    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    // Create blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return blob;
  } catch (error) {
    console.error('Error exporting reports:', error);
    throw error;
  }
};

export default api;