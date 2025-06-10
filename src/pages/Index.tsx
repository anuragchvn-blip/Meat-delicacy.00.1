import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  Calendar,
  User,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark-secondary to-gray-900"></div>
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-10'
          }
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Premium
                <span className="text-brand-cream block">Meat Delicacy</span>
                Experience
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover the finest selection of premium meats, carefully
                sourced and expertly prepared. From grass-fed beef to free-range
                poultry, every cut tells a story of quality and tradition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-brand-cream text-brand-dark font-bold hover:bg-brand-cream-dark hover:scale-105 transition-all duration-300 px-8"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-dark font-bold px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&q=80"
                  alt="Premium meat selection"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-brand-cream text-brand-dark p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">4.9/5</span>
                  </div>
                  <p className="text-sm">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Meat Delicacy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering the highest quality meats with
              unmatched service and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Premium Quality
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every cut is carefully selected and inspected to ensure the
                  highest standards of quality and freshness.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Fast Delivery
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Temperature-controlled delivery ensures your meat arrives
                  fresh and ready to cook.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Expert Butchers
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our skilled butchers have decades of experience in preparing
                  and cutting premium meats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular premium meat selections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Wagyu Ribeye Steak",
                price: "$89.99",
                image:
                  "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop&q=80",
                badge: "Premium",
              },
              {
                name: "Grass-Fed Beef Tenderloin",
                price: "$65.99",
                image:
                  "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=300&fit=crop&q=80",
                badge: "Best Seller",
              },
              {
                name: "Free-Range Chicken Breast",
                price: "$24.99",
                image:
                  "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop&q=80",
                badge: "Organic",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-brand-cream text-brand-dark">
                    {product.badge}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-dark">
                      {product.price}
                    </span>
                    <Button className="bg-brand-dark text-white hover:bg-brand-dark-secondary">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-brand-dark text-white hover:bg-brand-dark-secondary px-8"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              From Our Kitchen
            </h2>
            <p className="text-xl text-gray-600">
              Expert tips, recipes, and insights from our culinary team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Perfect Ribeye: A Complete Guide",
                excerpt:
                  "Learn the secrets to cooking the perfect ribeye steak, from selecting the right cut to achieving that perfect sear.",
                image:
                  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop&q=80",
                author: "Chef Marcus",
                date: "December 15, 2024",
                readTime: "8 min read",
              },
              {
                title: "Understanding Meat Grades and Quality",
                excerpt:
                  "Discover what makes premium meat premium, and how to identify quality cuts that will elevate your cooking.",
                image:
                  "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=250&fit=crop&q=80",
                author: "Sarah Thompson",
                date: "December 12, 2024",
                readTime: "6 min read",
              },
              {
                title: "Sustainable Farming: Our Commitment",
                excerpt:
                  "Learn about our partnerships with local farms and our commitment to sustainable, ethical meat production.",
                image:
                  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=250&fit=crop&q=80",
                author: "John Davis",
                date: "December 10, 2024",
                readTime: "5 min read",
              },
            ].map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-dark transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                    <Button
                      variant="ghost"
                      className="text-brand-dark hover:text-brand-dark-secondary p-0"
                    >
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-8"
            >
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the latest recipes, cooking tips, and exclusive offers delivered
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-cream"
            />
            <Button className="bg-brand-cream text-brand-dark font-bold hover:bg-brand-cream-dark px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc.svg"
                alt="Meat Delicacy logo"
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-300">
                Premium quality meats delivered fresh to your door. Experience
                the difference with Meat Delicacy.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    Our Products
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-gray-300 hover:text-brand-cream transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <p>1-800-MEAT-123</p>
                <p>info@meatdelicacy.com</p>
                <p>Mon-Fri: 8AM-6PM PST</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Meat Delicacy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
