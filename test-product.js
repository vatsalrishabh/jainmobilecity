const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/jainmobilecity';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  brand: { type: String, required: [true, 'Brand is required'], trim: true },
  modelNumber: { type: String, trim: true },
  description: { type: String, trim: true },
  specifications: {
    ram: { type: String, required: [true, 'RAM specification is required'] },
    storage: { type: String, required: [true, 'Storage specification is required'] },
    processor: { type: String },
    battery: { type: String },
    display: { type: String },
    camera: { type: String },
    os: { type: String },
  },
  costPrice: { type: Number, required: [true, 'Cost price is required'], min: [0, 'Cost price cannot be negative'] },
  sellingPrice: { type: Number, required: [true, 'Selling price is required'], min: [0, 'Selling price cannot be negative'] },
  stock: { type: Number, required: [true, 'Stock quantity is required'], min: [0, 'Stock cannot be negative'] },
  imageUrls: {
    type: [{ type: String, validate: { validator: function(v) { return /^\/uploads\/|^\/images\/|^https?:\/\//.test(v); }, message: 'Image URL must be a valid path or URL' } }],
    validate: { validator: function(arr) { return arr.length <= 3; }, message: 'Maximum 3 images allowed per product' }
  },
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 }
  }
}, {
  timestamps: true,
  toJSON: { transform: function(doc, ret) { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function testProduct() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const testData = {
      name: "Test Product",
      brand: "Test",
      costPrice: 100,
      sellingPrice: 200,
      stock: 10,
      specifications: {
        ram: "8GB",
        storage: "128GB"
      }
    };

    console.log('Creating product with data:', testData);
    const product = new Product(testData);
    await product.save();
    console.log('Product created successfully:', product);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testProduct();
