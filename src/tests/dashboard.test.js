import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Dashboard from '../pages/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';
import api from '../services/api';

// Mock api module
jest.mock('../services/api');

// Mock AuthContext
const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    user: mockUser
  })
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('should show loading initially', () => {
    // Mock to simulate API delay
    api.get.mockImplementation(() => new Promise(() => {})); // Promise that never resolves

    renderDashboard();

    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  test('should render dashboard with API data', async () => {
    const mockSubscriptions = [
      { 
        id: 1, 
        service: { name: 'Netflix', category: 'Entertainment' }, 
        plan: 'Premium', 
        price: 15.99, 
        status: 'active' 
      },
      { 
        id: 2, 
        service: { name: 'Spotify', category: 'Music' }, 
        plan: 'Premium', 
        price: 9.99, 
        status: 'active' 
      }
    ];

    const mockServices = [
      { id: 1, name: 'Netflix', category: 'Entertainment', description: 'Streaming service' },
      { id: 2, name: 'Spotify', category: 'Music', description: 'Music streaming' }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: mockServices } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Welcome to TechSubs, Test User!')).toBeInTheDocument();
    });

    // Check statistics cards
    expect(screen.getByText('€25.98')).toBeInTheDocument(); // Total EUR
    expect(screen.getByText('Active Subscriptions').closest('div').querySelector('p')).toHaveTextContent('2'); // Active subscriptions
    expect(screen.getByText('Available Services').closest('div').querySelector('p')).toHaveTextContent('2'); // Available services

    // Check subscriptions table - using getAllByText since services appear in both tables
    expect(screen.getAllByText('Netflix')).toHaveLength(2); // Appears in both subscriptions and services tables
    expect(screen.getAllByText('Spotify')).toHaveLength(2); // Appears in both subscriptions and services tables
    expect(screen.getAllByText('Entertainment')).toHaveLength(2); // Category appears in both tables
    expect(screen.getAllByText('Music')).toHaveLength(2); // Category appears in both tables
  });

  test('should show empty state when no subscriptions', async () => {
    const mockServices = [
      { id: 1, name: 'Netflix', category: 'Entertainment', description: 'Streaming service' }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: [] } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: mockServices } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('No Subscriptions Yet')).toBeInTheDocument();
      expect(screen.getByText('Start subscribing to services to see them here.')).toBeInTheDocument();
    });
  });

  test('should show empty state when no services', async () => {
    const mockSubscriptions = [
      { 
        id: 1, 
        service: { name: 'Netflix', category: 'Entertainment' }, 
        plan: 'Premium', 
        price: 15.99, 
        status: 'active' 
      }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: [] } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('No Services Available')).toBeInTheDocument();
      expect(screen.getByText('Create your first service to get started.')).toBeInTheDocument();
    });
  });

  test('should handle API error gracefully', async () => {
    api.get.mockRejectedValue(new Error('API Error'));

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Error loading dashboard')).toBeInTheDocument();
      expect(screen.getByText('Failed to load dashboard data')).toBeInTheDocument();
    });
  });

  test('should calculate total spending correctly', async () => {
    const mockSubscriptions = [
      { id: 1, price: 10.00, status: 'active' },
      { id: 2, price: 15.50, status: 'active' },
      { id: 3, price: 5.00, status: 'pending' } // Should not be included in total
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: [] } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('€25.50')).toBeInTheDocument(); // Only active subscriptions
    });
  });

  test('should display status badges correctly', async () => {
    const mockSubscriptions = [
      { 
        id: 1, 
        service: { name: 'Netflix', category: 'Entertainment' }, 
        status: 'active',
        price: 10.00
      },
      { 
        id: 2, 
        service: { name: 'Spotify', category: 'Music' }, 
        status: 'pending',
        price: 5.00
      }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: [] } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  test('should show available services section', async () => {
    const mockServices = [
      { id: 1, name: 'GitHub Pro', category: 'Development', description: 'Code hosting' },
      { id: 2, name: 'Slack', category: 'Communication', description: 'Team chat' },
      { id: 3, name: 'Notion', category: 'Productivity', description: 'Note taking' }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: [] } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: mockServices } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Recent Services')).toBeInTheDocument();
      expect(screen.getByText('GitHub Pro')).toBeInTheDocument();
      expect(screen.getByText('Slack')).toBeInTheDocument();
      expect(screen.getByText('Notion')).toBeInTheDocument();
    });
  });

  test('should generate service initials correctly', async () => {
    const mockSubscriptions = [
      { 
        id: 1, 
        service: { name: 'Netflix', category: 'Entertainment' }, 
        status: 'active',
        price: 10.00
      }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: [] } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('NE')).toBeInTheDocument(); // Netflix initials
    });
  });

  test('should show action links in tables', async () => {
    const mockServices = [
      { id: 1, name: 'GitHub Pro', category: 'Development', description: 'Code hosting' },
      { id: 2, name: 'Slack', category: 'Communication', description: 'Team chat' }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: [] } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: mockServices } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      const viewLinks = screen.getAllByText('View');
      const editLinks = screen.getAllByText('Edit');
      
      expect(viewLinks.length).toBeGreaterThan(0);
      expect(editLinks.length).toBeGreaterThan(0);
    });
  });

  test('should show USD conversion correctly', async () => {
    const mockSubscriptions = [
      { id: 1, price: 10.00, status: 'active', service: { name: 'Netflix', category: 'Entertainment' } }
    ];

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { data: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { data: { user: mockProfile } } });
      }
      if (url === '/services') {
        return Promise.resolve({ data: { data: [] } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('€10.00')).toBeInTheDocument(); // EUR
      expect(screen.getByText('$10.90')).toBeInTheDocument(); // USD (10 * 1.09)
    });
  });
});