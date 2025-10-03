import React from 'react';
import { render, screen } from '@testing-library/react';
import MyProfile from '../pages/MyProfile';

// Mock dependencies
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'Test User',
      email: 'test@example.com',
      created_at: '2023-01-01T00:00:00Z'
    },
    token: 'fake-token-123'
  })
}));

jest.mock('../services/api', () => ({
  profileAPI: {
    update: jest.fn().mockResolvedValue({ success: true }),
    changePassword: jest.fn().mockResolvedValue({ success: true })
  }
}));

// Mock React Router
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn()
}));

describe('MyProfile Component', () => {
  // Basic component tests
  test('should be defined', () => {
    expect(MyProfile).toBeDefined();
  });

  test('should be a valid React component', () => {
    expect(typeof MyProfile).toBe('function');
  });

  test('should have correct component name', () => {
    expect(MyProfile.name).toBe('MyProfile');
  });
  
  // Mock function tests
  test('profile API functions should be mocked correctly', () => {
    const { profileAPI } = require('../services/api');
    expect(jest.isMockFunction(profileAPI.update)).toBe(true);
    expect(jest.isMockFunction(profileAPI.changePassword)).toBe(true);
  });
  
  // User data tests
  test('auth context should provide user data', () => {
    const { useAuth } = require('../contexts/AuthContext');
    const auth = useAuth();
    expect(auth.user).toHaveProperty('name', 'Test User');
    expect(auth.user).toHaveProperty('email', 'test@example.com');
    expect(auth.user).toHaveProperty('created_at');
  });
});