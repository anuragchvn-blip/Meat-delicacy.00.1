import React, { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
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

interface GoogleMapProps {
  height?: string;
  showDirections?: boolean;
  showStoreInfo?: boolean;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  height = "400px",
  showDirections = true,
  showStoreInfo = true,
  className = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    try {
      // Clear markers
      markersRef.current.forEach((marker) => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];

      // Clear map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    } catch (error) {
      console.warn("Map cleanup error:", error);
    }
  }, []);

  // Initialize map function
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || mapInstanceRef.current) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: STORE_LOCATION,
        zoom: 15,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // Store marker
      const storeMarker = new window.google.maps.Marker({
        position: STORE_LOCATION,
        map: map,
        title: "Meat Delicacy - Premium Pork Store",
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#C72C41" stroke="white" stroke-width="4"/>
              <circle cx="20" cy="20" r="8" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        },
      });

      markersRef.current.push(storeMarker);

      // Store info window
      const storeInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #262729; font-size: 16px; font-weight: bold;">
              Meat Delicacy
            </h3>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">
              Premium Fresh Pork Delivery
            </p>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 12px;">
              ${STORE_LOCATION.address}
            </p>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">
              📞 ${STORE_LOCATION.phone}
            </p>
            <p style="margin: 0; color: #666; font-size: 12px;">
              🕒 ${STORE_LOCATION.hours}
            </p>
          </div>
        `,
      });

      storeMarker.addListener("click", () => {
        storeInfoWindow.open(map, storeMarker);
      });

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userPos);

            // User marker
            const userMarker = new window.google.maps.Marker({
              position: userPos,
              map: map,
              title: "Your Location",
              icon: {
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#4285F4" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12),
              },
            });

            markersRef.current.push(userMarker);

            // Adjust map bounds to show both markers
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(STORE_LOCATION);
            bounds.extend(userPos);
            map.fitBounds(bounds);
          },
          (error) => {
            console.warn("Geolocation error:", error);
          },
        );
      }

      setMapLoaded(true);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Failed to load map");
    }
  }, []);

  // Load Google Maps script
  const loadGoogleMaps = useCallback(() => {
    try {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script is already loading
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]',
      );
      if (existingScript) {
        existingScript.addEventListener("load", initializeMap);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setMapError("Failed to load Google Maps");
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error loading Google Maps:", error);
      setMapError("Failed to load Google Maps");
    }
  }, [initializeMap]);

  useEffect(() => {
    loadGoogleMaps();

    // Cleanup on unmount
    return cleanup;
  }, [loadGoogleMaps, cleanup]);

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

      {/* Map Container */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <div ref={mapRef} style={{ height }} className="w-full bg-gray-200">
          {mapError ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-[#C72C41] mx-auto mb-4" />
                <p className="text-[#262729] font-semibold mb-2">
                  Map Unavailable
                </p>
                <p className="text-[#262729]/60 text-sm mb-4">
                  {mapError}. You can still get directions using the buttons
                  above.
                </p>
                <Button
                  onClick={openDirections}
                  size="sm"
                  className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Get Directions
                </Button>
              </div>
            </div>
          ) : !mapLoaded ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#C72C41] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-[#262729]/60 text-sm">Loading map...</p>
              </div>
            </div>
          ) : null}
        </div>

        {mapLoaded && !mapError && (
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
        )}
      </div>
    </div>
  );
};

// Extend global window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}
