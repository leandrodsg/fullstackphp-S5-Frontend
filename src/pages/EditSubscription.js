import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { subscriptionAPI, serviceAPI } from '../services/api';
import { calculateBillingCycleFromDates } from '../utils/billingCycleUtils';

const EditSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    service_id: '',
    plan: '',
    price: '',
    currency: 'USD',
    billing_cycle: 'monthly',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch subscription and services in parallel
        const [subscriptionResponse, servicesResponse] = await Promise.all([
          subscriptionAPI.getById(id),
          serviceAPI.getAll()
        ]);

        if (subscriptionResponse.data?.data) {
          const subscription = subscriptionResponse.data.data;
          
          // Calculate billing cycle if not provided by backend
          let billingCycle = subscription.billing_cycle;
          if (!billingCycle && subscription.created_at && subscription.next_billing_date) {
            billingCycle = calculateBillingCycleFromDates(subscription.created_at, subscription.next_billing_date);
          }
          
          setFormData({
            service_id: subscription.service_id || '',
            plan: subscription.plan || '',
            price: subscription.price || '',
            currency: subscription.currency || 'USD',
            billing_cycle: billingCycle || 'monthly',
            status: subscription.status || 'active'
          });
        }

        if (servicesResponse.data?.data) {
          setServices(servicesResponse.data.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load subscription data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.service_id) {
      newErrors.service_id = 'Service is required';
    }

    if (!formData.plan.trim()) {
      newErrors.plan = 'Plan is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate next billing date based on billing cycle
  const calculateNextBillingDate = (billingCycle) => {
    const today = new Date();
    const nextBilling = new Date(today);
    
    if (billingCycle === 'annual') {
      nextBilling.setFullYear(today.getFullYear() + 1);
    } else {
      nextBilling.setMonth(today.getMonth() + 1);
    }
    
    return nextBilling.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const subscriptionData = {
        ...formData,
        price: parseFloat(formData.price),
        next_billing_date: calculateNextBillingDate(formData.billing_cycle)
      };

      await subscriptionAPI.update(id, subscriptionData);
      navigate('/subscriptions', { 
        state: { message: 'Subscription updated successfully!' }
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setError(error.response?.data?.message || 'Failed to update subscription');
      }
    } finally {
      setSaving(false);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const billingCycleOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' }
  ];

  if (loading) {
    return (
      <div className="p-1 sm:p-2 lg:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 border border-purple-100">
            <div className="animate-pulse">
              <div className="h-8 bg-purple-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-purple-100 rounded w-1/4 mx-auto mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-16 bg-purple-50 rounded"></div>
                <div className="h-16 bg-purple-50 rounded"></div>
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
          <div className="bg-white rounded-lg shadow p-6 border border-purple-100 text-center">
        <h2 className="text-xl font-medium text-purple-800 mb-4">Error Loading Subscription</h2>
        <p className="text-purple-600 mb-6">{error}</p>
        <button
          onClick={() => navigate('/subscriptions')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
        >
          ← Back to Subscriptions
        </button>
      </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 sm:p-2 lg:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Page header with title and back button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-medium text-purple-800">Edit Subscription</h1>
          </div>
          <button
            onClick={() => navigate(`/subscriptions/${id}`)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            ← Back to Details
          </button>
        </div>

        {/* Main card with form */}
        <div className="bg-white rounded-lg shadow p-6 border border-purple-100">
          {/* Title */}
          <div className="mb-6 text-center">
            <p className="text-purple-600 text-sm">Subscription ID: #{id}</p>
          </div>

          {/* Validation errors display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <strong className="text-red-800">Error:</strong>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          )}

          {/* Main form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fields in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Selection */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="service_id" className="block text-sm font-semibold text-purple-700 mb-2">
                  Service *
                </label>
                <select
                  id="service_id"
                  name="service_id"
                  value={formData.service_id}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.service_id ? 'border-red-500' : 'border-purple-200'
                  }`}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.category}
                    </option>
                  ))}
                </select>
                {errors.service_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.service_id}</p>
                )}
              </div>

              {/* Plan */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="plan" className="block text-sm font-semibold text-purple-700 mb-2">
                  Plan *
                </label>
                <input
                  type="text"
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.plan ? 'border-red-500' : 'border-purple-200'
                  }`}
                  placeholder="e.g., Basic, Premium, Pro"
                  required
                />
                {errors.plan && (
                  <p className="mt-1 text-sm text-red-600">{errors.plan}</p>
                )}
              </div>

              {/* Price */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="price" className="block text-sm font-semibold text-purple-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.price ? 'border-red-500' : 'border-purple-200'
                  }`}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Currency */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="currency" className="block text-sm font-semibold text-purple-700 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="status" className="block text-sm font-semibold text-purple-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Billing Cycle */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="billing_cycle" className="block text-sm font-semibold text-purple-700 mb-2">
                  Billing Cycle *
                </label>
                <select
                  id="billing_cycle"
                  name="billing_cycle"
                  value={formData.billing_cycle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {billingCycleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Billing Date (Calculated) */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <label htmlFor="next_billing_preview" className="block text-sm font-semibold text-purple-700 mb-2">
                  Next Billing Date (Calculated)
                </label>
                <input
                  type="text"
                  id="next_billing_preview"
                  value={calculateNextBillingDate(formData.billing_cycle)}
                  readOnly
                  className="w-full px-3 py-2 border border-purple-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-purple-600 mt-1">
                  Automatically calculated based on billing cycle
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 pt-4 border-t border-purple-200 mt-6">
              {/* Cancel button */}
              <button
                type="button"
                onClick={() => navigate('/subscriptions')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36"
              >
                Cancel
              </button>

              {/* Update button */}
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Updating...' : 'Update Subscription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSubscription;