# Jain Mobile City - Admin Dashboard Setup

## Overview
This is a beautiful, modern admin dashboard for managing an e-commerce mobile phone store. The dashboard has been updated to work without Sanity CMS dependencies and uses mock data for demonstration purposes.

## Features

### 🎯 **Dashboard Overview**
- **Statistics Cards**: Total Revenue, Orders, Customers, Products
- **Quick Actions**: Add Product, View Reports, Export Data, Refresh
- **Recent Orders**: Live order tracking with status indicators
- **Top Products**: Best-selling products with ratings and sales data

### 📱 **Product Management**
- **CRUD Operations**: Create, Read, Update, Delete products
- **Advanced Filtering**: Search by name, brand, category, price
- **Sorting Options**: Sort by name, brand, price, stock, date
- **Product Details**: Full specifications, pricing, stock management
- **Image Management**: Product image uploads and management

### 💰 **Sales Dashboard**
- **Revenue Analytics**: Total revenue, order values, growth metrics
- **Order Management**: Track order status (pending, shipped, completed, cancelled)
- **Customer Insights**: Order history, delivery tracking
- **Export Functionality**: Download sales data as CSV

### 👥 **User Management**
- **Customer Profiles**: View and edit customer information
- **Authentication Types**: OAuth (Google, Facebook, GitHub) and Local accounts
- **User Analytics**: Registration trends, active users, provider distribution
- **Bulk Operations**: Export user data, bulk actions

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material-UI Components**: Professional, accessible interface
- **Dark/Light Themes**: Customizable color schemes
- **Interactive Elements**: Hover effects, animations, smooth transitions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Admin Dashboard
Navigate to: `http://localhost:3000/admin`

## Admin Navigation

### Desktop Sidebar
- **Dashboard**: Overview and analytics
- **Products**: Product catalog management
- **Sales**: Order and revenue tracking
- **Users**: Customer management
- **Analytics**: Reports and insights
- **Settings**: System configuration

### Mobile Bottom Navigation
- Optimized for mobile devices
- Quick access to main features
- Touch-friendly interface

## Data Structure

### Product Model
```typescript
interface Product {
  _id: string;
  name: string;
  brand: string;
  modelNumber?: string;
  description?: string;
  specifications: {
    ram?: string;
    storage?: string;
    processor?: string;
    battery?: string;
    display?: string;
    camera?: string;
    os?: string;
  };
  costPrice: number;
  sellingPrice: number;
  stock: number;
  imageUrls?: string[];
  createdAt: string;
}
```

### User Model
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  oauthProvider: 'google' | 'facebook' | 'github' | 'local';
  mobile: string;
  address?: string;
  createdAt: Date;
}
```

### Order Model
```typescript
interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'completed' | 'pending' | 'cancelled' | 'shipped';
  paymentMethod: string;
  orderDate: Date;
  deliveryAddress: string;
}
```

## Customization

### Colors and Themes
The dashboard uses a consistent color scheme:
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Purple (#8B5CF6)

### Adding New Features
1. Create new components in `components/admin/`
2. Add navigation items in `SideNavbar.tsx` and `BottomNavbar.tsx`
3. Update `AdminDashBoard.tsx` with new component mappings
4. Follow the existing design patterns and Material-UI components

## Future Enhancements

### Planned Features
- **Real-time Analytics**: Live charts and metrics
- **Inventory Alerts**: Low stock notifications
- **Customer Segmentation**: Advanced user analytics
- **Multi-language Support**: Internationalization
- **Advanced Reporting**: Custom report builder
- **API Integration**: Connect with external services

### Database Integration
When ready to move from mock data:
1. Set up MongoDB with Mongoose
2. Create API routes in `app/api/`
3. Replace mock data with database queries
4. Add authentication and authorization

## Troubleshooting

### Common Issues
1. **Port Already in Use**: Change port in `package.json` scripts
2. **Build Errors**: Clear `.next` folder and restart
3. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Performance Tips
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize images and use proper formats
- Enable code splitting for better loading

## Support

For questions or issues:
1. Check the console for error messages
2. Review the component structure
3. Ensure all dependencies are installed
4. Verify TypeScript types are correct

---

**Built with ❤️ using Next.js 15, Material-UI, and Tailwind CSS**
