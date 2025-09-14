import React from "react";
import Title from "./Title";
import Image from "next/image";
// import Link from "next/link";

// Mock data for development
const mockBlogs = [
  {
    _id: "1",
    title: "Latest Smartphone Trends 2024",
    slug: { current: "latest-smartphone-trends-2024" },
    mainImage: "/images/products/product_1.png",
    publishedAt: "2024-01-15",
    excerpt: "Discover the latest innovations in smartphone technology..."
  },
  {
    _id: "2",
    title: "Best Budget Phones Under ₹20,000",
    slug: { current: "best-budget-phones-under-20000" },
    mainImage: "/images/products/product_2.jpg",
    publishedAt: "2024-01-10",
    excerpt: "Find the perfect smartphone that fits your budget..."
  },
  {
    _id: "3",
    title: "5G Technology: What You Need to Know",
    slug: { current: "5g-technology-guide" },
    mainImage: "/images/products/product_3.png",
    publishedAt: "2024-01-05",
    excerpt: "Everything about 5G networks and compatible devices..."
  }
];

const LatestBlog = () => {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Latest Blog Posts</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockBlogs.map((blog) => (
          <div key={blog._id} className="bg-shop_light_bg p-4 rounded-lg hover:shadow-md transition-shadow">
            {/* <Link href={`/blog/${blog.slug.current}`}> */}
              <div className="overflow-hidden rounded-lg mb-3">
                <Image
                  src={blog.mainImage}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                <p className="text-xs text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</p>
              </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
