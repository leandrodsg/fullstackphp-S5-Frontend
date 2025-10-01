// Mock data for testing
const STORAGE_KEY = 'techsubs_services';

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
