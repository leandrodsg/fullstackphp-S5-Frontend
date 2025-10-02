export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

// Calculate days until next billing date
export const calculateDaysUntilNextBilling = (nextBillingDate) => {
  if (!nextBillingDate) return null;
  
  const today = new Date();
  const billingDate = new Date(nextBillingDate);
  const diffTime = billingDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Check if subscription is expired
export const isSubscriptionExpired = (nextBillingDate, status) => {
  if (status === 'cancelled') return true;
  if (!nextBillingDate) return false;
  
  const today = new Date();
  const billingDate = new Date(nextBillingDate);
  
  return billingDate < today;
};

// Format price with currency
export const formatPriceWithCurrency = (price, currency = 'USD') => {
  const numericPrice = parseFloat(price) || 0;
  return formatCurrency(numericPrice, currency);
};

// Get relative time (e.g., "in 5 days", "2 days ago")
export const getRelativeTime = (date) => {
  if (!date) return 'Unknown';
  
  const now = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `in ${diffDays} days`;
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  
  return 'Unknown';
};