import mongoose from 'mongoose';
import { Product } from '../models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jainmobilecity';

const sampleProducts = [
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    modelNumber: "SM-S928B",
    description: "Premium Android smartphone with advanced camera system",
    specifications: {
      ram: "12GB",
      storage: "512GB",
      processor: "Snapdragon 8 Gen 3",
      battery: "5000mAh",
      display: "6.8-inch Dynamic AMOLED 2X",
      camera: "200MP + 50MP + 12MP + 10MP",
      os: "Android 14",
    },
    costPrice: 85000,
    sellingPrice: 129999,
    stock: 25,
    imageUrls: ["/images/products/product_1.png"],
  },
  {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    modelNumber: "A3101",
    description: "Latest iPhone with titanium design and advanced features",
    specifications: {
      ram: "8GB",
      storage: "256GB",
      processor: "A17 Pro",
      battery: "4680mAh",
      display: "6.7-inch Super Retina XDR",
      camera: "48MP + 12MP + 12MP",
      os: "iOS 17",
    },
    costPrice: 120000,
    sellingPrice: 159900,
    stock: 15,
    imageUrls: ["/images/products/product_2.jpg"],
  },
  {
    name: "OnePlus 12",
    brand: "OnePlus",
    modelNumber: "CPH2581",
    description: "Flagship killer with Hasselblad cameras",
    specifications: {
      ram: "16GB",
      storage: "512GB",
      processor: "Snapdragon 8 Gen 3",
      battery: "5400mAh",
      display: "6.82-inch LTPO4 AMOLED",
      camera: "50MP + 64MP + 48MP",
      os: "OxygenOS 14",
    },
    costPrice: 45000,
    sellingPrice: 69999,
    stock: 30,
    imageUrls: ["/images/products/product_3.png"],
  },
  {
    name: "Google Pixel 8 Pro",
    brand: "Google",
    modelNumber: "GP4BC",
    description: "Pure Android experience with computational photography",
    specifications: {
      ram: "12GB",
      storage: "256GB",
      processor: "Google Tensor G3",
      battery: "5050mAh",
      display: "6.7-inch LTPO OLED",
      camera: "50MP + 48MP + 48MP",
      os: "Android 14",
    },
    costPrice: 55000,
    sellingPrice: 89999,
    stock: 20,
    imageUrls: ["/images/products/product_4.png"],
  },
  {
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    modelNumber: "2409ARN9CL",
    description: "Premium smartphone with Leica cameras",
    specifications: {
      ram: "16GB",
      storage: "512GB",
      processor: "Snapdragon 8 Gen 3",
      battery: "5300mAh",
      display: "6.73-inch LTPO AMOLED",
      camera: "50MP + 50MP + 50MP",
      os: "HyperOS",
    },
    costPrice: 65000,
    sellingPrice: 99999,
    stock: 18,
    imageUrls: ["/images/products/product_5.png"],
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Sample Products Added:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.sellingPrice}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seeder
seedDatabase();
