import { formatCurrency, formatDate, getInitials } from '../utils/helpers';

describe('Helper Functions', () => {
  test('formatCurrency should format number correctly', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
  });

  test('formatDate should format date correctly', () => {
    const date = '2024-01-15';
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });

  test('getInitials should return correct initials', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Jane')).toBe('J');
  });
});