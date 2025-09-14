import React from "react";
import Container from "@/components/Container";

const AboutUs = () => {
  return (
    <Container className="bg-shop-light-pink">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Jain Mobile City
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Your Trusted Mobile Technology Partner in Raebareli
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">🏪 Raebareli, Uttar Pradesh</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">📱 Mobile Technology Experts</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="font-semibold">👥 Serving Community Since Years</p>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Introduction */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Meet Our Founder
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                With a vision to revolutionize mobile technology accessibility in Raebareli,
                our founder established Jain Mobile City as a beacon of innovation and trust
                in the heart of Uttar Pradesh.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Driven by a deep understanding of the local community&apos;s needs and a passion
                for cutting-edge technology, our founder has built Jain Mobile City into
                the most trusted destination for mobile devices in Raebareli.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <p className="text-gray-800 font-semibold italic">
                  &ldquo;Our commitment is not just to sell mobile devices, but to empower
                  every individual in Raebareli with the best technology solutions
                  that enhance their daily lives.&rdquo;
                </p>
                <p className="text-blue-600 font-semibold mt-3">
                  - Founder, Jain Mobile City
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl text-white">👨‍💼</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Visionary Leadership
                  </h3>
                  <p className="text-gray-600">
                    Guiding Jain Mobile City with innovation and community focus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raebareli Connection */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Proudly Serving Raebareli
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deeply rooted in the heart of Uttar Pradesh, we understand the unique needs
              and aspirations of our Raebareli community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Local Heritage
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Raebareli&apos;s rich cultural heritage and historical significance inspire
                our commitment to serve this vibrant community with excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Community Growth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                As Raebareli grows as an educational and commercial hub, we grow
                alongside, providing the latest technology solutions to support
                community development.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Local Partnerships
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Strong partnerships with local businesses and institutions help us
                better understand and serve the diverse needs of Raebareli residents.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Meet Our Dedicated Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our skilled professionals are the backbone of Jain Mobile City,
              bringing expertise, passion, and dedication to serve you better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">👨‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Technical Experts
              </h3>
              <p className="text-gray-600 mb-4">
                Certified technicians with years of experience in mobile repair
                and maintenance services.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Mobile Repair
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Software Support
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Sales Specialists
              </h3>
              <p className="text-gray-600 mb-4">
                Knowledgeable sales professionals who understand your needs and
                guide you to the perfect device.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Product Knowledge
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Customer Service
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Customer Care Team
              </h3>
              <p className="text-gray-600 mb-4">
                Dedicated support staff ensuring your satisfaction from purchase
                to post-sales service.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  After Sales
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Brand Values
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              The principles that guide every interaction and decision at Jain Mobile City
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Integrity</h3>
              <p className="opacity-90 leading-relaxed">
                Building lasting relationships through honest practices and genuine care
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="opacity-90 leading-relaxed">
                Staying ahead with the latest technology and solutions for our customers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Focus</h3>
              <p className="opacity-90 leading-relaxed">
                Deeply committed to serving and contributing to Raebareli&apos;s growth
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Excellence</h3>
              <p className="opacity-90 leading-relaxed">
                Delivering only the best products and services to our valued customers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Milestones */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Journey & Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Milestones that mark our growth and commitment to excellence in Raebareli
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">5000+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Happy Customers</h3>
              <p className="text-gray-600">Satisfied customers across Raebareli and surrounding areas</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">10K+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Devices Sold</h3>
              <p className="text-gray-600">Mobile devices delivered to homes and businesses</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">50K+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Repairs Done</h3>
              <p className="text-gray-600">Mobile devices repaired and restored to perfect condition</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white font-bold">15+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Years of Service</h3>
              <p className="text-gray-600">Years of dedicated service to the Raebareli community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Future Vision */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Vision for Tomorrow
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Jain Mobile City continues to evolve with technology and our community,
            committed to being Raebareli&apos;s premier destination for mobile innovation.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-white">📱</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Latest Technology</h3>
                <p className="text-gray-600 text-sm">Always bringing the newest innovations to Raebareli</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-white">🌱</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Community Growth</h3>
                <p className="text-gray-600 text-sm">Growing alongside our beloved Raebareli community</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-white">⭐</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Maintaining the highest standards of service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-shop_dark_green to-green-600 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Family
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Experience the Jain Mobile City difference in Raebareli, Uttar Pradesh
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏪</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="opacity-90">Raebareli, Uttar Pradesh</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📞</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="opacity-90">Contact for personalized service</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Chat With Us</h3>
                <p className="opacity-90">Expert guidance available</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg font-semibold">
              Your trusted mobile technology partner in Raebareli! 🌟
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
