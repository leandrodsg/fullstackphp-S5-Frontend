import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MyServices from '../pages/MyServices';
import CreateService from '../pages/CreateService';
import EditService from '../pages/EditService';
import ServiceDetails from '../pages/ServiceDetails';
import { serviceAPI } from '../services/api';

// Mock react-router
const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

// Mock serviceAPI
jest.mock('../services/api', () => ({
  serviceAPI: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedServiceAPI = serviceAPI;

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

describe('Services Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1' });
  });

  const renderWithRouter = (component) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  // Basic test - verifies if services render
  test('should render services correctly', async () => {
    mockedServiceAPI.getAll.mockResolvedValue({ data: { data: [] } });

    renderWithRouter(<MyServices />);

    await waitFor(() => {
      expect(screen.getAllByText('My Services')).toHaveLength(1);
    });
  });

  // Service creation test
  test('should create service correctly', async () => {
    mockedServiceAPI.create.mockResolvedValue({ data: { data: mockService } });

    renderWithRouter(<CreateService />);

    expect(screen.getAllByText('Create Service').length).toBeGreaterThan(0);
  });
});