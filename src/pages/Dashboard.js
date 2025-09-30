import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch subscriptions and profile data
        const [subscriptionsResponse, profileResponse] = await Promise.all([
          api.get('/subscriptions'),
        api.get('/profile')
        ]);

        setSubscriptions(subscriptionsResponse.data.subscriptions || []);
        setProfile(profileResponse.data.user || user);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
        
        // Fallback to mock data if API fails
        setSubscriptions(mockSubscriptions);
        setProfile(user);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Mock data as fallback
  const mockSubscriptions = [
    { 
      id: 1, 
      service: { name: 'Netflix', category: 'Entertainment' }, 
      plan: 'Premium', 
      price: 15.99, 
      status: 'active' 
    },
    { 
      id: 2, 
      service: { name: 'Spotify', category: 'Music' }, 
      plan: 'Premium', 
      price: 9.99, 
      status: 'active' 
    },
    { 
      id: 3, 
      service: { name: 'Office 365', category: 'Productivity' }, 
      plan: 'Business', 
      price: 12.50, 
      status: 'active' 
    },
    { 
      id: 4, 
      service: { name: 'Figma Pro', category: 'Design' }, 
      plan: 'Professional', 
      price: 15.00, 
      status: 'pending' 
    },
    { 
      id: 5, 
      service: { name: 'Adobe CC', category: 'Design' }, 
      plan: 'All Apps', 
      price: 25.99, 
      status: 'active' 
    },
  ];

  // Calculate totals from real data
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const monthlyTotalEUR = activeSubscriptions.reduce((total, sub) => total + (sub.price || 0), 0);
  const monthlyTotalUSD = monthlyTotalEUR * 1.09; // Approximate conversion
  const totalServices = subscriptions.length;

  const availableServices = [
    { 
      id: 1, 
      name: 'GitHub Pro', 
      category: 'Development', 
      description: 'Advanced GitHub features for developers',
      website: 'github.com'
    },
    { 
      id: 2, 
      name: 'Slack', 
      category: 'Communication', 
      description: 'Team communication and collaboration',
      website: 'slack.com'
    },
    { 
      id: 3, 
      name: 'Notion', 
      category: 'Productivity', 
      description: 'All-in-one workspace for notes and docs',
      website: 'notion.so'
    },
    { 
      id: 4, 
      name: 'Canva Pro', 
      category: 'Design', 
      description: 'Professional design tools and templates',
      website: 'canva.com'
    },
    { 
      id: 5, 
      name: 'Zoom Pro', 
      category: 'Communication', 
      description: 'Video conferencing and webinar platform',
      website: 'zoom.us'
    },
  ];

  const getServiceInitials = (serviceName) => {
    return serviceName.substring(0, 2).toUpperCase();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      canceled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        statusConfig[status] || statusConfig.active
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-purple-600">Loading dashboard...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && (
          <>
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden shadow-sm sm:rounded-lg mb-6 border border-gray-200">
              <div className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="mr-4">
                    <img src="/logo_only.svg" alt="TechSubs Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-medium text-purple-800">Welcome to TechSubs{profile?.name ? `, ${profile.name}` : ''}!</h1>
                    <p className="text-orange-600 mt-1 text-sm sm:text-base">Manage your development tool subscriptions in one place.</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Monthly Total EUR */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden shadow-sm sm:rounded-lg border border-blue-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-blue-700">Monthly Total (EUR)</h3>
                <p className="text-xl font-bold text-blue-900">€{monthlyTotalEUR.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Monthly Total USD */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 overflow-hidden shadow-sm sm:rounded-lg border border-green-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-green-700">Monthly Total (USD)</h3>
                <p className="text-xl font-bold text-green-900">${monthlyTotalUSD.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Active Subscriptions */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden shadow-sm sm:rounded-lg border border-purple-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-purple-700">Active Subscriptions</h3>
                <p className="text-xl font-bold text-purple-900">{activeSubscriptions.length}</p>
              </div>
            </div>
          </div>

          {/* Available Services */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 overflow-hidden shadow-sm sm:rounded-lg border border-orange-200">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-orange-700">Available Services</h3>
                <p className="text-xl font-bold text-orange-900">{totalServices}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Subscriptions */}
        {subscriptions.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden shadow-sm sm:rounded-lg mb-6 border border-purple-200">
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-purple-900">Recent Subscriptions</h3>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed divide-y divide-purple-100">
                    <thead className="bg-purple-50 border-b border-purple-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider" style={{width: '40%'}}>
                          Service
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider" style={{width: '15%'}}>
                          Plan
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider" style={{width: '15%'}}>
                          Price
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider" style={{width: '15%'}}>
                          Status
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-purple-700 uppercase tracking-wider" style={{width: '15%'}}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-purple-50">
                      {subscriptions.slice(0, 5).map((subscription) => (
                        <tr key={subscription.id} className="hover:bg-purple-50 transition duration-150 border-b border-purple-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-purple-600 font-semibold text-xs">
                                  {getServiceInitials(subscription.service?.name || subscription.name || 'N/A')}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900">{subscription.service?.name || subscription.name || 'Unknown Service'}</div>
                                <div className="text-xs text-gray-500">{subscription.service?.category || subscription.category || 'Unknown'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            {subscription.plan || 'N/A'}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            ${(subscription.price || 0).toFixed(2)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center">
                            {getStatusBadge(subscription.status || 'active')}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium">
                            <div className="flex justify-center space-x-2">
                              <a href="#" className="text-purple-600 hover:text-purple-900 text-xs">
                                View
                              </a>
                              <a href="#" className="text-purple-600 hover:text-purple-900 text-xs">
                                Edit
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3">
                <a href="/subscriptions" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View all subscriptions →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Recent Services */}
        {availableServices.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 overflow-hidden shadow-sm sm:rounded-lg mb-6 border border-orange-200">
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-orange-900">Recent Services</h3>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed divide-y divide-orange-100">
                    <thead className="bg-orange-50 border-b border-orange-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider" style={{width: '55%'}}>Name</th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-orange-700 uppercase tracking-wider" style={{width: '15%'}}>Category</th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-orange-700 uppercase tracking-wider" style={{width: '15%'}}>Description</th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-orange-700 uppercase tracking-wider" style={{width: '15%'}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-orange-50">
                      {availableServices.map((service) => (
                        <tr key={service.id} className="hover:bg-orange-50 transition duration-150">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-orange-600 font-semibold text-xs">
                                  {getServiceInitials(service.name)}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900">{service.name}</div>
                                <div className="text-xs text-gray-500">{service.website || 'No website'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              {service.category}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center text-sm text-gray-900">
                            <div className="truncate">
                              {service.description.length > 40 ? service.description.substring(0, 40) + '...' : service.description}
                            </div>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium">
                            <div className="flex justify-center space-x-2">
                              <a href="#" className="text-orange-600 hover:text-orange-900 text-xs">View</a>
                              <a href="#" className="text-orange-600 hover:text-orange-900 text-xs">Edit</a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3">
                <a href="/services" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  View all services →
                </a>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;