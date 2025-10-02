// Mock data for testing
const STORAGE_KEY = 'techsubs_services';
const SUBSCRIPTIONS_STORAGE_KEY = 'techsubs_subscriptions';

const initialMockServices = [
  {
    id: 1,
    name: 'Netflix',
    category: 'Others',
    website_url: 'https://netflix.com',
    description: 'Netflix Movies and Series',
    created_at: 'Sep 04, 2025',
    updated_at: 'Sep 04, 2025',
    subscriptions: [
      { id: 1, plan: 'Basic', price: 14.99, currency: 'EUR' }
    ]
  },
  {
    id: 2,
    name: 'Spotify',
    category: 'Music',
    website_url: 'https://spotify.com',
    description: 'Music streaming service with millions of songs',
    created_at: 'Aug 15, 2025',
    updated_at: 'Aug 20, 2025',
    subscriptions: [
      { id: 2, plan: 'Premium', price: 9.99, currency: 'EUR' }
    ]
  },
  {
    id: 3,
    name: 'Adobe Creative Cloud',
    category: 'Software',
    website_url: 'https://adobe.com',
    description: 'Complete suite of creative applications',
    created_at: 'Jul 10, 2025',
    updated_at: 'Jul 25, 2025',
    subscriptions: []
  },
  {
    id: 4,
    name: 'Udemy',
    category: 'Courses',
    website_url: 'https://udemy.com',
    description: 'Online learning platform with thousands of courses',
    created_at: 'Jun 20, 2025',
    updated_at: 'Jun 25, 2025',
    subscriptions: []
  },
  {
    id: 5,
    name: 'Amazon AWS',
    category: 'Infrastructure',
    website_url: 'https://aws.amazon.com',
    description: 'Cloud computing services and infrastructure',
    created_at: 'May 15, 2025',
    updated_at: 'May 20, 2025',
    subscriptions: []
  },
  {
    id: 6,
    name: 'GitHub Copilot',
    category: 'DevTool',
    website_url: 'https://github.com/copilot',
    description: 'AI-powered code completion and assistance',
    created_at: 'Apr 10, 2025',
    updated_at: 'Apr 15, 2025',
    subscriptions: []
  },
  {
    id: 7,
    name: 'OpenAI ChatGPT',
    category: 'AI',
    website_url: 'https://openai.com',
    description: 'Advanced AI chatbot and language model',
    created_at: 'Mar 05, 2025',
    updated_at: 'Mar 10, 2025',
    subscriptions: []
  }
];

const initialMockSubscriptions = [
  {
    id: 1,
    service_id: 1,
    service: {
      id: 1,
      name: 'Netflix',
      category: 'Others',
      website_url: 'https://netflix.com',
      description: 'Netflix Movies and Series'
    },
    plan: 'Premium',
    price: 15.99,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2024-01-01',
    next_billing_date: '2024-02-01',
    status: 'active',
    notes: 'Family plan for 4 users',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    service_id: 2,
    service: {
      id: 2,
      name: 'Spotify',
      category: 'Music',
      website_url: 'https://spotify.com',
      description: 'Music streaming service with millions of songs'
    },
    plan: 'Premium',
    price: 9.99,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2024-01-15',
    next_billing_date: '2024-02-15',
    status: 'active',
    notes: 'Individual plan with offline downloads',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 3,
    service_id: 3,
    service: {
      id: 3,
      name: 'Adobe Creative Cloud',
      category: 'Software',
      website_url: 'https://adobe.com',
      description: 'Complete suite of creative applications'
    },
    plan: 'All Apps',
    price: 52.99,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2024-02-01',
    next_billing_date: '2024-03-01',
    status: 'active',
    notes: 'Professional plan with all Adobe apps',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: 4,
    service_id: 6,
    service: {
      id: 6,
      name: 'GitHub Copilot',
      category: 'DevTool',
      website_url: 'https://github.com/copilot',
      description: 'AI-powered code completion and assistance'
    },
    plan: 'Individual',
    price: 10.00,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2024-01-10',
    next_billing_date: '2024-02-10',
    status: 'active',
    notes: 'AI coding assistant for development',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: 5,
    service_id: 7,
    service: {
      id: 7,
      name: 'OpenAI ChatGPT',
      category: 'AI',
      website_url: 'https://openai.com',
      description: 'Advanced AI chatbot and language model'
    },
    plan: 'Plus',
    price: 20.00,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2024-01-20',
    next_billing_date: '2024-02-20',
    status: 'active',
    notes: 'GPT-4 access with priority',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    id: 6,
    service_id: 5,
    service: {
      id: 5,
      name: 'Amazon AWS',
      category: 'Infrastructure',
      website_url: 'https://aws.amazon.com',
      description: 'Cloud computing services and infrastructure'
    },
    plan: 'Basic Support',
    price: 29.00,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2024-01-05',
    next_billing_date: '2024-02-05',
    status: 'pending',
    notes: 'Cloud infrastructure for development projects',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  },
  {
    id: 7,
    service_id: 4,
    service: {
      id: 4,
      name: 'Udemy',
      category: 'Courses',
      website_url: 'https://udemy.com',
      description: 'Online learning platform with thousands of courses'
    },
    plan: 'Personal Plan',
    price: 16.58,
    currency: 'USD',
    billing_cycle: 'monthly',
    start_date: '2023-12-01',
    next_billing_date: '2024-01-01',
    status: 'canceled',
    notes: 'Canceled due to lack of time for courses',
    created_at: '2023-12-01T00:00:00Z',
    updated_at: '2023-12-15T00:00:00Z'
  }
];

// Get services from localStorage or return initial data
const getServices = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialMockServices;
};

// Save services to localStorage
const saveServices = (services) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
};

// Get subscriptions from localStorage or return initial data
const getSubscriptions = () => {
  const stored = localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialMockSubscriptions;
};

// Save subscriptions to localStorage
const saveSubscriptions = (subscriptions) => {
  localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(subscriptions));
};

// Generate next ID for subscriptions
const getNextSubscriptionId = () => {
  const subscriptions = getSubscriptions();
  return subscriptions.length > 0 ? Math.max(...subscriptions.map(s => s.id)) + 1 : 1;
};

// Calculate next billing date based on start date and billing cycle
const calculateNextBillingDate = (startDate, billingCycle) => {
  const start = new Date(startDate);
  const next = new Date(start);
  
  switch (billingCycle) {
    case 'weekly':
      next.setDate(start.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(start.getMonth() + 1);
      break;
    case 'quarterly':
      next.setMonth(start.getMonth() + 3);
      break;
    case 'yearly':
      next.setFullYear(start.getFullYear() + 1);
      break;
    default:
      next.setMonth(start.getMonth() + 1); // Default to monthly
  }
  
  return next.toISOString().split('T')[0];
};

export { 
  getServices, 
  saveServices, 
  initialMockServices,
  getSubscriptions,
  saveSubscriptions,
  initialMockSubscriptions,
  getNextSubscriptionId,
  calculateNextBillingDate
};
