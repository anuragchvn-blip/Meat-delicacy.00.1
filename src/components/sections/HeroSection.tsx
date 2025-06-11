import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Truck, Clock, Shield, MapPin } from "lucide-react";
import { useLocation } from "../../hooks/useLocation";
import { useCart } from "../../hooks/useCart";
import {
  MarketingBanner,
  FloatingPromoBanner,
  DeliveryZoneBanner,
} from "../ui/MarketingBanner";
import { GoogleMap } from "../ui/GoogleMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { productCategories } from "../../data/products";
import { Search, Package } from "lucide-react";

export const HeroSection = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showBulkOrder, setShowBulkOrder] = useState(false);
  const { addToCart } = useCart();
  const { location, isWithinRadius, getDeliveryInfo, loading } = useLocation();

  // Weight options in grams
  const weightOptions = [
    { value: "250", label: "250gm" },
    { value: "500", label: "500gm" },
    { value: "1000", label: "1kg" },
    { value: "2000", label: "2kg" },
  ];

  const timeSlots = [
    { value: "12:00 PM to 03:00 PM", label: "12:00 PM to 03:00 PM" },
    { value: "04:00 PM to 08:00 PM", label: "04:00 PM to 08:00 PM" },
  ];

  const handleOrderNow = () => {
    if (!selectedProduct || !selectedQuantity || !selectedTimeSlot) {
      alert("Please fill all fields to place your order");
      return;
    }

    const deliveryInfo = getDeliveryInfo();
    if (!deliveryInfo.available) {
      alert(
        `${deliveryInfo.message}. We deliver within 5km radius from Hommadevanahalli, Bangalore.`,
      );
      return;
    }

    // Find the product from categories
    const allProducts = productCategories.flatMap(
      (category) => category.products,
    );
    const product = allProducts.find(
      (p) => p.id.toString() === selectedProduct,
    );

    if (product) {
      addToCart(product, 1, selectedQuantity + "g");
      alert(
        `${product.name} (${selectedQuantity}g) added to cart! Estimated delivery: ${selectedTimeSlot} (90 minutes within 5km)`,
      );

      // Reset form
      setSelectedProduct("");
      setSelectedQuantity("");
      setSelectedTimeSlot("");
    }
  };

  const BulkOrderForm = () => (
    <div className="bg-[#C72C41]/60 backdrop-blur-sm border border-[#C72C41]/50 p-6 rounded-lg mt-4">
      <h3 className="text-white font-bold text-lg mb-4">Bulk Order Request</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/60"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Product Required"
          className="px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Quantity (e.g., 50kg)"
          className="px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/60"
        />
        <textarea
          placeholder="Additional Requirements"
          rows={3}
          className="md:col-span-2 px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/60"
        />
      </div>
      <div className="flex gap-3 mt-4">
        <Button
          onClick={() => {
            alert("Bulk order request submitted! We'll contact you soon.");
            setShowBulkOrder(false);
          }}
          className="bg-[#F8E3C9] text-[#303132] font-bold hover:bg-[#F8E3C9]/90"
        >
          Submit Request
        </Button>
        <Button
          onClick={() => setShowBulkOrder(false)}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Marketing Banner at the top */}
      <MarketingBanner />

      <section className="relative bg-gradient-to-br from-[#262729] via-[#262729] to-[#3a3a3c] text-white min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#F8E3C9]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C72C41]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#F8E3C9]/5 to-[#C72C41]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/home-banner.webp"
            alt="banner figure"
            className="w-full h-full object-cover"
          />
          {/* Linear gradient overlay to match original design */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#262626] from-[11.35%] via-[#262626] via-[50.75%] to-transparent to-[101%]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center min-h-[650px] w-full">
          <div className="max-w-[1232px] mx-auto px-3 w-full">
            <div className="flex flex-wrap -mx-3">
              {/* Centered content container */}
              <div className="w-full px-3 flex items-center justify-center min-h-[650px]">
                <div className="text-center relative z-10 max-w-4xl mx-auto">
                  {/* Subtitle */}
                  <h1 className="text-[rgba(248,227,201,0.5)] font-oswald text-2xl font-medium uppercase mb-2 leading-9">
                    Delivered at your door step
                  </h1>

                  {/* Main heading with gradient text */}
                  <h2
                    className="font-oswald text-6xl md:text-8xl lg:text-[130px] font-bold uppercase leading-tight lg:leading-[146px] text-center mb-0"
                    style={{
                      background:
                        "linear-gradient(90.01deg, rgb(248, 227, 201) 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Fresh pork
                  </h2>

                  {/* Meat Banner Image Overlay - positioned over text */}
                  <div className="w-full max-w-[440px] mx-auto -mt-[40px] lg:-mt-[92.8px] relative">
                    <img
                      src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc-banner.png"
                      alt="banner meat"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Form positioned at bottom center */}
            <div className="flex flex-wrap -mx-3 absolute bottom-8 left-0 right-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOrderNow();
                }}
                className="w-full px-3"
              >
                {/* Centered form container */}
                <div className="max-w-5xl mx-auto">
                  <div className="bg-[rgba(199,44,65,0.5)] backdrop-blur-[12px] border border-[rgba(199,44,65,0.64)] p-6 relative z-10 rounded-lg">
                    {/* Delivery Info Banner */}
                    <div className="mb-4 text-center">
                      {loading ? (
                        <p className="text-[#F8E3C9] text-sm font-semibold">
                          📍 Detecting your location...
                        </p>
                      ) : (
                        <p className="text-[#F8E3C9] text-sm font-semibold">
                          {isWithinRadius ? (
                            <>
                              🚀 {getDeliveryInfo().estimatedTime} delivery
                              {location.distanceFromStore && (
                                <span className="text-white/70">
                                  {" "}
                                  ({getDeliveryInfo().distance} from
                                  Hommadevanahalli)
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              📍 90-minute delivery within 5km radius from
                              Hommadevanahalli
                              {location.distanceFromStore && (
                                <span className="text-yellow-400">
                                  {" "}
                                  (You're {getDeliveryInfo().distance} away)
                                </span>
                              )}
                            </>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                      {/* Product Selection */}
                      <div>
                        <span className="flex items-center gap-1 text-white/60 text-xs font-semibold uppercase mb-2">
                          <Search className="w-3 h-3" />
                          LOOKING FOR
                        </span>
                        <Select
                          value={selectedProduct}
                          onValueChange={setSelectedProduct}
                        >
                          <SelectTrigger className="h-11 bg-transparent border-none text-white font-bold rounded border-0">
                            <SelectValue>
                              <span className="text-[rgba(248,227,201,0.4)] font-medium">
                                {selectedProduct
                                  ? productCategories
                                      .flatMap((cat) => cat.products)
                                      .find(
                                        (p) =>
                                          p.id.toString() === selectedProduct,
                                      )?.name
                                  : "Pick your meat"}
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((category) => (
                              <div key={category.id}>
                                {category.products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()}
                                  >
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quantity Selection */}
                      <div>
                        <span className="flex items-center gap-1 text-white/60 text-xs font-semibold uppercase mb-2">
                          <Package className="w-3 h-3" />
                          Quantity
                        </span>
                        <Select
                          value={selectedQuantity}
                          onValueChange={setSelectedQuantity}
                        >
                          <SelectTrigger className="h-11 bg-transparent border-none text-white font-bold rounded border-0">
                            <SelectValue>
                              <span className="text-[rgba(248,227,201,0.4)] font-medium">
                                {selectedQuantity
                                  ? weightOptions.find(
                                      (w) => w.value === selectedQuantity,
                                    )?.label
                                  : "Choose quantity"}
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {weightOptions.map((weight) => (
                              <SelectItem
                                key={weight.value}
                                value={weight.value}
                              >
                                {weight.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Time Slot Selection */}
                      <div>
                        <span className="flex items-center gap-1 text-white/60 text-xs font-semibold uppercase mb-2">
                          <Clock className="w-3 h-3" />
                          Time slot
                        </span>
                        <Select
                          value={selectedTimeSlot}
                          onValueChange={setSelectedTimeSlot}
                        >
                          <SelectTrigger className="h-11 bg-transparent border-none text-white font-bold rounded border-0">
                            <SelectValue>
                              <span className="text-[rgba(248,227,201,0.4)] font-medium">
                                {selectedTimeSlot || "Pick time slot"}
                              </span>
                            </SelectValue>
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

                      {/* Order Button */}
                      <div>
                        <Button
                          type="submit"
                          className="w-full bg-[#F8E3C9] text-[#303132] font-bold text-sm uppercase hover:bg-[#F8E3C9]/90 transition-all duration-300 h-11 px-6"
                        >
                          Order now
                        </Button>
                      </div>
                    </div>

                    {/* Bulk Order Toggle */}
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setShowBulkOrder(!showBulkOrder)}
                        className="text-[#F8E3C9] text-sm hover:underline"
                      >
                        Need bulk quantities? Click here
                      </button>
                    </div>
                  </div>

                  {/* Bulk Order Form */}
                  {showBulkOrder && <BulkOrderForm />}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262729] mb-4">
              Visit Our Store
            </h2>
            <p className="text-lg text-[#262729]/70 max-w-2xl mx-auto">
              Located in the heart of Hommadevanahalli, Bangalore. We deliver
              fresh, premium pork within a 5km radius.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <GoogleMap
                height="500px"
                showDirections={true}
                showStoreInfo={true}
                className="rounded-lg overflow-hidden"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#262729] mb-6">
                Why Choose Our Location?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#C72C41]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-[#C72C41]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#262729] mb-2">
                      Fast Delivery
                    </h4>
                    <p className="text-[#262729]/70 text-sm">
                      45-90 minute delivery within 5km radius from our
                      Hommadevanahalli location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#C72C41]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#C72C41]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#262729] mb-2">
                      Quality Assured
                    </h4>
                    <p className="text-[#262729]/70 text-sm">
                      100% fresh, antibiotic-free pork sourced from trusted
                      local farmers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#C72C41]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C72C41]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#262729] mb-2">
                      Extended Hours
                    </h4>
                    <p className="text-[#262729]/70 text-sm">
                      Open from 9:00 AM to 9:00 PM daily for your convenience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Zone Banner */}
              {location && <DeliveryZoneBanner userLocation={location} />}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Promotion Banner */}
      <FloatingPromoBanner />
    </>
  );
};
