import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { subscriptionAPI, serviceAPI } from '../services/api';

const MySubscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [subscriptionsResponse, servicesResponse] = await Promise.all([
          subscriptionAPI.getAll(),
          serviceAPI.getAll()
        ]);
        
        let subscriptionsData = [];
        let servicesData = [];

        if (subscriptionsResponse.data?.data) {
          subscriptionsData = subscriptionsResponse.data.data;
        }

        if (servicesResponse.data?.data) {
          servicesData = servicesResponse.data.data;
        }

        // Map service data to subscriptions
        const subscriptionsWithServices = subscriptionsData.map(subscription => {
          const service = servicesData.find(s => s.id === subscription.service_id);
          return {
            ...subscription,
            service: service || null
          };
        });

        setSubscriptions(subscriptionsWithServices);
      } catch (error) {
        console.error('Error loading subscriptions:', error);
        setError('Failed to load subscriptions');
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get status color (only 3 statuses: active, paused, canceled)
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format price (always USD)
  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      formatted: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      relative: getRelativeTime(date)
    };
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `in ${diffDays} days`;
    if (diffDays === -1) return 'Yesterday';
    return `${Math.abs(diffDays)} days ago`;
  };

  const handleView = (subscription) => {
    navigate(`/subscriptions/${subscription.id}`);
  };

  const handleEdit = (subscription) => {
    navigate(`/subscriptions/${subscription.id}/edit`);
  };

  const handleDelete = async (subscription) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptionAPI.delete(subscription.id);
        setSubscriptions(prev => prev.filter(s => s.id !== subscription.id));
        setSuccessMessage('Subscription deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting subscription:', error);
        setError('Failed to delete subscription');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Header with title and create button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-medium text-purple-800">My Subscriptions</h1>
            <p className="text-purple-600 mt-1">Manage all your service subscriptions</p>
          </div>
          <button
            onClick={() => navigate('/subscriptions/create')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition duration-300 font-semibold shadow-lg transform hover:scale-105"
          >
            + New Subscription
          </button>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Subscriptions table or empty state */}
        {subscriptions.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden border border-purple-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">
                    Next Billing
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-purple-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((subscription) => {
                  const dateInfo = formatDate(subscription.next_billing_date);
                  return (
                    <tr key={subscription.id} className="hover:bg-purple-50 transition-colors">
                      {/* Service name with icon */}
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 font-semibold text-sm">
                              {subscription.service?.name?.substring(0, 2) || 'SV'}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {subscription.service?.name || 'Unknown Service'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {subscription.service?.category || 'Subscription'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plan with badge */}
                      <td className="px-4 py-4 text-center">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          {subscription.plan}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-3 py-4 text-center">
                        <div className="text-sm font-bold text-gray-900">
                          {formatPrice(subscription.price)}
                        </div>
                        <div className="text-xs text-gray-500">{subscription.currency}</div>
                      </td>

                      {/* Next billing date */}
                      <td className="px-3 py-4 text-center">
                        <div className="text-sm text-gray-900">
                          {dateInfo.formatted}
                        </div>
                        <div className="text-xs text-gray-500">
                          {subscription.billing_cycle}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-4 text-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {/* View */}
                          <button
                            onClick={() => handleView(subscription)}
                            className="text-purple-600 hover:text-purple-900 w-6 h-6 flex items-center justify-center transition-colors"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </button>
                          
                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(subscription)}
                            className="text-purple-600 hover:text-purple-900 w-6 h-6 flex items-center justify-center transition-colors"
                            title="Edit Subscription"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(subscription)}
                            className="text-red-600 hover:text-red-900 w-6 h-6 flex items-center justify-center transition-colors"
                            title="Delete Subscription"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-lg shadow p-12 text-center border border-purple-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Subscriptions Yet</h3>
            <p className="text-gray-600 text-lg mb-6">Start organizing your subscriptions by creating your first one!</p>
            <button
              onClick={() => navigate('/subscriptions/create')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              New Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscriptions;