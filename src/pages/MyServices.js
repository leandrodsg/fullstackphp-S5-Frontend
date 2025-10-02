import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { serviceAPI } from '../services/api';
import { getInitials } from '../utils/helpers';

const MyServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await serviceAPI.getAll();
        
        if (response.data?.data) {
          setServices(response.data.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error('Error loading services:', error);
        setError('Failed to load services');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Others': 'bg-orange-100 text-orange-800',
      'Courses': 'bg-blue-100 text-blue-800',
      'Infrastructure': 'bg-green-100 text-green-800',
      'AI': 'bg-purple-100 text-purple-800',
      'DevTool': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleView = (service) => {
    navigate(`/services/${service.id}`);
  };

  const handleEdit = (service) => {
    navigate(`/services/${service.id}/edit`);
  };

  const handleDelete = (service) => {
    if (window.confirm(`Are you sure you want to delete ${service.name}?`)) {
      setServices(services.filter(s => s.id !== service.id));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-lg shadow border border-orange-200 p-6">
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading services</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with title and button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-medium text-orange-800">My Services</h1>
            <p className="text-orange-600 mt-1">Manage available services for subscriptions</p>
          </div>
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={() => navigate('/services/create')}
          >
            + New Service
          </button>
        </div>

        {/* Services table */}
        {services.length > 0 ? (
          <div className="bg-white rounded-lg shadow border border-orange-200">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-orange-50 border-b border-orange-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-orange-50 transition-colors">
                    {/* Name with avatar */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-orange-600 font-medium text-sm">
                            {getInitials(service.name)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {service.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Service
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category with badge */}
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                    </td>

                    {/* Website */}
                    <td className="px-3 py-4 text-center">
                      {service.website_url ? (
                        <a 
                          href={service.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                          🔗 Visit
                        </a>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          No website
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {/* View */}
                        <button 
                          onClick={() => handleView(service)}
                          className="text-orange-600 hover:text-orange-900 w-6 h-6 flex items-center justify-center transition-colors"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                        
                        {/* Edit */}
                        <button 
                          onClick={() => handleEdit(service)}
                          className="text-orange-600 hover:text-orange-900 w-6 h-6 flex items-center justify-center transition-colors"
                          title="Edit Service"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        
                        {/* Delete */}
                        <button 
                          onClick={() => handleDelete(service)}
                          className="text-red-600 hover:text-red-900 w-6 h-6 flex items-center justify-center transition-colors"
                          title="Delete Service"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-lg shadow p-12 text-center border border-orange-100">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Services Yet</h3>
            <p className="text-gray-600 text-lg mb-6">Start building your subscription ecosystem by creating your first service!</p>
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium inline-flex items-center transition-colors"
              onClick={() => navigate('/services/create')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              New Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;