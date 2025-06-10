import { useState, useEffect } from "react";

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  pincode?: string;
  isWithinDeliveryRadius?: boolean;
}

export interface LocationError {
  code: number;
  message: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LocationError | null>(null);

  // Delivery center coordinates (example: Bangalore city center)
  const DELIVERY_CENTER = {
    latitude: 12.9716,
    longitude: 77.5946,
  };

  const DELIVERY_RADIUS_KM = 5; // 5km radius for 90-minute delivery

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check if location is within delivery radius
  const isWithinDeliveryRadius = (lat: number, lon: number): boolean => {
    const distance = calculateDistance(
      lat,
      lon,
      DELIVERY_CENTER.latitude,
      DELIVERY_CENTER.longitude,
    );
    return distance <= DELIVERY_RADIUS_KM;
  };

  // Reverse geocoding to get address from coordinates
  const reverseGeocode = async (
    lat: number,
    lon: number,
  ): Promise<Partial<LocationData>> => {
    try {
      // Using OpenCage Geocoder API (you can replace with your preferred service)
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=YOUR_API_KEY`,
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          address: result.formatted,
          city:
            result.components.city ||
            result.components.town ||
            result.components.village,
          pincode: result.components.postcode,
        };
      }
    } catch (error) {
      console.warn("Reverse geocoding failed:", error);
    }

    return {};
  };

  // Get current location
  const getCurrentLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "Geolocation is not supported by this browser",
      });
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const addressData = await reverseGeocode(latitude, longitude);
          const isWithinRadius = isWithinDeliveryRadius(latitude, longitude);

          setLocation({
            latitude,
            longitude,
            ...addressData,
            isWithinDeliveryRadius: isWithinRadius,
          });
        } catch (error) {
          setLocation({
            latitude,
            longitude,
            isWithinDeliveryRadius: isWithinDeliveryRadius(latitude, longitude),
          });
        }

        setLoading(false);
      },
      (error) => {
        setError({
          code: error.code,
          message: getLocationErrorMessage(error.code),
        });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000, // 5 minutes
      },
    );
  };

  // Get location error message
  const getLocationErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return "Location access denied by user. Please enable location access and try again.";
      case 2:
        return "Location information is unavailable. Please check your internet connection.";
      case 3:
        return "Location request timed out. Please try again.";
      default:
        return "Unable to retrieve location. Please try again or enter your address manually.";
    }
  };

  // Check delivery availability for given coordinates
  const checkDeliveryAvailability = (lat: number, lon: number) => {
    return isWithinDeliveryRadius(lat, lon);
  };

  // Get estimated delivery time based on location
  const getEstimatedDeliveryTime = (lat?: number, lon?: number): string => {
    if (!lat || !lon) return "Location required";

    if (isWithinDeliveryRadius(lat, lon)) {
      return "60-90 minutes";
    }

    return "Not available in your area";
  };

  // Auto-detect location on component mount
  useEffect(() => {
    // Check if we have cached location
    const cachedLocation = localStorage.getItem("userLocation");
    if (cachedLocation) {
      try {
        const parsed = JSON.parse(cachedLocation);
        // Check if cached location is less than 1 hour old
        if (Date.now() - parsed.timestamp < 3600000) {
          setLocation(parsed.data);
          return;
        }
      } catch (error) {
        console.warn("Failed to parse cached location:", error);
      }
    }

    // Auto-detect location if no cached data
    getCurrentLocation();
  }, []);

  // Cache location when it changes
  useEffect(() => {
    if (location) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          data: location,
          timestamp: Date.now(),
        }),
      );
    }
  }, [location]);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    checkDeliveryAvailability,
    getEstimatedDeliveryTime,
    isWithinDeliveryRadius: location?.isWithinDeliveryRadius || false,
  };
};

// Export delivery zones for admin use
export const DELIVERY_ZONES = [
  {
    name: "Zone 1 - City Center",
    radius: 2,
    deliveryTime: "30-60 minutes",
    deliveryFee: 0,
  },
  {
    name: "Zone 2 - Extended City",
    radius: 5,
    deliveryTime: "60-90 minutes",
    deliveryFee: 50,
  },
];
