import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TechSubs Frontend title', () => {
  render(<App />);
  const titleElement = screen.getByText(/TechSubs Frontend/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders success message', () => {
  render(<App />);
  const messageElement = screen.getByText(/React project setup completed successfully!/i);
  expect(messageElement).toBeInTheDocument();
});
