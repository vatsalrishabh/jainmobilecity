import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build query
    const query: Record<string, unknown> = {};

    // Category filter
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Brand filter
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.sellingPrice = {};
      if (minPrice) query.sellingPrice.$gte = parseInt(minPrice);
      if (maxPrice) query.sellingPrice.$lte = parseInt(maxPrice);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortObj: Record<string, 1 | -1> = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    // Get total count for pagination
    const totalCount = await Product.countDocuments(query);

    // Fetch products with pagination
    const products = await Product.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Transform products for consistent response
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: product._id,
      // Calculate discount percentage for display
      discountPercentage: product.costPrice && product.sellingPrice
        ? Math.round(((product.costPrice - product.sellingPrice) / product.costPrice) * 100)
        : 0
    }));

    // Get unique categories and brands for filters
    const categoriesResult = await Product.distinct('category');
    const brandsResult = await Product.distinct('brand');

    // Get price range
    const priceStats = await Product.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$sellingPrice' },
          maxPrice: { $max: '$sellingPrice' }
        }
      }
    ]);

    const priceRange = priceStats.length > 0 ? {
      min: priceStats[0].minPrice || 0,
      max: priceStats[0].maxPrice || 100000
    } : { min: 0, max: 100000 };

    return NextResponse.json({
      products: transformedProducts,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      filters: {
        categories: categoriesResult.filter(Boolean),
        brands: brandsResult.filter(Boolean),
        priceRange
      }
    }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    console.error('Error fetching shop products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
