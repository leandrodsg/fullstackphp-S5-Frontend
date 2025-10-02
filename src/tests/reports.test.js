import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Reports from '../pages/Reports';
import { AuthProvider } from '../contexts/AuthContext';

// Mock da API
jest.mock('../services/api', () => ({
  subscriptionAPI: {
    getAll: jest.fn()
  },
  exportReports: jest.fn()
}));

import { subscriptionAPI } from '../services/api';

// Helper para renderizar com contextos
const renderWithContext = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Reports Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders reports page title', async () => {
    subscriptionAPI.getAll.mockResolvedValue({ data: [] });
    
    renderWithContext(<Reports />);
    
    await waitFor(() => {
      expect(screen.getByText('Reports')).toBeInTheDocument();
    });
  });

  test('shows loading state', () => {
    subscriptionAPI.getAll.mockImplementation(() => new Promise(() => {}));
    
    renderWithContext(<Reports />);
    
    expect(screen.getByText('Loading reports...')).toBeInTheDocument();
  });

  test('shows error state when API fails', async () => {
    subscriptionAPI.getAll.mockRejectedValue(new Error('API Error'));
    
    renderWithContext(<Reports />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load reports')).toBeInTheDocument();
    });
  });
});