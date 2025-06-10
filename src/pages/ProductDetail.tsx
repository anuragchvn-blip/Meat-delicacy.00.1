import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useCart } from "../contexts/CartContext";
import { productCategories } from "../data/products";
import { Product } from "../data/products";
import { Minus, Plus } from "lucide-react";
import { Navigation } from "../components/ui/navigation";
import { Footer } from "../components/ui/Footer";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedCubeSize, setSelectedCubeSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [showError, setShowError] = useState(false);

  // Find product by ID
  useEffect(() => {
    const allProducts = productCategories.flatMap((cat) => cat.products);
    const foundProduct = allProducts.find((p) => p.id.toString() === productId);
    setProduct(foundProduct || null);
    if (foundProduct) {
      setCurrentPrice(foundProduct.price);
    }
  }, [productId]);

  // Cube size options
  const cubeSizeOptions = [
    { value: "whole-slab", label: "Whole Slab" },
    { value: "medium-cubes", label: "Medium Cubes(25-35grams)" },
    { value: "large-cubes", label: "Large Cubes(40-60grams)" },
  ];

  // Quantity options
  const quantityOptions = [
    { value: "250g", label: "250g" },
    { value: "500g", label: "500g" },
    { value: "1kg", label: "1kg" },
    { value: "2kg", label: "2kg" },
  ];

  const handleQuantityChange = (action: "increment" | "decrement") => {
    setQuantity((prev) => {
      if (action === "increment") return prev + 1;
      if (action === "decrement" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedCubeSize || !selectedQuantity) {
      setShowError(true);
      return;
    }

    if (product) {
      addToCart(product, quantity, selectedQuantity);
      alert(`${product.name} added to cart successfully!`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#262729]">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-xl">Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#262729]">
      <Navigation />
      <section className="bg-[#262729] pt-20 pb-12">
      <div className="max-w-[1232px] mx-auto px-3">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="w-full px-3">
          <ol className="flex flex-wrap mb-4">
            <li className="text-white/60">
              <button
                onClick={() => navigate("/")}
                className="hover:text-brand-cream transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li className="px-2 text-white/60">/</li>
            <li className="text-white/60">
              <button
                onClick={() => navigate("/")}
                className="hover:text-brand-cream transition-colors cursor-pointer"
              >
                Our products
              </button>
            </li>
            <li className="px-2 text-white/60">/</li>
            <li className="text-brand-cream font-bold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="flex flex-wrap -mx-3 mt-2 pt-6">
          {/* Product Images */}
          <div className="w-full lg:w-5/12 px-3">
            <div className="h-[499px] mb-6 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail */}
            <div className="relative overflow-hidden">
              <div className="flex">
                <div className="w-[107px] h-20 mr-5">
                  <img
                    src={product.image}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-7/12 px-3 lg:px-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {/* Category Badge */}
              <div className="bg-[#C72C41] text-white font-oswald text-xs font-bold tracking-wider uppercase py-2 px-4 relative clip-path-arrow">
                {productCategories.find((cat) =>
                  cat.products.some((p) => p.id === product.id),
                )?.name || "Pork Special Cuts"}
              </div>

              {/* Product Name */}
              <h1 className="text-brand-cream text-4xl font-bold leading-11">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-[#767A7A] leading-5">
                {product.description ||
                  "Our premium quality meat product, carefully selected and processed to ensure the best taste and nutrition. Perfect for various cooking methods and recipes."}
              </p>
            </div>

            {/* Selection Form */}
            <div className="w-2/3">
              <div className="grid gap-4">
                {/* Cube Size Selection */}
                <div>
                  <Select
                    value={selectedCubeSize}
                    onValueChange={setSelectedCubeSize}
                  >
                    <SelectTrigger className="h-11 bg-[#363739] border-none text-white font-bold">
                      <SelectValue placeholder="Select Cube Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {cubeSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity Selection */}
                <div>
                  <Select
                    value={selectedQuantity}
                    onValueChange={setSelectedQuantity}
                  >
                    <SelectTrigger className="h-11 bg-[#363739] border-none text-white font-bold">
                      <SelectValue placeholder="Select Quantity" />
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

                {/* Error Message */}
                {showError && (
                  <div className="text-[#DC3545]">
                    Please select Cube Size & Quantity to proceed.
                  </div>
                )}

                {/* Quantity Counter */}
                <div className="bg-[#363739] inline-flex items-center justify-center mt-4 p-3">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="bg-[#E2D1BB] text-[#262729] w-6 h-6 flex items-center justify-center rounded text-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 h-5 text-center font-bold bg-transparent text-white border border-[#E2D1BB] mx-1"
                  />
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="bg-[#E2D1BB] text-[#262729] w-6 h-6 flex items-center justify-center rounded text-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pricing */}
              <div className="hidden">
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-brand-cream text-3xl">
                    ₹{product.price}/-
                  </span>
                  {product.discountPrice && (
                    <span className="text-[#C72C41] text-xl line-through">
                      ₹{product.discountPrice}/-
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleAddToCart}
                  className="bg-brand-cream text-[#303132] font-bold uppercase hover:bg-brand-cream/90 transition-all duration-300 px-18 py-4"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-[#363739] grid grid-cols-2 lg:grid-cols-5 justify-between mt-6 p-7">
              <div className="flex items-center gap-4">
                <div className="bg-[#3E3D3D] w-8 h-8 flex items-center justify-center">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/product-specality/clock.svg"
                    alt="Cooking time"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-cream text-sm font-bold">
                    Cooking time
                  </span>
                  <span className="text-[#A8A9A9] text-xs font-medium">
                    45-60 mins
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#3E3D3D] w-8 h-8 flex items-center justify-center">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/product-specality/timer.svg"
                    alt="Shelf life"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-cream text-sm font-bold">
                    Shelf life
                  </span>
                  <span className="text-[#A8A9A9] text-xs font-medium">
                    2-3 days
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#3E3D3D] w-8 h-8 flex items-center justify-center">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/product-specality/weight.svg"
                    alt="Weight"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-cream text-sm font-bold">
                    Weight
                  </span>
                  <span className="text-[#A8A9A9] text-xs font-medium">
                    {selectedQuantity || "1kg"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#3E3D3D] w-8 h-8 flex items-center justify-center">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/product-specality/box.svg"
                    alt="Storage"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-cream text-sm font-bold">
                    Storage
                  </span>
                  <span className="text-[#A8A9A9] text-xs font-medium">
                    Refrigerate
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#3E3D3D] w-8 h-8 flex items-center justify-center">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/product-specality/danger.svg"
                    alt="Allergy info"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-cream text-sm font-bold">
                    Allergy info
                  </span>
                  <span className="text-[#A8A9A9] text-xs font-medium">
                    None
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;