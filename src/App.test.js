import { render, screen } from '@testing-library/react';
import App from './App';

// Mock AuthContext
jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    isAuthenticated: false,
    loading: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn()
  })
}));

// Mock react-router
jest.mock('react-router', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Navigate: () => null,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}));

test('renders TechSubs landing page', () => {
  render(<App />);
  const titleElement = screen.getByText(/organize all your/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation with TechSubs logo', () => {
  render(<App />);
  const logoElements = screen.getAllByAltText(/TechSubs/i);
  expect(logoElements.length).toBeGreaterThan(0);
});

test('renders authentication buttons', () => {
  render(<App />);
  const loginButton = screen.getByText(/login/i);
  const signinButton = screen.getByText(/sign-in/i);
  expect(loginButton).toBeInTheDocument();
  expect(signinButton).toBeInTheDocument();
});
