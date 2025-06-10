import { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCart } from "../../hooks/useCart";
import { useLocation } from "../../hooks/useLocation";
import { productCategories } from "../../data/products";
import { Search, Package, Clock } from "lucide-react";

export const HeroSection = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showBulkOrder, setShowBulkOrder] = useState(false);
  const { addToCart } = useCart();
  const { location, isWithinRadius } = useLocation();

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

    if (!isWithinRadius) {
      alert(
        "Sorry, we currently deliver within 5km radius only. Delivery time: 90 minutes",
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
    <section className="relative bg-[#262729] min-h-[650px]">
      {/* Background Image with Linear Gradient Overlay */}
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
      <div className="relative z-10 flex items-center min-h-[650px]">
        <div className="max-w-[1232px] mx-auto px-3 w-full">
          <div className="flex flex-wrap -mx-3">
            {/* Content positioned to the right, taking up about 58% width */}
            <div className="w-full lg:w-7/12 px-3 ml-auto flex items-center min-h-[650px]">
              <div className="text-center relative z-10">
                {/* Subtitle */}
                <h1 className="text-[rgba(248,227,201,0.5)] font-oswald text-2xl font-medium uppercase mb-2 leading-9">
                  Delivered at your door step
                </h1>

                {/* Main heading with gradient text */}
                <h2
                  className="font-oswald text-[130px] font-bold uppercase leading-[146px] text-center mb-0"
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
                <div className="w-[440px] mx-auto -mt-[92.8px] relative">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc-banner.png"
                    alt="banner meat"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Form positioned at bottom */}
          <div className="flex flex-wrap -mx-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOrderNow();
              }}
              className="w-full px-3"
            >
              {/* Form container with 91.67% width and auto left margin */}
              <div className="w-11/12 ml-auto">
                <div className="bg-[rgba(199,44,65,0.5)] backdrop-blur-[12px] border border-[rgba(199,44,65,0.64)] p-6 relative z-10">
                  {/* Delivery Info Banner */}
                  <div className="mb-4 text-center">
                    <p className="text-[#F8E3C9] text-sm font-semibold">
                      🚀 90-minute delivery within 5km radius
                    </p>
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
                            <SelectItem key={weight.value} value={weight.value}>
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

                  {/* Test Cart Button */}
                  <div className="mt-4 text-center">
                    <Button
                      onClick={() => {
                        console.log("Test button clicked");
                        const testProduct = productCategories[0]?.products[0];
                        if (testProduct) {
                          addToCart(testProduct, 1, "1kg");
                          alert("Test product added to cart!");
                        }
                      }}
                      className="bg-green-600 text-white font-bold text-sm px-4 py-2 hover:bg-green-700"
                    >
                      Test Add to Cart
                    </Button>
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
  );
};
