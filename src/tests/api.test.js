// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    defaults: {
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      }
    },
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}));

describe('API Configuration', () => {
  test('should be able to import api module', () => {
    const api = require('../services/api');
    expect(api).toBeDefined();
  });

  test('should have environment variable configured', () => {
    expect(process.env.REACT_APP_API_BASE_URL).toBeDefined();
  });
});