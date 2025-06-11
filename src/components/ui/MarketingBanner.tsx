import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  MapPin,
  Phone,
  Truck,
  Star,
  Gift,
  Check,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "../../lib/utils";

interface MarketingBannerProps {
  type?: "promo" | "delivery" | "announcement" | "offer";
  dismissible?: boolean;
  className?: string;
}

export const MarketingBanner: React.FC<MarketingBannerProps> = ({
  type = "promo",
  dismissible = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      type: "grand-opening",
      title: "🎉 Grand Opening Special",
      subtitle: "Welcome to Meat Delicacy",
      message:
        "Get 20% OFF on your first order + FREE delivery within 5km radius!",
      cta: "Order Now & Save",
      code: "WELCOME20",
      color: "bg-gradient-to-r from-[#C72C41] via-[#E73C56] to-[#C72C41]",
      icon: Gift,
      features: ["20% Discount", "Free Delivery", "Premium Quality"],
    },
    {
      type: "delivery",
      title: "⚡ Lightning Fast Delivery",
      subtitle: "Fresh to Your Door",
      message:
        "Premium pork delivered in just 45-90 minutes within Hommadevanahalli area",
      cta: "Check Delivery Area",
      code: "FASTMEAT",
      color: "bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600",
      icon: Truck,
      features: ["45-90 Min Delivery", "5km Radius", "Always Fresh"],
    },
    {
      type: "quality",
      title: "⭐ Premium Quality Guarantee",
      subtitle: "100% Satisfaction Promise",
      message:
        "Antibiotic-free, farm-fresh pork with quality guarantee or money back!",
      cta: "View Quality Standards",
      code: "PREMIUM",
      color: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600",
      icon: Star,
      features: ["Quality Assured", "Antibiotic-Free", "Money Back"],
    },
    {
      type: "weekend-special",
      title: "🔥 Weekend Mega Deal",
      subtitle: "Limited Time Offer",
      message: "Order 2kg+ and get FREE premium bacon strips worth ₹200!",
      cta: "Shop Weekend Deal",
      code: "WEEKEND200",
      color: "bg-gradient-to-r from-orange-600 via-red-600 to-orange-600",
      icon: Gift,
      features: ["Free Bacon", "2kg+ Orders", "₹200 Value"],
    },
  ];

  // Auto-rotate banners every 6 seconds
  useEffect(() => {
    if (banners.length > 1 && isVisible) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [banners.length, isVisible]);

  const currentBannerData = banners[currentBanner];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-700 ease-in-out",
        currentBannerData.color,
        className,
      )}
    >
      {/* Professional Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            {/* Icon Section */}
            <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <currentBannerData.icon className="w-8 h-8 text-white" />
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white font-bold text-xl sm:text-2xl">
                  {currentBannerData.title}
                </h3>
                {currentBannerData.code && (
                  <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold px-3 py-1">
                    CODE: {currentBannerData.code}
                  </Badge>
                )}
              </div>

              <p className="text-white/90 text-sm font-medium mb-1">
                {currentBannerData.subtitle}
              </p>

              <p className="text-white text-base sm:text-lg leading-relaxed mb-4 pr-4">
                {currentBannerData.message}
              </p>

              {/* Features List */}
              <div className="hidden sm:flex items-center gap-4">
                {currentBannerData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-white/90 text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-base px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {currentBannerData.cta}
            </Button>

            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Dismiss banner"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Banner Indicators */}
        {banners.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 hover:bg-white/80",
                  index === currentBanner
                    ? "bg-white w-8"
                    : "bg-white/50 w-2 hover:w-4",
                )}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced floating promotion banner
export const FloatingPromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show banner after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-[#C72C41] to-[#E73C56] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <Gift className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-sm overflow-hidden transform hover:scale-105 transition-transform duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C72C41] to-[#E73C56] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">🎉 Special Offer!</h4>
                  <p className="text-white/90 text-sm">Limited Time Deal</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                >
                  <span className="text-lg">−</span>
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#C72C41] mb-2">
                20% OFF
              </div>
              <p className="text-[#262729] font-semibold mb-1">
                First Order Discount
              </p>
              <p className="text-[#262729]/70 text-sm">
                + FREE delivery within 5km!
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#262729]/70">Promo Code:</span>
                <span className="font-bold text-[#C72C41] bg-white px-2 py-1 rounded border-2 border-dashed border-[#C72C41]">
                  WELCOME20
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#262729]/70 mb-4">
              <Clock className="w-4 h-4 text-[#C72C41]" />
              <span>Valid for next 24 hours only</span>
            </div>

            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-[#C72C41] to-[#E73C56] text-white hover:opacity-90 font-bold py-3 text-base"
            >
              Claim Your Discount
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced delivery zone banner with better design
export const DeliveryZoneBanner: React.FC<{
  userLocation?: { lat: number; lng: number };
}> = ({ userLocation }) => {
  const [isInZone, setIsInZone] = useState<boolean | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (userLocation) {
      // Calculate distance from Hommadevanahalli (12.9698, 77.6275)
      const storeLocation = { lat: 12.9698, lng: 77.6275 };
      const dist = calculateDistance(userLocation, storeLocation);
      setDistance(dist);
      setIsInZone(dist <= 5); // 5km radius
    }
  }, [userLocation]);

  const calculateDistance = (
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number },
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLon = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (isInZone === null) return null;

  return (
    <div
      className={cn(
        "rounded-xl p-6 border-l-4 shadow-lg",
        isInZone
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-800"
          : "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-500 text-orange-800",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-3 rounded-full flex-shrink-0",
            isInZone ? "bg-green-100" : "bg-orange-100",
          )}
        >
          {isInZone ? (
            <Truck className="w-6 h-6 text-green-600" />
          ) : (
            <MapPin className="w-6 h-6 text-orange-600" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2">
            {isInZone ? "✅ Delivery Available!" : "⚠️ Outside Delivery Zone"}
          </h4>
          <p className="text-base leading-relaxed">
            {isInZone
              ? `Excellent! You're ${distance?.toFixed(1)}km from our store. We can deliver fresh pork to your location in 45-90 minutes.`
              : `You're ${distance?.toFixed(1)}km away from our store. Currently, we deliver within a 5km radius from Hommadevanahalli. Please visit our store or contact us for special arrangements.`}
          </p>
          {!isInZone && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=12.9698,77.6275&travelmode=driving",
                    "_blank",
                  )
                }
              >
                <MapPin className="w-4 h-4 mr-2" />
                Visit Our Store
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
