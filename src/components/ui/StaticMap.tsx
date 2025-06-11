import React from "react";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

// Store coordinates for Hommadevanahalli, Bangalore
const STORE_LOCATION = {
  lat: 12.9698,
  lng: 77.6275,
  address: "Hommadevanahalli, Bangalore, Karnataka 560048",
  phone: "+91 98765 43210",
  hours: "9:00 AM - 9:00 PM",
};

interface StaticMapProps {
  height?: string;
  showDirections?: boolean;
  showStoreInfo?: boolean;
  className?: string;
}

export const StaticMap: React.FC<StaticMapProps> = ({
  height = "400px",
  showDirections = true,
  showStoreInfo = true,
  className = "",
}) => {
  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${STORE_LOCATION.lat},${STORE_LOCATION.lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`;
    window.open(url, "_blank");
  };

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${STORE_LOCATION.lat},${STORE_LOCATION.lng}&zoom=15&size=600x400&markers=color:red%7C${STORE_LOCATION.lat},${STORE_LOCATION.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"}`;

  return (
    <div className={`w-full ${className}`}>
      {showStoreInfo && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#262729] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C72C41]" />
                  Visit Our Store
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C72C41] mt-1 flex-shrink-0" />
                    <p className="text-[#262729]/70 text-sm">
                      {STORE_LOCATION.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C72C41] flex-shrink-0" />
                    <p className="text-[#262729]/70 text-sm">
                      {STORE_LOCATION.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C72C41] flex-shrink-0" />
                    <p className="text-[#262729]/70 text-sm">
                      {STORE_LOCATION.hours}
                    </p>
                  </div>
                </div>
              </div>

              {showDirections && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-[#262729] mb-2">
                    Get Directions
                  </h4>
                  <Button
                    onClick={openDirections}
                    className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90 w-full"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    onClick={openInGoogleMaps}
                    variant="outline"
                    className="w-full"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Static Map Container */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <div style={{ height }} className="w-full bg-gray-200 relative">
          {import.meta.env.VITE_GOOGLE_MAPS_API_KEY &&
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== "YOUR_API_KEY" ? (
            <img
              src={staticMapUrl}
              alt="Store location map"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}

          {/* Fallback when no API key or image fails */}
          <div
            className={`flex items-center justify-center h-full ${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY &&
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== "YOUR_API_KEY"
                ? "hidden"
                : ""
            }`}
          >
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 text-[#C72C41] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#262729] mb-2">
                Meat Delicacy
              </h3>
              <p className="text-[#262729]/70 mb-2">{STORE_LOCATION.address}</p>
              <p className="text-[#262729]/60 text-sm mb-4">
                Click the button below to view our location on Google Maps
              </p>
              <Button
                onClick={openInGoogleMaps}
                className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View on Google Maps
              </Button>
            </div>
          </div>

          {/* Overlay with directions button */}
          <div className="absolute bottom-4 right-4">
            <Button
              onClick={openDirections}
              size="sm"
              className="bg-white text-[#262729] shadow-lg hover:bg-gray-50 border"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
