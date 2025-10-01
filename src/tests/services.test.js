import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router';
import MyServices from '../pages/MyServices';
import CreateService from '../pages/CreateService';
import EditService from '../pages/EditService';
import ServiceDetails from '../pages/ServiceDetails';
import api from '../services/api';

// Mock the API
jest.mock('../services/api');
const mockedApi = api;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' })
}));

// Mock data
const mockServices = [
  {
    id: 1,
    name: 'Netflix',
    category: 'Entertainment',
    website_url: 'https://netflix.com',
    description: 'Streaming service'
  },
  {
    id: 2,
    name: 'GitHub',
    category: 'DevTool',
    website_url: 'https://github.com',
    description: 'Code repository'
  }
];

const mockService = {
  id: 1,
  name: 'Netflix',
  category: 'Entertainment',
  website_url: 'https://netflix.com',
  description: 'Streaming service'
};

describe('Services CRUD Operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  // GET - MyServices List
  describe('GET /services - MyServices List', () => {
    test('should fetch and display services list', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockServices }
      });

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      // Wait for services to load and check title
      await waitFor(() => {
        expect(screen.getByText('My Services')).toBeInTheDocument();
      });

      // Wait for services data to appear
      await waitFor(() => {
        expect(screen.getByText('Netflix')).toBeInTheDocument();
        expect(screen.getByText('GitHub')).toBeInTheDocument();
      });

      // Verify API call
      expect(mockedApi.get).toHaveBeenCalledWith('/services');
    });

    test('should display empty state when no services', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: [] }
      });

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('No Services Yet')).toBeInTheDocument();
        expect(screen.getByText('Start building your subscription ecosystem by creating your first service!')).toBeInTheDocument();
      });
    });

    test('should handle API error gracefully', async () => {
      mockedApi.get.mockRejectedValue(new Error('API Error'));

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Error loading services')).toBeInTheDocument();
      });
    });
  });

  // POST - Create Service
  describe('POST /services - Create Service', () => {
    test('should create a new service successfully', async () => {
      mockedApi.post.mockResolvedValue({
        data: { data: mockService }
      });

      render(
        <BrowserRouter>
          <CreateService />
        </BrowserRouter>
      );

      // Fill form
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'Netflix' }
      });
      fireEvent.change(screen.getByLabelText(/category/i), {
        target: { value: 'Streaming' }
      });
      fireEvent.change(screen.getByLabelText(/website/i), {
        target: { value: 'https://netflix.com' }
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: 'Streaming service' }
      });

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /create service/i }));

      // Wait for API call
      await waitFor(() => {
        expect(mockedApi.post).toHaveBeenCalledWith('/services', {
          name: 'Netflix',
          category: 'Streaming',
          website_url: 'https://netflix.com',
          description: 'Streaming service'
        });
      }, { timeout: 3000 });

      // Verify navigation was called after successful API response
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/services');
      });
    });

    test('should validate required fields', async () => {
      render(
        <BrowserRouter>
          <CreateService />
        </BrowserRouter>
      );

      // Try to submit without filling required fields
      fireEvent.click(screen.getByRole('button', { name: /create service/i }));

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Category is required')).toBeInTheDocument();
      });

      // API should not be called
      expect(mockedApi.post).not.toHaveBeenCalled();
    });

    test('should validate URL format', async () => {
      render(
        <BrowserRouter>
          <CreateService />
        </BrowserRouter>
      );

      // Fill form with invalid URL
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'Netflix' }
      });
      fireEvent.change(screen.getByLabelText(/category/i), {
        target: { value: 'Entertainment' }
      });
      fireEvent.change(screen.getByLabelText(/website/i), {
        target: { value: 'invalid-url' }
      });

      fireEvent.click(screen.getByRole('button', { name: /create service/i }));

      await waitFor(() => {
        expect(screen.getByText('Invalid URL format')).toBeInTheDocument();
      });
    });
  });

  // PUT - Edit Service
  describe('PUT /services/:id - Edit Service', () => {
    test('should load service data for editing', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockService }
      });

      render(
        <BrowserRouter>
          <EditService />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(mockedApi.get).toHaveBeenCalledWith('/services/1');
        expect(screen.getByDisplayValue('Netflix')).toBeInTheDocument();
        expect(screen.getByDisplayValue('https://netflix.com')).toBeInTheDocument();
      });
    });

    test('should update service successfully', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockService }
      });
      mockedApi.put.mockResolvedValue({
        data: { data: { ...mockService, name: 'Netflix Updated' } }
      });

      render(
        <BrowserRouter>
          <EditService />
        </BrowserRouter>
      );

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByDisplayValue('Netflix')).toBeInTheDocument();
      });

      // Update name
      fireEvent.change(screen.getByDisplayValue('Netflix'), {
        target: { value: 'Netflix Updated' }
      });

      // Submit form
      fireEvent.click(screen.getByText('Update Service'));

      await waitFor(() => {
        expect(mockedApi.put).toHaveBeenCalledWith('/services/1', {
          name: 'Netflix Updated',
          category: 'Entertainment',
          website_url: 'https://netflix.com',
          description: 'Streaming service'
        });
      });
    });
  });

  // DELETE - Delete Service
  describe('DELETE /services/:id - Delete Service', () => {
    test('should delete service from MyServices list', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockServices }
      });

      // Mock window.confirm
      window.confirm = jest.fn(() => true);

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      // Wait for services to load
      await waitFor(() => {
        expect(screen.getByText('Netflix')).toBeInTheDocument();
      });

      // Click delete button
      const deleteButtons = screen.getAllByTitle('Delete Service');
      fireEvent.click(deleteButtons[0]);

      // Verify confirmation dialog
      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete Netflix?');

      // Service should be removed from UI (local state update)
      await waitFor(() => {
        expect(screen.queryByText('Netflix')).not.toBeInTheDocument();
      });
    });

    test('should cancel delete when user clicks cancel', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockServices }
      });

      // Mock window.confirm to return false
      window.confirm = jest.fn(() => false);

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      // Wait for services to load
      await waitFor(() => {
        expect(screen.getByText('Netflix')).toBeInTheDocument();
      });

      // Click delete button
      const deleteButtons = screen.getAllByTitle('Delete Service');
      fireEvent.click(deleteButtons[0]);

      // Service should still be in UI
      expect(screen.getByText('Netflix')).toBeInTheDocument();
    });
  });

  // Service Actions
  describe('Service Actions', () => {
    test('should navigate to service details on view', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockServices }
      });

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Netflix')).toBeInTheDocument();
      });

      // Click view button
      const viewButtons = screen.getAllByTitle('View Details');
      fireEvent.click(viewButtons[0]);

      expect(mockNavigate).toHaveBeenCalledWith('/services/1');
    });

    test('should navigate to edit service on edit', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockServices }
      });

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Netflix')).toBeInTheDocument();
      });

      // Click edit button
      const editButtons = screen.getAllByTitle('Edit Service');
      fireEvent.click(editButtons[0]);

      expect(mockNavigate).toHaveBeenCalledWith('/services/1/edit');
    });

    test('should navigate to create service', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: [] }
      });

      render(
        <BrowserRouter>
          <MyServices />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('+ New Service')).toBeInTheDocument();
      });

      // Click new service button
      fireEvent.click(screen.getByText('+ New Service'));

      expect(mockNavigate).toHaveBeenCalledWith('/services/create');
    });
  });

  // Service Details View
  describe('Service Details View', () => {
    test('should display service details', async () => {
      mockedApi.get.mockResolvedValue({
        data: { data: mockService }
      });

      render(
        <MemoryRouter initialEntries={['/services/1']}>
          <Routes>
            <Route path="/services/:id" element={<ServiceDetails />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Service Details')).toBeInTheDocument();
      });

      // Wait for the service data to load and check for the service name in the title
      await waitFor(() => {
        expect(screen.getByText(/Netflix - Entertainment/)).toBeInTheDocument();
      });

      // Check for category
      expect(screen.getByText('Entertainment')).toBeInTheDocument();
      
      // Check for description
      expect(screen.getByText('Streaming service')).toBeInTheDocument();

      expect(mockedApi.get).toHaveBeenCalledWith('/services/1');
    });
  });
});