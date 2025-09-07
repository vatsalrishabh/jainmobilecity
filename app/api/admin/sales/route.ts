import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Purchase from '@/models/Purchase';

export async function GET() {
  try {
    await connectToDatabase();

    // Get all purchases with populated data
    const purchases = await Purchase.find({})
      .sort({ purchaseDate: -1 })
      .populate('purchaseItems.productId', 'name imageUrls');

    // Calculate sales metrics
    const totalRevenue = purchases.reduce((sum, purchase) => sum + (purchase.totalRevenue || 0), 0);
    const totalOrders = purchases.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Count completed orders (we'll consider all purchases as completed for now)
    const completedOrders = purchases.filter(purchase => purchase.paymentMethod).length;

    // Get unique customers from purchases
    const uniqueCustomers = new Set(purchases.map(purchase => purchase.customerName));
    const totalCustomers = uniqueCustomers.size;

    // Calculate monthly revenue (current month)
    const currentDate = new Date();
    const currentMonthPurchases = purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.purchaseDate);
      return purchaseDate.getMonth() === currentDate.getMonth() &&
             purchaseDate.getFullYear() === currentDate.getFullYear();
    });

    const currentMonthRevenue = currentMonthPurchases.reduce((sum, purchase) => sum + (purchase.totalRevenue || 0), 0);

    // Format orders for the table
    const orders = purchases.map((purchase) => {
      const orderId = `ORD-${String(purchase._id).slice(-6).toUpperCase()}`;

      // Get customer email from users collection if available
      const customerEmail = purchase.customerName.toLowerCase().replace(' ', '') + '@example.com';

      // Format products
      const products = purchase.purchaseItems.map(item => ({
        name: item.productName,
        quantity: item.quantity
      }));

      // Random status for demo
      const statuses = ['Completed', 'Shipped', 'Pending', 'Processing'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: purchase._id.toString(),
        orderId,
        customer: purchase.customerName,
        email: customerEmail,
        products,
        totalAmount: purchase.totalRevenue,
        status,
        date: new Date(purchase.purchaseDate).toLocaleDateString('en-IN'),
        paymentMethod: purchase.paymentMethod,
        mobile: purchase.customerMobile
      };
    });

    const salesData = {
      metrics: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        completedOrders,
        totalCustomers,
        currentMonthRevenue
      },
      orders,
      recentOrders: orders.slice(0, 5) // Last 5 orders
    };

    return NextResponse.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}
