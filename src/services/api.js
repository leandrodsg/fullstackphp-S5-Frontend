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

export default api;