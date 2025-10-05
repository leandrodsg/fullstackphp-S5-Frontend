import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { serviceAPI } from '../services/api';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    website_url: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = [
    'Streaming',
    'Software', 
    'Cloud Storage',
    'Music',
    'Gaming',
    'Other'
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceAPI.getById(id);
        const foundService = response.data.data; // API returns { data: service }
        
        if (foundService) {
          setService(foundService);
          setFormData({
            name: foundService.name,
            category: foundService.category,
            website_url: foundService.website_url || '',
            description: foundService.description || ''
          });
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.website_url && !isValidUrl(formData.website_url)) {
      newErrors.website_url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await serviceAPI.update(id, {
        name: formData.name,
        category: formData.category,
        website_url: formData.website_url,
        description: formData.description
      });
      
      if (response.data) {
        alert('Service updated successfully!');
        navigate(`/services/${id}`);
      }
    } catch (error) {
      console.error('Error updating service:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Error updating service. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
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
            <h2 className="text-xl font-medium text-orange-800 mb-4">Error Loading Service</h2>
            <p className="text-orange-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/services')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              ← Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-1 sm:p-2 lg:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100 text-center">
            <h2 className="text-xl font-medium text-orange-800 mb-4">Service Not Found</h2>
            <p className="text-orange-600 mb-6">The service you're trying to edit doesn't exist.</p>
            <button
              onClick={() => navigate('/services')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
            >
              ← Back to Services
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
            <h1 className="text-2xl font-medium text-orange-800">Edit Service</h1>
          </div>
          <button
            onClick={() => navigate(`/services/${id}`)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            ← Back to Details
          </button>
        </div>

        {/* Main card with form */}
        <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
          {/* Title with service */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-orange-800 mb-2">
              Edit {service.name} - {service.category}
            </h2>
            <p className="text-orange-600 text-sm">Service ID: #{service.id}</p>
          </div>

          {/* Validation errors display */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <strong className="text-red-800">Please fix the following errors:</strong>
              <ul className="mt-2 list-disc list-inside text-sm">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Main form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fields in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Required name field */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <label htmlFor="name" className="block text-sm font-semibold text-orange-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.name ? 'border-red-500' : 'border-orange-200'
                  }`}
                  placeholder="Enter service name"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Required category field */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <label htmlFor="category" className="block text-sm font-semibold text-orange-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.category ? 'border-red-500' : 'border-orange-200'
                  }`}
                  required
                >
                  <option value="">Select a category...</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Optional website URL field */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <label htmlFor="website_url" className="block text-sm font-semibold text-orange-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="website_url"
                name="website_url"
                value={formData.website_url}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.website_url ? 'border-red-500' : 'border-orange-200'
                }`}
                placeholder="https://example.com"
              />
              {errors.website_url && (
                <p className="mt-1 text-sm text-red-600">{errors.website_url}</p>
              )}
            </div>

            {/* Optional description field */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <label htmlFor="description" className="block text-sm font-semibold text-orange-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.description ? 'border-red-500' : 'border-orange-200'
                }`}
                placeholder="Brief description of the service"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 pt-4 border-t border-orange-200 mt-6">
              <button
                type="button"
                onClick={() => navigate(`/services/${id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;