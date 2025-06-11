import { useState, useEffect } from "react";
import {
  getCurrentLocation,
  checkDeliveryAvailability,
  getDeliveryAreas,
  getEstimatedDeliveryTime,
  formatDistance,
  LocationResult,
} from "../services/locationService";

export const useLocation = () => {
  const [location, setLocation] = useState<LocationResult>({
    coordinates: null,
    address: null,
    isWithinDeliveryRadius: false,
    distanceFromStore: null,
    error: null,
  });
  const [loading, setLoading] = useState(false);
  const [hasCheckedLocation, setHasCheckedLocation] = useState(false);

  // Auto-detect location on mount
  useEffect(() => {
    if (!hasCheckedLocation) {
      detectLocation();
    }
  }, [hasCheckedLocation]);

  const detectLocation = async () => {
    setLoading(true);
    try {
      const result = await getCurrentLocation();
      setLocation(result);
      setHasCheckedLocation(true);

      // Store in localStorage for future visits
      if (result.coordinates) {
        localStorage.setItem("userLocation", JSON.stringify(result));
      }
    } catch (error) {
      console.error("Location detection failed:", error);
      setLocation({
        coordinates: null,
        address: null,
        isWithinDeliveryRadius: false,
        distanceFromStore: null,
        error: "Could not detect location",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkAddressDelivery = async (address: string) => {
    setLoading(true);
    try {
      const result = await checkDeliveryAvailability(address);
      setLocation(result);
      return result;
    } catch (error) {
      console.error("Address check failed:", error);
      const errorResult: LocationResult = {
        coordinates: null,
        address,
        isWithinDeliveryRadius: false,
        distanceFromStore: null,
        error: "Could not verify delivery availability",
      };
      setLocation(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryInfo = () => {
    if (!location.distanceFromStore) {
      return {
        available: location.isWithinDeliveryRadius,
        estimatedTime: "60-90 minutes",
        distance: "Unknown",
        message: location.isWithinDeliveryRadius
          ? "Delivery available in your area!"
          : "Outside delivery area",
      };
    }

    const estimatedTime = getEstimatedDeliveryTime(location.distanceFromStore);
    const distance = formatDistance(location.distanceFromStore);

    return {
      available: location.isWithinDeliveryRadius,
      estimatedTime,
      distance,
      message: location.isWithinDeliveryRadius
        ? `Delivery available! ${distance} from our store`
        : `Sorry, you're ${distance} from our store (outside 5km radius)`,
    };
  };

  return {
    location,
    loading,
    isWithinRadius: location.isWithinDeliveryRadius,
    detectLocation,
    checkAddressDelivery,
    getDeliveryInfo,
    deliveryAreas: getDeliveryAreas(),
    hasCheckedLocation,
  };
};
