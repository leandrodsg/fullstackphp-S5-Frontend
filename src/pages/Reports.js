import React, { useState, useEffect } from 'react';
import { subscriptionAPI, exportReports } from '../services/api';
import { getBillingCycleDisplayText } from '../utils/billingCycleUtils';
import { 
  formatPriceWithCurrency, 
  calculateDaysUntilNextBilling, 
  isSubscriptionExpired,
  getRelativeTime 
} from '../utils/helpers';

const Reports = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uniqueServices, setUniqueServices] = useState([]);
  const [filters, setFilters] = useState({
    dateFrom: '2025-01-01',
    dateTo: '2025-12-31',
    service: 'all',
    status: 'all'
  });

  const defaultFilters = {
    dateFrom: '2025-01-01',
    dateTo: '2025-12-31',
    service: 'all',
    status: 'all'
  };

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const loadReports = async (currentFilters = filters) => {
    try {
      setLoading(true);
      const response = await subscriptionAPI.getAll();
      
      // The /subscriptions endpoint already returns all necessary data
      const subscriptions = response.data.data || response.data || [];
      
      // IMPLEMENT FRONTEND FILTERING
      let filteredSubscriptions = subscriptions;
      
      // Filter by date on frontend
      if (currentFilters.dateFrom || currentFilters.dateTo) {
        filteredSubscriptions = filteredSubscriptions.filter(sub => {
          const nextBillingDate = new Date(sub.next_billing_date);
          let passesDateFilter = true;
          
          if (currentFilters.dateFrom) {
            const fromDate = new Date(currentFilters.dateFrom);
            passesDateFilter = passesDateFilter && nextBillingDate >= fromDate;
          }
          
          if (currentFilters.dateTo) {
            const toDate = new Date(currentFilters.dateTo);
            // Adicionar 1 dia para incluir o dia selecionado
            toDate.setDate(toDate.getDate() + 1);
            passesDateFilter = passesDateFilter && nextBillingDate < toDate;
          }
          
          return passesDateFilter;
        });
      }
      
      // Filter by service on frontend
      if (currentFilters.service && currentFilters.service !== 'all') {
        filteredSubscriptions = filteredSubscriptions.filter(sub => 
          sub.service_name === currentFilters.service
        );
      }
      
      // Filter by status on frontend
      if (currentFilters.status && currentFilters.status !== 'all') {
        filteredSubscriptions = filteredSubscriptions.filter(sub => 
          sub.status === currentFilters.status
        );
      }
      
      // Create data structure compatible with the component
      const reportsData = {
        user_name: 'User', // Placeholder
        total_subscriptions: filteredSubscriptions.length,
        total_expenses: filteredSubscriptions.reduce((sum, sub) => sum + parseFloat(sub.price || 0), 0),
        currency: filteredSubscriptions[0]?.currency || 'USD',
        subscriptions: filteredSubscriptions
      };
      
      setReportsData({ data: reportsData });
      
      // Extract unique services from ALL data (not filtered) for the dropdown
      if (subscriptions) {
        const services = [...new Set(subscriptions
          .map(sub => sub.service_name)
          .filter(service => service && service.trim() !== '')
        )];
        setUniqueServices(services);
      }
      
      setError(null);
    } catch (error) {
      console.error('Error loading reports:', error);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    loadReports();
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    loadReports(defaultFilters);
  };

  const handleExport = async (format) => {
    try {
      console.log('Exporting with filters:', filters);
      console.log('Export format:', format);
      
      const content = await exportReports(format, filters);
      
      // Create a simple download link
      const element = document.createElement('a');
      const file = new Blob([content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      
      // Set filename
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = format === 'xlsx' 
        ? `subscription-reports-${timestamp}.xls`
        : `subscription-reports-${timestamp}.${format}`;
      
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      // Show success message
      alert(`Report exported successfully as ${format.toUpperCase()}!`);
    } catch (err) {
      console.error('Export error:', err);
      alert('Error exporting report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadReports}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Reports</h1>
          <p className="mt-2 text-purple-600">Analyze your subscription data and export reports</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 border border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-2">
                Next Billing From
              </label>
              <input
                type="date"
                id="dateFrom"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-2">
                Next Billing To
              </label>
              <input
                type="date"
                id="dateTo"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                id="service"
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Services</option>
                {uniqueServices.map((service, index) => (
                  <option key={`${service}-${index}`} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Subscription Data Table */}
        <div className="bg-white rounded-lg shadow border border-orange-200">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-medium text-gray-900">Subscription Data</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleExport('csv')}
                className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 w-full sm:w-auto"
              >
                Export CSV
              </button>
              <button
                onClick={() => handleExport('xlsx')}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 w-full sm:w-auto"
              >
                Export Excel
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportsData?.data?.subscriptions?.map((subscription) => {
                  const daysUntil = calculateDaysUntilNextBilling(subscription.next_billing_date);
                  const isExpired = isSubscriptionExpired(subscription.next_billing_date, subscription.status);
                  
                  return (
                  <tr key={subscription.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">
                              {subscription.service_name?.charAt(0) || '?'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{subscription.service_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPriceWithCurrency(subscription.price, subscription.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subscription.next_billing_date ? new Date(subscription.next_billing_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {daysUntil !== null ? (
                        <span className={`${
                          isExpired ? 'text-gray-600' : 
                          daysUntil <= 7 ? 'text-orange-600 font-semibold' : 
                          'text-gray-900'
                        }`}>
                          {getRelativeTime(subscription.next_billing_date)}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getBillingCycleDisplayText(subscription.billing_cycle)}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">{reportsData?.data?.subscriptions?.length || 0}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="bg-purple-50 border-purple-500 text-purple-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;