import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';
import api from '../services/api';

// Mock do módulo api
jest.mock('../services/api');

// Mock do AuthContext
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
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
  };

  test('deve mostrar loading inicialmente', () => {
    // Mock para simular delay na API
    api.get.mockImplementation(() => new Promise(() => {})); // Promise que nunca resolve

    renderDashboard();

    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  test('deve renderizar dashboard com dados da API', async () => {
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

    const mockProfile = { id: 1, name: 'Test User', email: 'test@example.com' };

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockProfile } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Welcome to TechSubs, Test User!')).toBeInTheDocument();
    });

    // Verificar cards de estatísticas
    expect(screen.getByText('€25.98')).toBeInTheDocument(); // Total EUR
    expect(screen.getByText('Active Subscriptions').closest('div').querySelector('p')).toHaveTextContent('2'); // Active subscriptions

    // Verificar tabela de subscriptions
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  test('deve usar dados mock quando API falha', async () => {
    api.get.mockRejectedValue(new Error('API Error'));

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Failed to load dashboard data. Please try again.')).toBeInTheDocument();
    });

    // Deve mostrar dados mock
    await waitFor(() => {
      expect(screen.getByText('Netflix')).toBeInTheDocument();
      expect(screen.getByText('Spotify')).toBeInTheDocument();
      expect(screen.getByText('Office 365')).toBeInTheDocument();
    });
  });

  test('deve calcular totais corretamente', async () => {
    const mockSubscriptions = [
      { id: 1, price: 10.00, status: 'active' },
      { id: 2, price: 15.50, status: 'active' },
      { id: 3, price: 5.00, status: 'pending' } // Não deve ser incluído no total
    ];

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockUser } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('€25.50')).toBeInTheDocument(); // Total EUR apenas ativos
      expect(screen.getByText('2')).toBeInTheDocument(); // Apenas subscriptions ativas
    });
  });

  test('deve exibir badges de status corretamente', async () => {
    const mockSubscriptions = [
      { 
        id: 1, 
        service: { name: 'Netflix' }, 
        status: 'active',
        price: 10.00
      },
      { 
        id: 2, 
        service: { name: 'Spotify' }, 
        status: 'pending',
        price: 5.00
      }
    ];

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockUser } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  test('deve mostrar seção de serviços disponíveis', async () => {
    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: [] } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockUser } });
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

  test('deve gerar iniciais dos serviços corretamente', async () => {
    const mockSubscriptions = [
      { 
        id: 1, 
        service: { name: 'Netflix' }, 
        status: 'active',
        price: 10.00
      }
    ];

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockUser } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('NE')).toBeInTheDocument(); // Iniciais de Netflix
    });
  });

  test('deve mostrar links de ação nas tabelas', async () => {
    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: [] } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockUser } });
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

  test('deve mostrar conversão USD corretamente', async () => {
    const mockSubscriptions = [
      { id: 1, price: 10.00, status: 'active' }
    ];

    api.get.mockImplementation((url) => {
      if (url === '/subscriptions') {
        return Promise.resolve({ data: { subscriptions: mockSubscriptions } });
      }
      if (url === '/profile') {
        return Promise.resolve({ data: { user: mockUser } });
      }
    });

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('€10.00')).toBeInTheDocument(); // EUR
      expect(screen.getByText('$10.90')).toBeInTheDocument(); // USD (10 * 1.09)
    });
  });
});