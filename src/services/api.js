import axios from 'axios';

// Criando instância do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
});

// Implementando lógica de retry para lidar com serviços Render em free tier
api.interceptors.response.use(undefined, async (err) => {
  const { config, message } = err;
  
  // Se não for um erro de timeout ou já tentou retry, rejeita normalmente
  if (!message.includes('timeout') || config._retry) {
    return Promise.reject(err);
  }
  
  // Configuração para retry
  config._retry = true;
  config.timeout = 180000; // Aumenta ainda mais o timeout para retry
  
  // Espera 3 segundos antes de tentar novamente (para dar tempo do serviço "acordar")
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Tenta novamente com a mesma configuração
  return axios(config);
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
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

// Profile API functions
export const profileAPI = {
  // Get user profile data
  get: () => api.get('/profile'),
  
  // Update user profile data
  update: (profileData) => api.put('/profile', profileData),
  
  // Change user password
  changePassword: (passwordData) => api.put('/change-password', passwordData)
};

// Reports API functions
export const getReports = async (filters = {}) => {
  // This function is deprecated - use subscriptionAPI.getAll() instead
  console.warn('getReports is deprecated. Use subscriptionAPI.getAll() instead.');
  return subscriptionAPI.getAll();
};

// Helper function to format date for display
const formatDateForExport = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
};

// Helper function to format price for display
const formatPriceForExport = (price, currency = 'USD') => {
  if (!price) return '0.00';
  const numPrice = parseFloat(price);
  if (currency === 'BRL') {
    return `R$ ${numPrice.toFixed(2).replace('.', ',')}`;
  }
  return `$${numPrice.toFixed(2)}`;
};

// Helper function to get status display text
const getStatusDisplayText = (status) => {
  const statusMap = {
    'active': 'Active',
    'pending': 'Pending',
    'canceled': 'Canceled',
    'cancelled': 'Canceled'
  };
  return statusMap[status] || status || 'Active';
};

// Helper function to get billing cycle display text
const getBillingCycleDisplayText = (cycle) => {
  const cycleMap = {
    'monthly': 'Mensal',
    'yearly': 'Anual',
    'weekly': 'Semanal',
    'daily': 'Diário'
  };
  return cycleMap[cycle] || cycle || 'Mensal';
};

export const exportReports = async (format, filters = {}) => {
  try {
    // Get all subscriptions using the correct endpoint
    const response = await subscriptionAPI.getAll();
    let subscriptions = response.data.data || response.data || [];
    
    // Apply basic filters
    if (filters.service && filters.service !== 'all') {
      subscriptions = subscriptions.filter(sub => 
        sub.service_name === filters.service
      );
    }
    
    if (filters.status && filters.status !== 'all') {
      subscriptions = subscriptions.filter(sub => 
        sub.status === filters.status
      );
    }
    
    // Simple data preparation
    let content = 'Service,Plan,Price,Status,Next Billing\n';
    
    subscriptions.forEach(sub => {
      const price = sub.price ? `$${sub.price}` : 'N/A';
      const status = sub.status === 'active' ? 'Active' : 'Inactive';
      const date = sub.next_billing_date ? new Date(sub.next_billing_date).toLocaleDateString() : 'N/A';
      
      content += `${sub.service_name || 'N/A'},${sub.plan_name || 'N/A'},${price},${status},${date}\n`;
    });
    
    if (format === 'csv') {
      return content;
    } else if (format === 'xlsx') {
      // For Excel, just use tab-separated values
      content = content.replace(/,/g, '\t');
      return content;
    }
    
    throw new Error('Unsupported format');
  } catch (error) {
    console.error('Error exporting reports:', error);
    throw error;
  }
};

export default api;