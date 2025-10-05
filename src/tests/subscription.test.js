import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CreateSubscription from '../pages/CreateSubscription';
import { serviceAPI, subscriptionAPI } from '../services/api';

// Mock das APIs
jest.mock('../services/api', () => ({
  serviceAPI: {
    getAll: jest.fn()
  },
  subscriptionAPI: {
    create: jest.fn()
  }
}));

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}));

describe('CreateSubscription - Essential Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock for serviceAPI.getAll
    serviceAPI.getAll.mockResolvedValue({
      data: {
        data: [
          { id: 1, name: 'Netflix', category: 'Entertainment' },
          { id: 2, name: 'Spotify', category: 'Music' }
        ]
      }
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CreateSubscription />
      </BrowserRouter>
    );
  };

  test('renders component and loads services', async () => {
    renderComponent();
    
    // Check if title is present
    expect(screen.getByRole('heading', { name: 'Create Subscription' })).toBeInTheDocument();
    
    // Wait for services to load
    await waitFor(() => {
      expect(serviceAPI.getAll).toHaveBeenCalled();
    });
    
    // Check if submit button is present
    expect(screen.getByRole('button', { name: 'Create Subscription' })).toBeInTheDocument();
  });

  test('creates subscription successfully', async () => {
    subscriptionAPI.create.mockResolvedValue({
      data: { id: 1, message: 'Success' }
    });

    renderComponent();
    
    // Wait for loading
    await waitFor(() => {
      expect(serviceAPI.getAll).toHaveBeenCalled();
    });

    // Fill fields using direct IDs
    const serviceSelect = screen.getByLabelText(/service/i);
    const planInput = screen.getByLabelText(/plan/i);
    const priceInput = screen.getByLabelText(/price/i);
    const nextBillingInput = screen.getByLabelText(/next billing date/i);

    fireEvent.change(serviceSelect, { target: { value: '1' } });
    fireEvent.change(planInput, { target: { value: 'Premium' } });
    fireEvent.change(priceInput, { target: { value: '15.99' } });
    fireEvent.change(nextBillingInput, { target: { value: '2024-02-01' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: 'Create Subscription' }));

    // Check if API was called
    await waitFor(() => {
      expect(subscriptionAPI.create).toHaveBeenCalled();
    });

    // Check navigation
    expect(mockNavigate).toHaveBeenCalledWith('/subscriptions', {
      state: { message: 'Subscription created successfully!' }
    });
  });

  test('shows error when API fails', async () => {
    const apiError = {
      response: {
        data: {
          message: 'Server error'
        }
      }
    };

    subscriptionAPI.create.mockRejectedValue(apiError);

    renderComponent();
    
    await waitFor(() => {
      expect(serviceAPI.getAll).toHaveBeenCalled();
    });

    // Fill valid fields using screen queries
    const serviceSelect = screen.getByLabelText(/service/i);
    const planInput = screen.getByLabelText(/plan/i);
    const priceInput = screen.getByLabelText(/price/i);
    const nextBillingInput = screen.getByLabelText(/next billing date/i);

    fireEvent.change(serviceSelect, { target: { value: '1' } });
    fireEvent.change(planInput, { target: { value: 'Premium' } });
    fireEvent.change(priceInput, { target: { value: '15.99' } });
    fireEvent.change(nextBillingInput, { target: { value: '2024-02-01' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Subscription' }));

    // Check if error appears
    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });

    // Should not navigate on error
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});