import { render, screen } from '@testing-library/react';
import LandingPage from '../pages/LandingPage';

describe('LandingPage', () => {
  test('renders hero title first part', () => {
    render(<LandingPage />);
    expect(screen.getByText(/organize all your/i)).toBeInTheDocument();
  });

  test('renders hero title highlight', () => {
    render(<LandingPage />);
    expect(screen.getByText(/tech subscriptions/i)).toBeInTheDocument();
  });

  test('renders navigation with login and sign-in buttons', () => {
    render(<LandingPage />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign-in/i)).toBeInTheDocument();
  });

  test('renders three feature cards', () => {
    render(<LandingPage />);
    expect(screen.getByText(/centralized management/i)).toBeInTheDocument();
    expect(screen.getByText(/financial control/i)).toBeInTheDocument();
    expect(screen.getByText(/made for devs/i)).toBeInTheDocument();
  });

  test('renders service cards in mockup', () => {
    render(<LandingPage />);
    expect(screen.getByText(/github pro/i)).toBeInTheDocument();
    expect(screen.getByText(/chatgpt plus/i)).toBeInTheDocument();
    expect(screen.getByText(/vercel pro/i)).toBeInTheDocument();
  });

  test('renders footer with copyright', () => {
    render(<LandingPage />);
    expect(screen.getByText(/techsubs/i)).toBeInTheDocument();
    expect(screen.getByText(/made with/i)).toBeInTheDocument();
  });

  test('renders pricing information', () => {
    render(<LandingPage />);
    expect(screen.getByText(/\$247\.00\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/\$4\.00/)).toBeInTheDocument();
    
    // Use getAllByText for values that appear multiple times
    const twentyDollarElements = screen.getAllByText(/\$20\.00/);
    expect(twentyDollarElements.length).toBeGreaterThan(0);
  });
});