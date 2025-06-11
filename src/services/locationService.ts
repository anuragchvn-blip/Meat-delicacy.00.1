// Hommadevanahalli coordinates (approximate location in Bangalore)
const STORE_LOCATION = {
  lat: 12.9698, // Approximate latitude for Hommadevanahalli area
  lng: 77.6275, // Approximate longitude for Hommadevanahalli area
  name: "Hommadevanahalli, Bangalore",
};

const DELIVERY_RADIUS_KM = 5;

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface LocationResult {
  coordinates: LocationCoordinates | null;
  address: string | null;
  isWithinDeliveryRadius: boolean;
  distanceFromStore: number | null;
  error: string | null;
}

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get user's current location using Geolocation API
export const getCurrentLocation = (): Promise<LocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        coordinates: null,
        address: null,
        isWithinDeliveryRadius: false,
        distanceFromStore: null,
        error: "Geolocation is not supported by this browser.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const distance = calculateDistance(
          userCoords.lat,
          userCoords.lng,
          STORE_LOCATION.lat,
          STORE_LOCATION.lng,
        );

        const isWithinRadius = distance <= DELIVERY_RADIUS_KM;

        // Try to get address from coordinates
        let address = null;
        try {
          address = await reverseGeocode(userCoords.lat, userCoords.lng);
        } catch (error) {
          console.warn("Could not get address:", error);
        }

        resolve({
          coordinates: userCoords,
          address,
          isWithinDeliveryRadius: isWithinRadius,
          distanceFromStore: Math.round(distance * 10) / 10, // Round to 1 decimal
          error: null,
        });
      },
      (error) => {
        let errorMessage = "Could not get your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }

        resolve({
          coordinates: null,
          address: null,
          isWithinDeliveryRadius: false,
          distanceFromStore: null,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    );
  });
};

// Reverse geocode coordinates to address
const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<string | null> => {
  try {
    // Using a free geocoding service (you can replace with Google Maps API if you have a key)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();
    return (
      data.locality ||
      data.city ||
      data.principalSubdivision ||
      "Unknown location"
    );
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
};

// Check if a specific address/coordinates is within delivery radius
export const checkDeliveryAvailability = async (
  searchAddress: string,
): Promise<LocationResult> => {
  try {
    // For now, we'll use a simple check for Bangalore-related keywords
    // In production, you'd use a proper geocoding service
    const bangaloreKeywords = [
      "bangalore",
      "bengaluru",
      "karnataka",
      "btm",
      "koramangala",
      "whitefield",
      "electronic city",
      "marathahalli",
      "indiranagar",
      "jayanagar",
      "rajajinagar",
      "malleshwaram",
      "yelahanka",
      "banashankari",
      "jp nagar",
      "hsr layout",
      "bommanahalli",
      "electronic city",
      "sarjapur",
      "bellandur",
      "hommadevanahalli",
    ];

    const isInBangalore = bangaloreKeywords.some((keyword) =>
      searchAddress.toLowerCase().includes(keyword),
    );

    if (!isInBangalore) {
      return {
        coordinates: null,
        address: searchAddress,
        isWithinDeliveryRadius: false,
        distanceFromStore: null,
        error: "We currently deliver only in Bangalore.",
      };
    }

    // If it's in Bangalore, assume it might be within radius
    // In production, you'd get actual coordinates and calculate distance
    return {
      coordinates: null,
      address: searchAddress,
      isWithinDeliveryRadius: true,
      distanceFromStore: null,
      error: null,
    };
  } catch (error) {
    return {
      coordinates: null,
      address: searchAddress,
      isWithinDeliveryRadius: false,
      distanceFromStore: null,
      error: "Could not verify delivery availability.",
    };
  }
};

// Get popular areas within delivery radius
export const getDeliveryAreas = (): string[] => {
  return [
    "BTM Layout",
    "Koramangala",
    "HSR Layout",
    "Bommanahalli",
    "Electronic City",
    "JP Nagar",
    "Banashankari",
    "Jayanagar",
    "Wilson Garden",
    "Basavanagudi",
    "Hommadevanahalli",
    "Begur",
    "Hongasandra",
    "Arekere",
    "Hulimavu",
  ];
};

// Store location info
export const getStoreLocation = () => STORE_LOCATION;
export const getDeliveryRadius = () => DELIVERY_RADIUS_KM;

// Calculate estimated delivery time based on distance
export const getEstimatedDeliveryTime = (distanceKm: number): string => {
  if (distanceKm <= 2) return "45-60 minutes";
  if (distanceKm <= 3.5) return "60-75 minutes";
  if (distanceKm <= 5) return "75-90 minutes";
  return "90+ minutes (outside delivery area)";
};

// Format distance for display
export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
};
