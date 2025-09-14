import mongoose, { Schema, Document } from 'mongoose';
import { Product as ProductInterface } from '@/types/product';

export interface IProduct extends Document, Omit<ProductInterface, '_id'> {
  _id: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  modelNumber: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  specifications: {
    ram: {
      type: String,
      required: [true, 'RAM specification is required']
    },
    storage: {
      type: String,
      required: [true, 'Storage specification is required']
    },
    processor: String,
    battery: String,
    display: String,
    camera: String,
    os: String,
    weight: String,
    color: String
  },
  costPrice: {
    type: Number,
    required: [true, 'Cost price is required'],
    min: [0, 'Cost price cannot be negative']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: [0, 'Selling price cannot be negative']
  },
  mrp: {
    type: Number,
    min: [0, 'MRP cannot be negative']
  },
  discountPercentage: {
    type: Number,
    min: [0, 'Discount percentage cannot be negative'],
    max: [100, 'Discount percentage cannot exceed 100%']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative']
  },
  imageUrls: {
    type: [{
      type: String,
      validate: {
        validator: function(v: string) {
          return /^\/uploads\/|^\/images\/|^https?:\/\//.test(v);
        },
        message: 'Image URL must be a valid path or URL'
      }
    }],
    validate: {
      validator: function(arr: string[]) {
        return arr.length <= 3;
      },
      message: 'Maximum 3 images allowed per product'
    }
  },
  ratings: {
    average: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0
    },
    count: {
      type: Number,
      min: [0, 'Review count cannot be negative'],
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better performance
ProductSchema.index({ name: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ 'specifications.ram': 1 });
ProductSchema.index({ 'specifications.storage': 1 });
ProductSchema.index({ sellingPrice: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ createdAt: -1 });

// Virtual for profit margin
ProductSchema.virtual('profitMargin').get(function() {
  if (this.costPrice === 0) return 0;
  return ((this.sellingPrice - this.costPrice) / this.costPrice) * 100;
});

// Pre-save middleware to calculate discount percentage
ProductSchema.pre('save', function(next) {
  if (this.mrp && this.sellingPrice) {
    this.discountPercentage = ((this.mrp - this.sellingPrice) / this.mrp) * 100;
  }
  next();
});

// Static method to get products by brand
ProductSchema.statics.getByBrand = function(brand: string) {
  return this.find({ brand: new RegExp(brand, 'i') });
};

// Static method to get products by price range
ProductSchema.statics.getByPriceRange = function(min: number, max: number) {
  return this.find({ sellingPrice: { $gte: min, $lte: max } });
};

// Instance method to check if product is in stock
ProductSchema.methods.isInStock = function() {
  return this.stock > 0;
};

// Instance method to get formatted price
ProductSchema.methods.getFormattedPrice = function() {
  return `₹${this.sellingPrice.toLocaleString()}`;
};

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
