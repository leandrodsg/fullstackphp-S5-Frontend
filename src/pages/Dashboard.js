import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [subscriptionsResponse, profileResponse, servicesResponse] = await Promise.all([
          api.get('/subscriptions'),
          api.get('/profile'),
          api.get('/services')
        ]);

        if (subscriptionsResponse.data?.data) {
          setSubscriptions(subscriptionsResponse.data.data);
        }

        if (profileResponse.data?.data?.user) {
          setProfile(profileResponse.data.data.user);
        }

        if (servicesResponse.data?.data) {
          setAvailableServices(servicesResponse.data.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const monthlyTotalEUR = activeSubscriptions.reduce((total, sub) => total + (sub.price || 0), 0);
  const monthlyTotalUSD = monthlyTotalEUR * 1.09;
  const totalServices = subscriptions.length;

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
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden shadow-sm sm:rounded-lg mb-6 border border-purple-200">
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-purple-900">Recent Subscriptions</h3>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {subscriptions.length > 0 ? (
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
                              <button 
                                onClick={() => navigate(`/subscriptions/${subscription.id}`)}
                                className="text-purple-600 hover:text-purple-900 text-xs"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => navigate(`/subscriptions/${subscription.id}/edit`)}
                                className="text-purple-600 hover:text-purple-900 text-xs"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Subscriptions Yet</h4>
                  <p className="text-gray-600">Start subscribing to services to see them here.</p>
                </div>
              )}
            </div>
            <div className="mt-3">
              <Link to="/subscriptions" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                View all subscriptions →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Services */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 overflow-hidden shadow-sm sm:rounded-lg mb-6 border border-orange-200">
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-orange-900">Recent Services</h3>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {availableServices.length > 0 ? (
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
                      {availableServices.slice(0, 5).map((service) => (
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
                              {service.description && service.description.length > 40 ? service.description.substring(0, 40) + '...' : service.description || 'No description'}
                            </div>
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium">
                            <div className="flex justify-center space-x-2">
                              <button 
                                onClick={() => navigate(`/services/${service.id}`)}
                                className="text-orange-600 hover:text-orange-900 text-xs"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => navigate(`/services/${service.id}/edit`)}
                                className="text-orange-600 hover:text-orange-900 text-xs"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Services Available</h4>
                  <p className="text-gray-600">Create your first service to get started.</p>
                </div>
              )}
            </div>
            <div className="mt-3">
              <Link to="/services" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                View all services →
              </Link>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;