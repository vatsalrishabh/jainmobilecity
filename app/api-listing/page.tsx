import React from 'react';
import Link from 'next/link';

const APIListingPage = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/products',
      description: 'Get all products from database',
      category: 'Products',
      status: 'Active',
      auth: false
    },
    {
      method: 'POST',
      path: '/api/products',
      description: 'Create a new product',
      category: 'Products',
      status: 'Active',
      auth: false
    },
    {
      method: 'PUT',
      path: '/api/products',
      description: 'Update existing product',
      category: 'Products',
      status: 'Active',
      auth: false
    },
    {
      method: 'DELETE',
      path: '/api/products?id={productId}',
      description: 'Delete product by ID',
      category: 'Products',
      status: 'Active',
      auth: false
    },
    {
      method: 'POST',
      path: '/api/upload',
      description: 'Upload product images (max 3)',
      category: 'Upload',
      status: 'Active',
      auth: false
    },
    {
      method: 'GET',
      path: '/api/docs',
      description: 'Get OpenAPI/Swagger specification',
      category: 'Documentation',
      status: 'Active',
      auth: false
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 border-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const categories = [...new Set(endpoints.map(ep => ep.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📋 API Endpoints Listing
              </h1>
              <p className="text-gray-600 mt-2">
                Complete list of all available API endpoints
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/api-docs"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                📚 Full Documentation
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                🎛️ Admin Panel
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">{endpoints.length}</div>
            <div className="text-sm text-gray-600">Total Endpoints</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-green-600">
              {endpoints.filter(ep => ep.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Endpoints</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-purple-600">
              {endpoints.filter(ep => ep.method === 'GET').length}
            </div>
            <div className="text-sm text-gray-600">GET Endpoints</div>
          </div>
        </div>

        {/* Filter by Category */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
                      <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Link
                key={category}
                href={`#category-${category.toLowerCase()}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                {category} ({endpoints.filter(ep => ep.category === category).length})
              </Link>
            ))}
          </div>
        </div>

        {/* API Endpoints by Category */}
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category} id={`category-${category.toLowerCase()}`} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  {category}
                </h2>
                <p className="text-gray-600 mt-1">
                  {endpoints.filter(ep => ep.category === category).length} endpoints
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Endpoint
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {endpoints
                      .filter(ep => ep.category === category)
                      .map((endpoint, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getMethodColor(endpoint.method)}`}>
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                              {endpoint.path}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{endpoint.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(endpoint.status)}`}>
                              {endpoint.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {endpoint.method === 'GET' ? (
                                <Link
                                  href={endpoint.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-900 transition-colors"
                                >
                                  Test
                                </Link>
                              ) : (
                                <span className="text-gray-400 cursor-not-allowed">Test</span>
                              )}
                              <Link
                                href="/api-docs"
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                Docs
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Test Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Quick API Test
            </h2>
            <p className="text-gray-600 mt-1">Test our most popular endpoints</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">📦</div>
                <h3 className="font-medium text-gray-900 mb-2">Get Products</h3>
                <Link
                  href="/api/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Test GET
                </Link>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">➕</div>
                <h3 className="font-medium text-gray-900 mb-2">Create Product</h3>
                <Link
                  href="/api-docs"
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Docs
                </Link>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">📤</div>
                <h3 className="font-medium text-gray-900 mb-2">Upload Image</h3>
                <Link
                  href="/api-docs"
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Docs
                </Link>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-medium text-gray-900 mb-2">OpenAPI Spec</h3>
                <Link
                  href="/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors inline-block"
                >
                  View JSON
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎉 API Documentation Complete
            </h3>
            <p className="text-gray-600 mb-4">
              All endpoints are documented and ready for integration
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/admin"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Admin Panel
              </Link>
              <Link
                href="/"
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Frontend
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIListingPage;
