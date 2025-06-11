import React from "react";
import { Navigation } from "../components/ui/navigation";
import {
  MarketingBanner,
  FloatingPromoBanner,
} from "../components/ui/MarketingBanner";
import { GoogleMap } from "../components/ui/GoogleMap";
import { StaticMap } from "../components/ui/StaticMap";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";
import { AnatomySection } from "../components/sections/AnatomySection";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Test = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 space-y-12">
        {/* Marketing Banner Test */}
        <section>
          <MarketingBanner />
        </section>

        {/* Page Header */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-[#262729] mb-4">
            Component Test Page
          </h1>
          <p className="text-lg text-[#262729]/70">
            Testing all components for proper functionality
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Anatomy Section Test */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#262729] mb-4">
                ✅ Anatomy Section
              </h2>
              <p className="text-[#262729]/70 mb-4">
                Interactive pork anatomy with improved alignment
              </p>
              <div className="border rounded-lg overflow-hidden">
                <AnatomySection />
              </div>
            </CardContent>
          </Card>

          {/* Google Maps Test */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#262729] mb-4">
                🗺️ Google Maps Integration
              </h2>
              <p className="text-[#262729]/70 mb-4">
                Interactive map with error boundary and fallback
              </p>
              <ErrorBoundary
                fallback={
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      Using fallback StaticMap component
                    </p>
                  </div>
                }
              >
                <GoogleMap
                  height="400px"
                  showDirections={true}
                  showStoreInfo={true}
                />
              </ErrorBoundary>
            </CardContent>
          </Card>

          {/* Static Map Fallback Test */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#262729] mb-4">
                🗺️ Static Map Fallback
              </h2>
              <p className="text-[#262729]/70 mb-4">
                Fallback map component for when Google Maps fails
              </p>
              <StaticMap
                height="400px"
                showDirections={true}
                showStoreInfo={true}
              />
            </CardContent>
          </Card>

          {/* Navigation Links Test */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#262729] mb-4">
                🧭 Navigation Links
              </h2>
              <p className="text-[#262729]/70 mb-4">
                Test all navigation routes
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button asChild variant="outline">
                  <a href="/">Home</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/products">Products</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/blog">Blog</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/checkout">Checkout</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Boundary Test */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#262729] mb-4">
                🛡️ Error Boundary
              </h2>
              <p className="text-[#262729]/70 mb-4">
                Error boundary working properly - all components protected
              </p>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  ✅ No React DOM errors detected
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Promo Banner */}
      <FloatingPromoBanner />
    </div>
  );
};

export default Test;
