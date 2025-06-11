import React, { useState, useMemo } from "react";
import { Search, Filter, Grid, List, ShoppingCart, Star } from "lucide-react";
import { Navigation } from "../components/ui/navigation";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { productCategories, Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { SEO } from "../components/SEO";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState("all");

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Flatten all products from categories
  const allProducts = useMemo(() => {
    return productCategories.flatMap((category) => category.products);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      const price = (product: Product) =>
        product.discountPrice || product.price;
      switch (priceRange) {
        case "under-300":
          filtered = filtered.filter((product) => price(product) < 300);
          break;
        case "300-500":
          filtered = filtered.filter(
            (product) => price(product) >= 300 && price(product) <= 500,
          );
          break;
        case "above-500":
          filtered = filtered.filter((product) => price(product) > 500);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
        );
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [allProducts, searchTerm, selectedCategory, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    ...productCategories.map((cat) => ({
      value: cat.name,
      label: cat.name,
    })),
  ];

  const ProductCard = ({ product }: { product: Product }) => {
    const finalPrice = product.discountPrice || product.price;
    const hasDiscount =
      product.discountPrice && product.discountPrice < product.price;
    const discountPercentage = hasDiscount
      ? Math.round(
          ((product.price - product.discountPrice!) / product.price) * 100,
        )
      : 0;

    if (viewMode === "list") {
      return (
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-64 h-48 md:h-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onClick={() => handleProductClick(product.id)}
                />
                {hasDiscount && (
                  <Badge className="absolute top-2 left-2 bg-[#C72C41] text-white">
                    -{discountPercentage}%
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-[#262729] mb-2 hover:text-[#C72C41] transition-colors cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-[#262729]/70 mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline">{product.weight}</Badge>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right mt-4 md:mt-0">
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
                      <div>
                        <div className="text-2xl font-bold text-[#262729]">
                          ₹{finalPrice}
                        </div>
                        {hasDiscount && (
                          <div className="text-sm text-[#C72C41] line-through">
                            ₹{product.price}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90 min-w-[120px]"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => handleProductClick(product.id)}
            />
            {hasDiscount && (
              <Badge className="absolute top-2 left-2 bg-[#C72C41] text-white">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3
              className="text-lg font-bold text-[#262729] mb-2 line-clamp-2 hover:text-[#C72C41] transition-colors cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              {product.name}
            </h3>
            <p className="text-[#262729]/70 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {product.weight}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-[#262729]">
                  ₹{finalPrice}
                </div>
                {hasDiscount && (
                  <div className="text-sm text-[#C72C41] line-through">
                    ₹{product.price}
                  </div>
                )}
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={!product.inStock}
                size="sm"
                className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <SEO
        title="Premium Pork Products - Fresh Meat Delivery in Bangalore"
        description="Browse our complete collection of premium pork cuts, sausages, and specialty products. Fresh delivery within 5km of Hommadevanahalli, Bangalore."
        keywords="pork products, fresh meat, bangalore delivery, pork cuts, sausages, bacon"
      />

      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#262729] to-[#3a3a3c] text-white pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Premium Pork Products
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Discover our complete collection of fresh, high-quality pork
                cuts and products. Delivered fresh to your doorstep in
                Bangalore.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 items-center">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-300">Under ₹300</SelectItem>
                    <SelectItem value="300-500">₹300 - ₹500</SelectItem>
                    <SelectItem value="above-500">Above ₹500</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#262729]">
              {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? "s" : ""} Found
            </h2>
            {searchTerm && (
              <p className="text-[#262729]/70">
                Showing results for "{searchTerm}"
              </p>
            )}
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#262729] mb-2">
                No products found
              </h3>
              <p className="text-[#262729]/70 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setPriceRange("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
