import React from "react";
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react";
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

interface SafeMapProps {
  height?: string;
  showDirections?: boolean;
  showStoreInfo?: boolean;
  className?: string;
}

export const SafeMap: React.FC<SafeMapProps> = ({
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

      {/* Safe Map Display */}
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
        <div style={{ height }} className="w-full relative">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 max-w-md">
              <div className="w-20 h-20 bg-[#C72C41] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#262729] mb-3">
                Meat Delicacy Store
              </h3>
              <p className="text-[#262729]/70 mb-2 text-lg">
                {STORE_LOCATION.address}
              </p>
              <p className="text-[#262729]/60 text-sm mb-6">
                Premium fresh pork delivery within 5km radius
              </p>

              <div className="space-y-3">
                <Button
                  onClick={openInGoogleMaps}
                  className="w-full bg-[#C72C41] text-white hover:bg-[#C72C41]/90 text-base py-3"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View on Google Maps
                </Button>
                <Button
                  onClick={openDirections}
                  variant="outline"
                  className="w-full border-[#C72C41] text-[#C72C41] hover:bg-[#C72C41]/10 text-base py-3"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-[#C72C41] rounded-full opacity-60"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-[#C72C41] rounded-full opacity-40"></div>
          <div className="absolute bottom-6 left-8 w-4 h-4 bg-[#C72C41] rounded-full opacity-30"></div>
          <div className="absolute bottom-8 right-4 w-2 h-2 bg-[#C72C41] rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};
