import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { default as Purchase } from '@/models/Purchase';

export async function GET() {
  try {
    await connectToDatabase();

    // Get all purchases to calculate real sales data
    const purchases = await Purchase.find({})
      .populate('purchaseItems.productId', 'name imageUrls sellingPrice');

    // Calculate sales data for each product
    const productSales = new Map();

    purchases.forEach(purchase => {
      purchase.purchaseItems.forEach(item => {
        const productId = item.productId.toString();
        const existing = productSales.get(productId) || {
          name: item.productName,
          sales: 0,
          revenue: 0,
          image: item.productId?.imageUrls?.[0] || "/images/products/product_1.png",
          productId: item.productId
        };

        existing.sales += item.quantity;
        existing.revenue += item.totalRevenue;
        productSales.set(productId, existing);
      });
    });

    // Convert to array and sort by sales
    const salesArray = Array.from(productSales.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5); // Get top 5

    // Return real sales data from database
    const topProducts = salesArray.map(product => ({
      name: product.name,
      sales: product.sales,
      revenue: product.revenue,
      rating: Math.floor(Math.random() * 10) / 10 + 4, // Mock rating 4.0-4.9
      image: product.image
    }));

    return NextResponse.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top products' },
      { status: 500 }
    );
  }
}

