import React, { useState } from "react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { allProducts } from "@/data/products";
import { Search, User, Clock } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/lib/utils";

interface HeroFormProps {
  className?: string;
}

export function HeroForm({ className }: HeroFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const { location, isWithinDeliveryRadius, getEstimatedDeliveryTime } =
    useLocation();

  // Generate quantity options (1kg to 10kg)
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `${i + 1}kg`,
    label: `${i + 1}kg`,
  }));

  // Time slot options
  const timeSlots = [
    { value: "1", label: "12:00 PM to 03:00 PM" },
    { value: "2", label: "04:00 PM to 08:00 PM" },
  ];

  // Available products for ordering
  const availableProducts = allProducts.filter((product) => product.inStock);

  const handleOrderNow = () => {
    if (!selectedProduct || !selectedQuantity || !selectedTimeSlot) {
      alert("Please fill in all fields to place your order");
      return;
    }

    if (!isWithinDeliveryRadius) {
      alert(
        "Sorry, we currently deliver only within 5km radius. Please check your location.",
      );
      return;
    }

    // Here you would typically handle the order submission
    const orderData = {
      productId: selectedProduct,
      quantity: selectedQuantity,
      timeSlot: selectedTimeSlot,
      location: location,
    };

    console.log("Order submitted:", orderData);
    alert(
      "Order placed successfully! You will receive a confirmation shortly.",
    );
  };

  return (
    <div className={cn("w-full mx-auto", className)}>
      <form
        method="POST"
        action="#"
        className="w-11/12 ml-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleOrderNow();
        }}
      >
        <div className="grid grid-cols-4 gap-4 bg-red-600/50 backdrop-blur-sm border border-red-600/40 px-8 py-6 relative z-10">
          {/* Product Selection */}
          <div>
            <span className="flex items-center text-white/60 text-xs font-semibold uppercase gap-1.5 mb-2">
              <Search className="w-3 h-3" />
              Looking For
            </span>
            <div className="relative">
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="h-11 bg-transparent border-none text-white/90 font-medium text-base">
                  <SelectValue placeholder="Pick your meat" />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <span className="flex items-center text-white/60 text-xs font-semibold uppercase gap-1.5 mb-2">
              <User className="w-3 h-3" />
              Quantity
            </span>
            <div className="relative">
              <Select
                value={selectedQuantity}
                onValueChange={setSelectedQuantity}
              >
                <SelectTrigger className="h-11 bg-transparent border-none text-white/90 font-medium text-base">
                  <SelectValue placeholder="Choose quantity" />
                </SelectTrigger>
                <SelectContent>
                  {quantityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div>
            <span className="flex items-center text-white/60 text-xs font-semibold uppercase gap-1.5 mb-2">
              <Clock className="w-3 h-3" />
              Time Slot
            </span>
            <div className="relative">
              <Select
                value={selectedTimeSlot}
                onValueChange={setSelectedTimeSlot}
              >
                <SelectTrigger className="h-11 bg-transparent border-none text-white/90 font-medium text-base">
                  <SelectValue placeholder="Pick time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Button */}
          <div>
            <Button
              type="submit"
              className="bg-brand-cream text-brand-dark font-bold text-sm uppercase px-6 py-3 hover:bg-brand-cream-dark transition-all duration-300 capitalize"
              disabled={!isWithinDeliveryRadius}
            >
              Order Now
            </Button>
          </div>
        </div>

        {/* Delivery Status */}
        {location && (
          <div className="mt-4 text-center">
            {isWithinDeliveryRadius ? (
              <div className="text-green-400 text-sm">
                ✓ 90-minute delivery available in your area
                <br />
                <span className="text-white/70">
                  Estimated delivery:{" "}
                  {getEstimatedDeliveryTime(
                    location.latitude,
                    location.longitude,
                  )}
                </span>
              </div>
            ) : (
              <div className="text-yellow-400 text-sm">
                ⚠ Currently, we deliver only within 5km radius
                <br />
                <span className="text-white/70">
                  We're working to expand our delivery area
                </span>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
