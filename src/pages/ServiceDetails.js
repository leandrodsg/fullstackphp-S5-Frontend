import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { serviceAPI } from '../services/api';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceAPI.getById(id);
        setService(response.data.data); // API returns { data: service }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      // In a real application, this would make an API call
      alert('Service deleted successfully!');
      navigate('/services');
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

  if (!service && error) {
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
            <p className="text-orange-600 mb-6">The service you're looking for doesn't exist.</p>
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
            <h1 className="text-2xl font-medium text-orange-800">Service Details</h1>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            ← Back to Services
          </button>
        </div>

        {/* Main card with service details */}
        <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
          {/* Title with service */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-medium text-orange-800 mb-2">
              {service.name} - {service.category}
            </h2>
            <p className="text-orange-600 text-sm">Service ID: #{service.id}</p>
          </div>

          {/* Main service information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-orange-700">Category</span>
                <span className="text-sm font-bold text-orange-900">{service.category}</span>
              </div>
            </div>

            {/* Website URL */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-orange-700">Website</span>
                {service.website_url ? (
                  <a
                    href={service.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 underline break-all max-w-[60%] text-right"
                  >
                    {new URL(service.website_url).hostname}
                  </a>
                ) : (
                  <span className="text-sm text-gray-500 italic">No website</span>
                )}
              </div>
            </div>
          </div>

          {/* Service description */}
          {service.description && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="text-lg font-bold text-orange-800 mb-2">Description</h3>
              <p className="text-sm text-orange-900 leading-relaxed">{service.description}</p>
            </div>
          )}

          {/* Timestamp information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Creation date */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-orange-700">Created At</span>
                <span className="text-sm font-bold text-orange-900">
                  {service.created_at ? new Date(service.created_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>

            {/* Last update */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-orange-700">Last Updated</span>
                <span className="text-sm font-bold text-orange-900">
                  {service.updated_at ? new Date(service.updated_at).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Related subscriptions if they exist */}
          {service.subscriptions && service.subscriptions.length > 0 && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="text-lg font-bold text-orange-700 mb-3">Active Subscriptions</h3>
              <div className="space-y-2">
                {service.subscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-orange-200">
                    <div>
                      <span className="font-semibold text-orange-900 text-sm">{subscription.plan}</span>
                      <span className="text-orange-700 ml-2 text-sm">
                        - {subscription.price.toFixed(2)} {subscription.currency}
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium underline text-sm">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4 pt-4 border-t border-orange-200 mt-6">
            {/* Edit service button */}
            <button
              onClick={() => navigate(`/services/${service.id}/edit`)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36 text-center"
            >
              Edit Service
            </button>

            {/* Delete service button with confirmation */}
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm w-36"
            >
              Delete Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;