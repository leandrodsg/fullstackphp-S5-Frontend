// Mock api for tests
const api = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn()
    },
    response: {
      use: jest.fn()
    }
  }
};

// Mock Service API functions
export const serviceAPI = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getStats: jest.fn()
};

// Mock Subscription API functions
export const subscriptionAPI = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getStats: jest.fn()
};

// Mock Profile API functions
export const profileAPI = {
  get: jest.fn(),
  update: jest.fn(),
  changePassword: jest.fn()
};

// Mock Reports API functions
export const getReports = jest.fn();
export const exportReports = jest.fn();

export default api;