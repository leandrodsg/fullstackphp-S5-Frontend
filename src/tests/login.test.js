import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Login from '../pages/Login';
import { AuthProvider } from '../contexts/AuthContext';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

// Mock do AuthContext
const mockLogin = jest.fn();
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    login: mockLogin
  })
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  test('should render all form elements', () => {
    renderLogin();

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('should allow typing in input fields', () => {
    renderLogin();

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('should check/uncheck remember me checkbox', () => {
    renderLogin();

    const rememberCheckbox = screen.getByLabelText('Remember me');
    
    expect(rememberCheckbox.checked).toBe(false);
    
    fireEvent.click(rememberCheckbox);
    expect(rememberCheckbox.checked).toBe(true);
    
    fireEvent.click(rememberCheckbox);
    expect(rememberCheckbox.checked).toBe(false);
  });

  test('should call login with correct data on submit', async () => {
    mockLogin.mockResolvedValueOnce({ success: true });

    renderLogin();

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const rememberCheckbox = screen.getByLabelText('Remember me');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', true);
    });
  });

  test('should navigate to dashboard after successful login', async () => {
    mockLogin.mockResolvedValueOnce({ success: true });

    renderLogin();

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('should display errors when login fails', async () => {
    const mockErrors = {
      email: ['Invalid email format'],
      password: ['Password is required']
    };
    
    mockLogin.mockResolvedValueOnce({ 
      success: false, 
      errors: mockErrors 
    });

    renderLogin();

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Oops! Something went wrong:')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('should show loading state during submission', async () => {
    // Simulate delay in login
    mockLogin.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );

    renderLogin();

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  test('should have links for register and forgot password', () => {
    renderLogin();

    expect(screen.getByText('Sign up here')).toBeInTheDocument();
    // The "Forgot your password?" text appears twice in the component
    expect(screen.getAllByText('Forgot your password?')).toHaveLength(2);
  });

  test('should have logo and footer', () => {
    renderLogin();

    expect(screen.getByAltText('TechSubs Logo')).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} TechSubs/)).toBeInTheDocument();
  });
});