import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TechSubs landing page', () => {
  render(<App />);
  const titleElement = screen.getByText(/organize all your/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation with TechSubs logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText(/techsubs logo/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders authentication buttons', () => {
  render(<App />);
  const loginButton = screen.getByText(/login/i);
  const signinButton = screen.getByText(/sign-in/i);
  expect(loginButton).toBeInTheDocument();
  expect(signinButton).toBeInTheDocument();
});
