import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { serviceAPI, subscriptionAPI } from '../services/api';

// Mock api module
jest.mock('../services/api');

// Mock AuthContext
const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser
  })
}));

// Mock react-router
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(<Dashboard />);
  };

  test('should render dashboard correctly', async () => {
    subscriptionAPI.getAll.mockResolvedValue({ data: { data: [] } });
    serviceAPI.getAll.mockResolvedValue({ data: { data: [] } });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
    });
  });

  test('should calculate total spending correctly', async () => {
    const mockSubscriptions = [
      { id: 1, price: 10.00, currency: 'EUR', status: 'active', service: { name: 'Netflix', category: 'Entertainment' } },
      { id: 2, price: 15.50, currency: 'EUR', status: 'active', service: { name: 'Spotify', category: 'Music' } }
    ];

    subscriptionAPI.getAll.mockResolvedValue({ data: { data: mockSubscriptions } });
    serviceAPI.getAll.mockResolvedValue({ data: { data: [] } });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('€25.50')).toBeInTheDocument();
    });
  });
});