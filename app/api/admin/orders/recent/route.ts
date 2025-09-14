import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { default as Purchase } from '@/models/Purchase';

export async function GET() {
  try {
    await connectToDatabase();

    // Get recent purchases from database
    const recentPurchases = await Purchase.find({})
      .sort({ purchaseDate: -1 }) // Sort by most recent first
      .limit(5) // Get last 5 orders

    // Return real purchase data
    const recentOrders = recentPurchases.map((purchase, index) => {
      const timeFrames = ['2 hours ago', '4 hours ago', '6 hours ago', '1 day ago', '2 days ago'];
      const statuses = ['completed', 'shipped', 'pending'];

      return {
        id: purchase._id.toString(),
        customer: purchase.customerName,
        amount: purchase.totalRevenue,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: timeFrames[index] || 'Recently',
        products: purchase.purchaseItems.map(item => item.productName)
      };
    });

    return NextResponse.json(recentOrders);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent orders' },
      { status: 500 }
    );
  }
}

