import React from "react";
import { Navigation } from "../components/ui/navigation";
import {
  MarketingBanner,
  FloatingPromoBanner,
} from "../components/ui/MarketingBanner";
import { GoogleMapsSection } from "../components/sections/GoogleMapsSection";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle, ArrowDown, MapPin, Star } from "lucide-react";

const Test = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 space-y-12">
        {/* New Professional Marketing Banner */}
        <section>
          <MarketingBanner />
        </section>

        {/* Page Header */}
        <section className="text-center py-12 bg-gradient-to-r from-[#262729] to-[#3a3a3c] text-white">
          <h1 className="text-4xl font-bold mb-4">✅ Layout Restructured</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Professional marketing banners, enhanced user experience, and Google
            Maps positioned at the end for optimal flow
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {/* Layout Structure */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-[#262729] mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                New Layout Structure
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#262729] mb-4">
                    ✅ Before (Fixed)
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <span className="font-semibold text-red-800">
                        ❌ DOM Manipulation Errors
                      </span>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <span className="font-semibold text-orange-800">
                        ⚠️ Maps in Middle (Poor Flow)
                      </span>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <span className="font-semibold text-yellow-800">
                        📱 Basic Banners
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#262729] mb-4">
                    🚀 After (Improved)
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="font-semibold text-green-800">
                        ✅ Error-Free with Boundaries
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="font-semibold text-blue-800">
                        🗺️ Maps at End (Perfect Flow)
                      </span>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <span className="font-semibold text-purple-800">
                        🎯 Professional Marketing
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  🎉 Key Improvements Made:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">
                      Professional rotating banners with features & CTAs
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">
                      Enhanced Google Maps section with better design
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">
                      Error boundaries prevent DOM conflicts
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-700">
                      Maps positioned at end for better user flow
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page Flow Visualization */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-[#262729] mb-6">
                📱 New Page Flow
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#C72C41] to-[#E73C56] text-white rounded-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold">Professional Marketing Banner</h4>
                    <p className="text-white/90 text-sm">
                      Rotating offers, easy reading, clear CTAs
                    </p>
                  </div>
                </div>

                <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#262729] to-[#3a3a3c] text-white rounded-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold">Hero Section & Order Form</h4>
                    <p className="text-white/90 text-sm">
                      Main content, product selection, order placement
                    </p>
                  </div>
                </div>

                <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold">Products & Features</h4>
                    <p className="text-white/90 text-sm">
                      Interactive anatomy, bestsellers, testimonials, blog
                    </p>
                  </div>
                </div>

                <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold">
                      Google Maps & Store Information
                    </h4>
                    <p className="text-white/90 text-sm">
                      Location details, directions, contact info - perfect
                      ending
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Marketing Banner Features */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-[#262729] mb-6 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                Marketing Banner Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-bold text-purple-800 mb-2">
                    Professional Design
                  </h4>
                  <p className="text-purple-600 text-sm">
                    Clean, modern layout with gradients and professional styling
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📖</span>
                  </div>
                  <h4 className="font-bold text-green-800 mb-2">
                    Easy Reading
                  </h4>
                  <p className="text-green-600 text-sm">
                    Clear typography, proper contrast, readable font sizes
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-bold text-blue-800 mb-2">
                    Marketing Friendly
                  </h4>
                  <p className="text-blue-600 text-sm">
                    Clear CTAs, promo codes, feature highlights, conversion
                    focused
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h4 className="font-bold text-orange-800 mb-2">
                    Auto-Rotating
                  </h4>
                  <p className="text-orange-600 text-sm">
                    Multiple offers rotate every 6 seconds, keeps content fresh
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Test */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-[#262729] mb-6">
                🧭 Test Navigation
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button asChild variant="outline" className="h-12">
                  <a href="/">🏠 Home</a>
                </Button>
                <Button asChild variant="outline" className="h-12">
                  <a href="/products">🛒 Products</a>
                </Button>
                <Button asChild variant="outline" className="h-12">
                  <a href="/blog">📝 Blog</a>
                </Button>
                <Button
                  asChild
                  className="h-12 bg-gradient-to-r from-[#C72C41] to-[#E73C56] text-white hover:opacity-90"
                >
                  <a href="/">✨ Live Site</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Google Maps Section Demo */}
        <GoogleMapsSection />
      </div>

      {/* Enhanced Floating Promo Banner */}
      <FloatingPromoBanner />
    </div>
  );
};

export default Test;
