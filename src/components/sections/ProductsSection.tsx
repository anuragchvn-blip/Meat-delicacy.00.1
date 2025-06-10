import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCart } from "../../hooks/useCart";
import { productCategories } from "../../data/products";
import { ArrowRight } from "lucide-react";

export const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const { addToCart } = useCart();

  const currentCategory = productCategories[activeTab];
  const products = currentCategory?.products || [];

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
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
            <a
              href="/products"
              className="flex items-center gap-3 text-[#F8E3C9] font-bold hover:text-[#F8E3C9]/80 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Category Tabs and Sort */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 flex items-center justify-between mb-4">
            {/* Category Tabs */}
            <ul className="flex flex-wrap gap-5">
              {productCategories.map((category, index) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 font-bold transition-all duration-300 ${
                      activeTab === index
                        ? "bg-[#C72C41] text-[#F8E3C9] border border-[#F8E3C9]"
                        : "bg-[#181818] text-[#A8A9A9] border border-[#A8A9A9]"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-7 bg-transparent border-none text-[#F8E3C9] font-bold text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="most-rated">Most Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 pt-2">
            <div className="transition-opacity duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-transparent text-white flex flex-col"
                  >
                    <div className="relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent z-10"></div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-6 right-0 z-20">
                        <Badge
                          className="bg-[#C72C41] text-white font-bold text-xs uppercase tracking-wider py-2 px-3 border-none"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% 50%, 100% 100%, 8px 100%, 0 50%)",
                          }}
                        >
                          {currentCategory.name}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-grow pt-4">
                      <h5 className="text-lg font-bold leading-7 mb-1">
                        {product.name}
                      </h5>
                      <p className="text-white/60 text-sm">{product.weight}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="font-bold">
                        <span className="text-xl leading-7">
                          ₹{product.price}/-
                        </span>
                        {product.discountPrice && (
                          <span className="text-[#C72C41] ml-2">
                            <span className="line-through">
                              ₹{product.discountPrice}/-
                            </span>
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="bg-[#F8E3C9] text-[#303132] font-bold text-sm uppercase px-6 py-2 hover:bg-[#F8E3C9]/90 transition-all duration-300"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
