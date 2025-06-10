import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCart } from "../../contexts/CartContext";
import { productCategories, Product } from "../../data/products";
import { ArrowRight } from "lucide-react";

export const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const currentCategory = productCategories[activeTab];
  const rawProducts = currentCategory?.products || [];

  // Sort products based on sortBy value
  const sortedProducts = useMemo(() => {
    const products = [...rawProducts];

    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
      case "price-high":
        return products.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
      case "newest":
        return products.sort((a, b) => b.id - a.id);
      case "popular":
      default:
        return products; // Keep original order for popular
    }
  }, [rawProducts, sortBy]);

  const handleAddToCart = (product: Product) => {
    console.log("ProductsSection - Adding to cart:", product);
    try {
      addToCart(product, 1, "1kg");
      console.log("ProductsSection - Cart items after add:", cartItems);
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="bg-[#262729] py-20">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-3 mb-12">
          <div className="w-full px-3 flex items-end justify-between">
            <div>
              <h2
                className="font-oswald text-5xl font-semibold tracking-wider leading-tight mb-4 uppercase"
                style={{
                  background:
                    "linear-gradient(90.01deg, #F8E3C9 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Our products
              </h2>
              <p className="text-white/60 font-medium">
                Find your favourite cuts, delivered fast with special offers you
                won't want to miss.
              </p>
            </div>
            <button className="flex items-center gap-2 text-[#F8E3C9] font-semibold hover:text-white transition-colors">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap -mx-3 mb-8">
          <div className="w-full px-3">
            <div className="flex flex-wrap gap-4 mb-8">
              {productCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(index);
                    console.log("Switched to category:", category.name);
                  }}
                  className={`px-6 py-3 font-semibold transition-all duration-300 rounded ${
                    activeTab === index
                      ? "bg-[#C72C41] text-white"
                      : "bg-[#363739] text-white/80 hover:bg-[#C72C41]/80 hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort and Filter */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-white/60">
                Showing {sortedProducts.length} products in{" "}
                {currentCategory?.name}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white/60">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value);
                    console.log("Sort changed to:", value);
                  }}
                >
                  <SelectTrigger className="w-40 bg-[#363739] border-none text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#363739] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                  >
                    {/* Product Image */}
                    <div
                      className="relative h-48 overflow-hidden"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[#C72C41] text-white text-xs font-bold px-2 py-1">
                          {currentCategory.name}
                        </Badge>
                      </div>
                      {/* Discount Badge */}
                      {product.discountPrice && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-[#E3A914] text-white text-xs font-bold px-2 py-1">
                            {Math.round(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100,
                            )}
                            % OFF
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3
                        className="text-white font-bold text-lg mb-2 hover:text-[#F8E3C9] transition-colors cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-3">
                        {product.weight || "1kg"}
                      </p>

                      {/* Price and Add Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[#F8E3C9] font-bold text-lg">
                            ₹{product.discountPrice || product.price}/-
                          </span>
                          {product.discountPrice && (
                            <span className="text-[#C72C41] text-sm line-through">
                              ₹{product.price}/-
                            </span>
                          )}
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-[#F8E3C9] text-[#303132] font-bold text-sm uppercase px-6 py-2 hover:bg-[#F8E3C9]/90 transition-all duration-300"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/60 py-8">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
