import React, { useState, useEffect } from "react";
import { X, Clock, MapPin, Phone, Truck, Star, Gift } from "lucide-react";
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
      type: "promo",
      title: "🎉 Grand Opening Special!",
      message: "Get 20% OFF on your first order. Free delivery within 5km!",
      cta: "Order Now",
      color: "bg-gradient-to-r from-[#C72C41] to-[#E73C56]",
      icon: Gift,
    },
    {
      type: "delivery",
      title: "⚡ Super Fast Delivery",
      message:
        "Fresh pork delivered in 45-90 minutes within Hommadevanahalli area",
      cta: "Check Area",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      icon: Truck,
    },
    {
      type: "quality",
      title: "⭐ Premium Quality Assured",
      message:
        "100% fresh, antibiotic-free pork. Quality guaranteed or money back!",
      cta: "Learn More",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      icon: Star,
    },
    {
      type: "offer",
      title: "🔥 Weekend Special",
      message: "Buy 2kg+ and get FREE bacon strips worth ₹200!",
      cta: "Shop Now",
      color: "bg-gradient-to-r from-orange-600 to-red-600",
      icon: Gift,
    },
  ];

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    if (banners.length > 1 && isVisible) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length, isVisible]);

  const currentBannerData = banners[currentBanner];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-500",
        currentBannerData.color,
        className,
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
              <currentBannerData.icon className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                {currentBannerData.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                {currentBannerData.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-gray-900 hover:bg-white/90 font-semibold"
            >
              {currentBannerData.cta}
            </Button>

            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Dismiss banner"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Banner Indicators */}
        {banners.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentBanner
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70",
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

// Floating promotion banner for bottom-right corner
export const FloatingPromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show banner after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

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
          className="bg-[#C72C41] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Gift className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl border-2 border-[#C72C41] max-w-sm overflow-hidden">
          <div className="bg-[#C72C41] text-white p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm">🎉 Special Offer!</h4>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <span className="text-sm">−</span>
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-[#262729] text-sm mb-3">
              <strong>First Order 20% OFF</strong> + FREE delivery within 5km!
            </p>
            <div className="flex items-center gap-2 text-xs text-[#262729]/70 mb-3">
              <Clock className="w-3 h-3" />
              <span>Limited time offer</span>
            </div>
            <Button
              size="sm"
              className="w-full bg-[#C72C41] text-white hover:bg-[#C72C41]/90"
            >
              Claim Offer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Delivery zone banner
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
        "border-l-4 p-4 rounded-r-lg",
        isInZone
          ? "bg-green-50 border-green-500 text-green-800"
          : "bg-orange-50 border-orange-500 text-orange-800",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-full",
            isInZone ? "bg-green-100" : "bg-orange-100",
          )}
        >
          {isInZone ? (
            <Truck className="w-5 h-5 text-green-600" />
          ) : (
            <MapPin className="w-5 h-5 text-orange-600" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-sm">
            {isInZone ? "✅ Delivery Available!" : "⚠️ Outside Delivery Zone"}
          </h4>
          <p className="text-xs mt-1">
            {isInZone
              ? `Great news! You're ${distance?.toFixed(1)}km from our store. Delivery in 45-90 mins.`
              : `You're ${distance?.toFixed(1)}km away. We deliver within 5km of Hommadevanahalli.`}
          </p>
        </div>
      </div>
    </div>
  );
};
