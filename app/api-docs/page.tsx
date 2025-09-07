import React from 'react';
import Link from 'next/link';

const APIDocsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📚 Jain Mobile City API Documentation
              </h1>
              <p className="text-gray-600 mt-2">
                Complete API reference for our e-commerce platform
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Version</div>
              <div className="text-lg font-semibold text-blue-600">1.0.0</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">🔗</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Endpoints</div>
                <div className="text-2xl font-bold text-gray-900">4</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Products</div>
                <div className="text-2xl font-bold text-gray-900">∞</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🖼️</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Images Max</div>
                <div className="text-2xl font-bold text-gray-900">3</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Database</div>
                <div className="text-2xl font-bold text-gray-900">MongoDB</div>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          {/* Products Endpoints */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Products API
              </h2>
              <p className="text-gray-600 mt-1">Manage smartphone inventory</p>
            </div>

            <div className="divide-y divide-gray-200">
              {/* GET Products */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      GET
                    </span>
                    <code className="text-sm font-mono text-gray-900">/api/products</code>
                  </div>
                  <span className="text-sm text-gray-500">Get all products</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Response</h4>
                  <pre className="text-xs text-gray-600 overflow-x-auto">
{`[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15 Pro",
    "brand": "Apple",
    "sellingPrice": 89999,
    "specifications": {
      "ram": "8GB",
      "storage": "256GB"
    },
    "imageUrls": ["/uploads/iphone-1.jpg"]
  }
]`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Success Response</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-sm text-green-800">200 OK - Array of products</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Error Response</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="text-sm text-red-800">500 Internal Server Error</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* POST Products */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      POST
                    </span>
                    <code className="text-sm font-mono text-gray-900">/api/products</code>
                  </div>
                  <span className="text-sm text-gray-500">Create new product</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Request Body</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-xs text-gray-600">
{`{
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "specifications": {
    "ram": "8GB",
    "storage": "256GB"
  },
  "costPrice": 75000,
  "sellingPrice": 89999,
  "stock": 25,
  "imageUrls": ["/uploads/iphone.jpg"]
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Success Response</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <div className="text-sm text-green-800">201 Created - Product object</div>
                    </div>

                    <h4 className="text-sm font-medium text-gray-900 mb-2">Error Response</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="text-sm text-red-800">400 Bad Request - Validation error</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PUT Products */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      PUT
                    </span>
                    <code className="text-sm font-mono text-gray-900">/api/products</code>
                  </div>
                  <span className="text-sm text-gray-500">Update existing product</span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Include the product ID in the request body to update an existing product.
                  </p>
                </div>
              </div>

              {/* DELETE Products */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      DELETE
                    </span>
                    <code className="text-sm font-mono text-gray-900">/api/products?id=123</code>
                  </div>
                  <span className="text-sm text-gray-500">Delete product by ID</span>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    ⚠️ This action cannot be undone. Use the product ID as a query parameter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Endpoints */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                File Upload API
              </h2>
              <p className="text-gray-600 mt-1">Upload product images</p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    POST
                  </span>
                  <code className="text-sm font-mono text-gray-900">/api/upload</code>
                </div>
                <span className="text-sm text-gray-500">Upload product images</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Maximum 3 images per product</li>
                    <li>• Supported formats: JPEG, PNG, WebP</li>
                    <li>• Maximum file size: 5MB per image</li>
                    <li>• Content-Type: multipart/form-data</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Response</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-xs text-gray-600">
{`{
  "success": true,
  "fileUrl": "/uploads/image-12345.jpg",
  "fileName": "image-12345.jpg"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Testing Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                API Testing Tools
              </h2>
              <p className="text-gray-600 mt-1">Test our API endpoints</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl mb-2">🌐</div>
                  <h3 className="font-medium text-gray-900 mb-1">Browser</h3>
                  <p className="text-sm text-gray-600">Test directly in browser</p>
                  <a
                    href="http://localhost:3000/api/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Try GET /api/products
                  </a>
                </div>

                <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl mb-2">📱</div>
                  <h3 className="font-medium text-gray-900 mb-1">Postman</h3>
                  <p className="text-sm text-gray-600">Import collection</p>
                  <Link
                    href="/api/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Collection
                  </Link>
                </div>

                <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-medium text-gray-900 mb-1">cURL</h3>
                  <p className="text-sm text-gray-600">Command line testing</p>
                  <div className="text-xs text-gray-500 mt-2 font-mono bg-gray-100 p-2 rounded">
                    curl http://localhost:3000/api/products
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🚀 Ready for Production
              </h3>
              <p className="text-gray-600 mb-4">
                Our API is fully documented and ready for integration
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  MongoDB Integration
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  CRUD Operations
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  File Upload
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocsPage;
