import { NextResponse } from 'next/server';

export async function GET() {
  const swaggerDoc = {
    openapi: '3.0.0',
    info: {
      title: 'Jain Mobile City API',
      version: '1.0.0',
      description: 'E-commerce API for mobile phones and accessories',
      contact: {
        name: 'API Support',
        email: 'support@jainmobilecity.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://your-production-domain.com',
        description: 'Production server'
      }
    ],
    paths: {
      '/api/products': {
        get: {
          summary: 'Get all products',
          description: 'Retrieve a list of all products from the database',
          tags: ['Products'],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Failed to fetch products'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create a new product',
          description: 'Add a new product to the database',
          tags: ['Products'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProductInput'
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Product created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Validation failed'
                      }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Failed to create product'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          summary: 'Update a product',
          description: 'Update an existing product in the database',
          tags: ['Products'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ProductInput' },
                    {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          description: 'Product ID to update',
                          example: '507f1f77bcf86cd799439011'
                        }
                      },
                      required: ['_id']
                    }
                  ]
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            },
            404: {
              description: 'Product not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Product not found'
                      }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Failed to update product'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/products/{id}': {
        delete: {
          summary: 'Delete a product',
          description: 'Delete a product from the database',
          tags: ['Products'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Product ID to delete'
            }
          ],
          responses: {
            200: {
              description: 'Product deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Product deleted successfully'
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Product not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Product not found'
                      }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Failed to delete product'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/upload': {
        post: {
          summary: 'Upload product images',
          description: 'Upload images for products (max 3 images allowed)',
          tags: ['Upload'],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: 'Image file to upload'
                    }
                  },
                  required: ['file']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Image uploaded successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      fileUrl: {
                        type: 'string',
                        example: '/uploads/image-12345.jpg'
                      },
                      fileName: {
                        type: 'string',
                        example: 'image-12345.jpg'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
                      }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Failed to upload file'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique product identifier',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              description: 'Product name',
              example: 'iPhone 15 Pro'
            },
            brand: {
              type: 'string',
              description: 'Product brand',
              example: 'Apple'
            },
            modelNumber: {
              type: 'string',
              description: 'Model number',
              example: 'A3101'
            },
            description: {
              type: 'string',
              description: 'Product description',
              example: 'Latest iPhone with advanced features'
            },
            specifications: {
              type: 'object',
              properties: {
                ram: {
                  type: 'string',
                  example: '8GB'
                },
                storage: {
                  type: 'string',
                  example: '256GB'
                },
                processor: {
                  type: 'string',
                  example: 'A17 Pro'
                },
                battery: {
                  type: 'string',
                  example: '3274mAh'
                },
                display: {
                  type: 'string',
                  example: '6.1-inch Super Retina XDR'
                },
                camera: {
                  type: 'string',
                  example: '48MP + 12MP + 12MP'
                },
                os: {
                  type: 'string',
                  example: 'iOS 17'
                }
              }
            },
            costPrice: {
              type: 'number',
              description: 'Cost price in rupees',
              example: 75000
            },
            sellingPrice: {
              type: 'number',
              description: 'Selling price in rupees',
              example: 89999
            },
            stock: {
              type: 'integer',
              description: 'Available stock quantity',
              example: 25
            },
            imageUrls: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Product image URLs (max 3)',
              example: ['/uploads/iphone-1.jpg', '/uploads/iphone-2.jpg']
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product creation timestamp',
              example: '2024-01-15T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product last update timestamp',
              example: '2024-01-15T10:30:00.000Z'
            }
          },
          required: ['name', 'brand', 'specifications', 'costPrice', 'sellingPrice', 'stock']
        },
        ProductInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Product name',
              example: 'iPhone 15 Pro'
            },
            brand: {
              type: 'string',
              description: 'Product brand',
              example: 'Apple'
            },
            modelNumber: {
              type: 'string',
              description: 'Model number',
              example: 'A3101'
            },
            description: {
              type: 'string',
              description: 'Product description',
              example: 'Latest iPhone with advanced features'
            },
            specifications: {
              type: 'object',
              properties: {
                ram: {
                  type: 'string',
                  example: '8GB'
                },
                storage: {
                  type: 'string',
                  example: '256GB'
                },
                processor: {
                  type: 'string',
                  example: 'A17 Pro'
                },
                battery: {
                  type: 'string',
                  example: '3274mAh'
                },
                display: {
                  type: 'string',
                  example: '6.1-inch Super Retina XDR'
                },
                camera: {
                  type: 'string',
                  example: '48MP + 12MP + 12MP'
                },
                os: {
                  type: 'string',
                  example: 'iOS 17'
                }
              },
              required: ['ram', 'storage']
            },
            costPrice: {
              type: 'number',
              description: 'Cost price in rupees',
              example: 75000
            },
            sellingPrice: {
              type: 'number',
              description: 'Selling price in rupees',
              example: 89999
            },
            stock: {
              type: 'integer',
              description: 'Available stock quantity',
              example: 25
            },
            imageUrls: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Product image URLs (max 3)',
              example: ['/uploads/iphone-1.jpg', '/uploads/iphone-2.jpg']
            }
          },
          required: ['name', 'brand', 'specifications', 'costPrice', 'sellingPrice', 'stock']
        }
      }
    },
    tags: [
      {
        name: 'Products',
        description: 'Product management endpoints'
      },
      {
        name: 'Upload',
        description: 'File upload endpoints'
      }
    ]
  };

  return NextResponse.json(swaggerDoc);
}
