import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    console.log('🔄 Connecting to database...');
    await connectToDatabase();
    console.log('✅ Connected to database');

    console.log('🔄 Fetching products...');
    // Fetch all products
    const products = await Product.find({}).sort({ createdAt: -1 });
    console.log(`📦 Found ${products.length} products`);

    if (products.length === 0) {
      return NextResponse.json({
        flashDeals: [],
        categoryDeals: [],
        bundleDeals: [],
        topDeals: [],
        totalProducts: 0,
        activeDeals: 0,
      });
    }

    // Calculate discount percentage for each product
    const productsWithDiscount = products.map((product, index) => {
      // For demo purposes, assign discount percentages based on product index
      // In a real application, this would come from MRP field or business rules
      const discountPercentages = [25, 15, 30, 20, 35]; // Sample discounts
      const discountPercentage = discountPercentages[index] || 10;

      return {
        ...product.toObject(),
        discountPercentage,
        id: product._id.toString(), // Ensure id field for frontend compatibility
      };
    });

    console.log('🔄 Processing deals...');

    // Categorize deals
    const flashDeals = productsWithDiscount
      .filter(product => product.discountPercentage >= 5 && product.stock > 0)
      .slice(0, 3)
      .map((product, index) => ({
        id: product._id.toString(),
        title: product.name,
        originalPrice: Math.round(product.sellingPrice / (1 - product.discountPercentage / 100)),
        discountPrice: product.sellingPrice,
        discountPercentage: product.discountPercentage,
        image: product.imageUrls?.[0] || '/images/products/default.png',
        timeLeft: getTimeLeft(index),
        badge: getBadge(product.discountPercentage),
        stock: product.stock,
        brand: product.brand,
        specifications: product.specifications,
      }));

    const categoryDeals = [
      {
        id: 'smartphones',
        category: 'Smartphones',
        title: 'Up to 25% OFF on All Smartphones',
        description: 'Latest smartphones with amazing discounts',
        image: '/images/products/product_1.png',
        minDiscount: 15,
        maxDiscount: 25,
        items: productsWithDiscount.filter(p => p.discountPercentage >= 15 && p.discountPercentage <= 25).length,
      },
      {
        id: 'accessories',
        category: 'Accessories',
        title: 'Buy 2 Get 1 FREE on Accessories',
        description: 'Complete your mobile setup with our accessory deals',
        image: '/images/products/product_3.png',
        minDiscount: 20,
        maxDiscount: 50,
        items: productsWithDiscount.filter(p => p.discountPercentage >= 20).length,
      },
      {
        id: 'audio',
        category: 'Audio Devices',
        title: 'Wireless Earbuds at 40% OFF',
        description: 'Premium sound quality at unbeatable prices',
        image: '/images/products/product_2.jpg',
        minDiscount: 30,
        maxDiscount: 40,
        items: productsWithDiscount.filter(p => p.discountPercentage >= 30 && p.discountPercentage <= 40).length,
      }
    ];

    // Create bundle deals from available products
    const bundleDeals = createBundleDeals(productsWithDiscount);

    // Get top selling products for special offers
    const topDeals = productsWithDiscount
      .filter(product => product.discountPercentage >= 5)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 6);

    const response = {
      flashDeals,
      categoryDeals,
      bundleDeals,
      topDeals,
      totalProducts: productsWithDiscount.length,
      activeDeals: productsWithDiscount.filter(p => p.discountPercentage > 0).length,
    };

    console.log('✅ Deals processed successfully');
    console.log(`📊 Flash deals: ${flashDeals.length}, Category deals: ${categoryDeals.length}, Bundle deals: ${bundleDeals.length}`);

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

  } catch (error) {
    console.error('❌ Error fetching deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function getTimeLeft(index: number): string {
  const times = ['02:15:30', '01:45:20', '03:30:15'];
  return times[index] || '01:00:00';
}

function getBadge(discountPercentage: number): string {
  if (discountPercentage >= 30) return '💎 PREMIUM DEAL';
  if (discountPercentage >= 20) return '🔥 FLASH DEAL';
  if (discountPercentage >= 10) return '⚡ LIMITED TIME';
  return '🎁 SPECIAL OFFER';
}

interface DealProduct {
  _id: string;
  name: string;
  sellingPrice: number;
  costPrice: number;
  discountPercentage: number;
  imageUrls: string[];
  stock: number;
  brand: string;
  category: string;
}

function createBundleDeals(products: DealProduct[]) {
  // Create bundle deals from available products
  const highValueProducts = products.filter(p => p.sellingPrice >= 20000);
  const accessories = products.filter(p => p.sellingPrice < 10000);

  const bundles = [];

  if (highValueProducts.length >= 1 && accessories.length >= 1) {
    const phone = highValueProducts[0];
    const accessory = accessories[0];

    bundles.push({
      id: 'bundle_1',
      title: 'Phone + Accessories Bundle',
      items: [phone.name, accessory.name],
      originalPrice: phone.costPrice + accessory.costPrice,
      bundlePrice: phone.sellingPrice + accessory.sellingPrice,
      savings: (phone.costPrice - phone.sellingPrice) + (accessory.costPrice - accessory.sellingPrice),
      image: phone.imageUrls?.[0] || '/images/products/default.png',
      products: [phone, accessory],
    });
  }

  if (highValueProducts.length >= 1) {
    const phone = highValueProducts[0];

    bundles.push({
      id: 'bundle_2',
      title: 'Complete Mobile Setup',
      items: [phone.name, 'Wireless Earbuds', 'Screen Protector', 'Power Bank'],
      originalPrice: phone.costPrice + 15000, // Estimated accessories cost
      bundlePrice: phone.sellingPrice + 8000, // Bundle price
      savings: Math.max(0, (phone.costPrice + 15000) - (phone.sellingPrice + 8000)), // Ensure non-negative
      image: phone.imageUrls?.[0] || '/images/products/default.png',
      products: [phone],
    });
  }

  return bundles;
}
