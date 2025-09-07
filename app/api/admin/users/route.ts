import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    // Get all users
    const users = await User.find({})
      .sort({ createdAt: -1 });

    // Calculate user metrics
    const totalUsers = users.length;
    const oauthUsers = users.filter(user => user.oauthProvider !== 'local').length;
    const localUsers = users.filter(user => user.oauthProvider === 'local').length;

    // Calculate new users this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newUsersThisWeek = users.filter(user => new Date(user.createdAt) >= oneWeekAgo).length;

    // Format users for the table
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      provider: user.oauthProvider,
      mobile: user.mobile,
      address: user.address || 'Not provided',
      joinDate: new Date(user.createdAt).toLocaleDateString('en-IN'),
      isOAuth: user.oauthProvider !== 'local',
      providerBadge: getProviderBadge(user.oauthProvider)
    }));

    const userData = {
      metrics: {
        totalUsers,
        oauthUsers,
        localUsers,
        newUsersThisWeek
      },
      users: formattedUsers
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

function getProviderBadge(provider: string) {
  switch (provider.toLowerCase()) {
    case 'google':
      return '🔴'; // Red circle for Google
    case 'facebook':
      return '🔵'; // Blue circle for Facebook
    case 'github':
      return '⚫'; // Black circle for Github
    case 'local':
      return '🟢'; // Green circle for Local
    default:
      return '⚪'; // White circle for others
  }
}
