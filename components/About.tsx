import React from "react";
import Title from "./Title";

const About = () => {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">About Jain Mobile City - Raebareli, Uttar Pradesh</Title>

      <div className="mt-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Jain Mobile City</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted mobile phone destination in the heart of Raebareli, Uttar Pradesh.
            Established with a vision to provide quality mobile devices and exceptional service to our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Raebareli */}
          <div className="space-y-6">
            <div className="bg-shop_light_bg p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">About Raebareli</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Raebareli, located in the heart of Uttar Pradesh, is a historic city known for its rich cultural heritage
                and vibrant community. As one of the prominent cities in the state, Raebareli serves as an important
                commercial and educational hub, connecting various parts of Uttar Pradesh.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Our store is proud to be part of this growing community, serving the diverse needs of Raebareli&apos;s
                residents with the latest mobile technology and personalized customer service.
              </p>
            </div>

            {/* Location Info */}
            <div className="bg-shop_light_bg p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🏪</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Our Location</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <p><strong>Address:</strong> Raebareli, Uttar Pradesh</p>
                <p><strong>Business Hours:</strong> 10:00 AM - 9:00 PM (Daily)</p>
                <p><strong>Phone:</strong> Contact us for personalized assistance</p>
                <p><strong>Service Area:</strong> Raebareli and surrounding areas</p>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <div className="bg-shop_light_bg p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Our Services</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Latest Mobile Phones</h4>
                    <p className="text-sm text-gray-600">All major brands available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Technical Support</h4>
                    <p className="text-sm text-gray-600">Expert repair services</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl">💳</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Easy Financing</h4>
                    <p className="text-sm text-gray-600">Flexible payment options</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Home Delivery</h4>
                    <p className="text-sm text-gray-600">Convenient doorstep delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-shop_light_bg p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Why Choose Jain Mobile City?</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Authentic products with warranty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Competitive pricing and special offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Expert guidance and technical advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>After-sales support and maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Trusted by Raebareli community for over years</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision & Mission</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h4>
              <p className="text-gray-600 leading-relaxed">
                To be the leading mobile technology provider in Raebareli, Uttar Pradesh,
                empowering our community with the latest innovations and exceptional service excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h4>
              <p className="text-gray-600 leading-relaxed">
                To provide authentic, high-quality mobile devices and accessories while delivering
                unparalleled customer service and building lasting relationships with our valued customers.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-shop_dark_green text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Visit Jain Mobile City Today!</h3>
          <p className="text-lg mb-6 opacity-90">
            Experience the best in mobile technology right here in Raebareli, Uttar Pradesh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">📍 Raebareli, Uttar Pradesh</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">🕐 10:00 AM - 9:00 PM Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
