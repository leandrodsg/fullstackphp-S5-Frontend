import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { subscriptionAPI, serviceAPI } from '../services/api';
import { getInitials } from '../utils/helpers';

const SubscriptionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [subscriptionResponse, servicesResponse] = await Promise.all([
          subscriptionAPI.getById(id),
          serviceAPI.getAll()
        ]);
        
        if (subscriptionResponse.data?.data) {
          const subscriptionData = subscriptionResponse.data.data;
          let servicesData = [];

          if (servicesResponse.data?.data) {
            servicesData = servicesResponse.data.data;
          }

          // Find the service for this subscription
          const service = servicesData.find(s => s.id === subscriptionData.service_id);
          
          setSubscription({
            ...subscriptionData,
            service: service || null
          });
        } else {
          setError('Subscription not found');
        }
      } catch (error) {
        console.error('Error loading subscription:', error);
        setError('Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'paused': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'canceled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      formatted: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
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

  const handleEdit = () => {
    navigate(`/subscriptions/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this subscription? This action cannot be undone.')) {
      try {
        await subscriptionAPI.delete(id);
        navigate('/subscriptions', { 
          state: { message: 'Subscription deleted successfully!' }
        });
      } catch (error) {
        console.error('Error deleting subscription:', error);
        setError('Failed to delete subscription');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-1 sm:p-2 lg:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="animate-pulse">
              <div className="h-8 bg-orange-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-orange-100 rounded w-1/4 mx-auto mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-16 bg-orange-50 rounded"></div>
                <div className="h-16 bg-orange-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-1 sm:p-2 lg:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100 text-center">
            <h2 className="text-xl font-medium text-orange-800 mb-4">Error Loading Subscription</h2>
            <p className="text-orange-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/subscriptions')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              ← Back to Subscriptions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="p-1 sm:p-2 lg:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100 text-center">
            <h2 className="text-xl font-medium text-orange-800 mb-4">Subscription Not Found</h2>
            <p className="text-orange-600 mb-6">The subscription you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/subscriptions')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              ← Back to Subscriptions
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextBillingInfo = formatDate(subscription.next_billing_date);

  return (
    <div className="p-1 sm:p-2 lg:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Page header with title and back button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-medium text-purple-800">Subscription Details</h1>
          </div>
          <button
            onClick={() => navigate('/subscriptions')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            ← Back to Subscriptions
          </button>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Main card with subscription details */}
        <div className="bg-white rounded-lg shadow p-6 border border-purple-100">
          {/* Title with subscription */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-purple-800 mb-2">
              {subscription.service?.name || 'Unknown Service'} - {subscription.plan}
            </h2>
            <p className="text-purple-600 text-sm">Subscription ID: #{subscription.id}</p>
          </div>

          {/* Main subscription information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Status */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-700">Status</span>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(subscription.status)}`}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Plan */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-700">Plan</span>
                <span className="text-sm font-bold text-purple-900">{subscription.plan}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-700">Price</span>
                <span className="text-sm font-bold text-purple-900">
                  {formatPrice(subscription.price, subscription.currency)}
                </span>
              </div>
            </div>

            {/* Currency */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-700">Currency</span>
                <span className="text-sm font-bold text-purple-900">{subscription.currency}</span>
              </div>
            </div>
          </div>

          {/* Next billing date - full width */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-2">Next Billing Date</h3>
            <p className="text-sm text-purple-900 leading-relaxed">
              <strong>{nextBillingInfo.formatted}</strong> - {nextBillingInfo.relative}
            </p>
          </div>

          {/* Timestamp information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Creation date */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-700">Created At</span>
                <span className="text-sm font-bold text-purple-900">
                  {subscription.created_at ? new Date(subscription.created_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>

            {/* Last update */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-700">Last Updated</span>
                <span className="text-sm font-bold text-purple-900">
                  {subscription.updated_at ? new Date(subscription.updated_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 pt-4 border-t border-purple-200 mt-6">
            {/* Edit subscription button */}
            <button
              onClick={handleEdit}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36 text-center"
            >
              Edit Subscription
            </button>

            {/* Delete subscription button with confirmation */}
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36"
            >
              Delete Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;