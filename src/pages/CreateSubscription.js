import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { subscriptionAPI, serviceAPI } from '../services/api';

const CreateSubscription = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    service_id: '',
    plan: '',
    price: '',
    currency: 'USD',
    next_billing_date: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getAll();
        if (response.data?.data) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error('Error loading services:', error);
        setError('Failed to load services');
      }
    };

    fetchServices();
  }, []);

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

    if (!formData.next_billing_date) {
      newErrors.next_billing_date = 'Next billing date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    setLoading(true);
    setError(null);

    try {
      const subscriptionData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      await subscriptionAPI.create(subscriptionData);
      navigate('/subscriptions', { 
        state: { message: 'Subscription created successfully!' }
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setError(error.response?.data?.message || 'Failed to create subscription');
      }
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'canceled', label: 'Canceled' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' }
  ];

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-purple-800">Create Subscription</h1>
          <p className="text-purple-600 mt-1">Add a new subscription</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow border border-purple-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="service_id" className="block text-sm font-medium text-gray-700 mb-2">
                Service *
              </label>
              <select
                id="service_id"
                name="service_id"
                value={formData.service_id}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.service_id ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service_id && (
                <p className="text-red-600 text-sm mt-1">{errors.service_id}</p>
              )}
            </div>

            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">
                Plan *
              </label>
              <input
                type="text"
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.plan ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g. Pro, Basic, Premium"
              />
              {errors.plan && (
                <p className="text-red-600 text-sm mt-1">{errors.plan}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency *
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="next_billing_date" className="block text-sm font-medium text-gray-700 mb-2">
                Next Billing Date *
              </label>
              <input
                type="date"
                id="next_billing_date"
                name="next_billing_date"
                value={formData.next_billing_date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.next_billing_date ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.next_billing_date && (
                <p className="text-red-600 text-sm mt-1">{errors.next_billing_date}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Subscription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscription;