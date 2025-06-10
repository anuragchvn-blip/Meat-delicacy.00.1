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
  const { addToCart } = useCart();
  const { location, isWithinRadius } = useLocation();

  const handleOrderNow = () => {
    if (!selectedProduct || !selectedQuantity || !selectedTimeSlot) {
      alert("Please fill all fields to place your order");
      return;
    }

    if (!isWithinRadius) {
      alert("Sorry, we currently deliver within 5km radius only");
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
      addToCart(product, parseInt(selectedQuantity));
      alert(
        `${product.name} added to cart! Estimated delivery: ${selectedTimeSlot}`,
      );
    }
  };

  return (
    <section className="relative bg-[#262729] min-h-[650px] flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/home-banner.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#262626] via-[#262626]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 w-full">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-7/12 px-3">
            <div className="text-center lg:text-left relative">
              {/* Main Heading */}
              <h1 className="text-[#F8E3C9]/50 font-oswald text-xl md:text-2xl font-medium uppercase mb-2 leading-9">
                Delivered at your door step
              </h1>

              {/* Large Title with Gradient */}
              <h2
                className="font-oswald text-6xl md:text-8xl lg:text-[130px] font-bold uppercase leading-none mb-8 text-center lg:text-left"
                style={{
                  background:
                    "linear-gradient(90.01deg, #F8E3C9 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Fresh pork
              </h2>

              {/* Meat Banner Image */}
              <div className="w-full max-w-[440px] mx-auto lg:mx-0 -mt-24 relative">
                <img
                  src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc-banner.png"
                  alt="banner meat"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="flex flex-wrap -mx-3 mt-8">
          <div className="w-full px-3">
            <form className="max-w-6xl">
              <div className="bg-[#C72C41]/50 backdrop-blur-sm border border-[#C72C41]/40 p-6 lg:p-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Product Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wide">
                      <Search className="w-3 h-3" />
                      Looking For
                    </label>
                    <Select
                      value={selectedProduct}
                      onValueChange={setSelectedProduct}
                    >
                      <SelectTrigger className="h-11 bg-transparent border-none text-white font-bold">
                        <SelectValue placeholder="Pick your meat" />
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
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wide">
                      <Package className="w-3 h-3" />
                      Quantity
                    </label>
                    <Select
                      value={selectedQuantity}
                      onValueChange={setSelectedQuantity}
                    >
                      <SelectTrigger className="h-11 bg-transparent border-none text-white font-bold">
                        <SelectValue placeholder="Choose quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <SelectItem key={qty} value={qty.toString()}>
                            {qty} {qty === 1 ? "piece" : "pieces"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wide">
                      <Clock className="w-3 h-3" />
                      Time slot
                    </label>
                    <Select
                      value={selectedTimeSlot}
                      onValueChange={setSelectedTimeSlot}
                    >
                      <SelectTrigger className="h-11 bg-transparent border-none text-white font-bold">
                        <SelectValue placeholder="Pick time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00 PM to 03:00 PM">
                          12:00 PM to 03:00 PM
                        </SelectItem>
                        <SelectItem value="04:00 PM to 08:00 PM">
                          04:00 PM to 08:00 PM
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Order Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={handleOrderNow}
                      className="w-full bg-[#F8E3C9] text-[#303132] font-bold text-sm uppercase hover:bg-[#F8E3C9]/90 transition-all duration-300 h-11"
                    >
                      Order now
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
