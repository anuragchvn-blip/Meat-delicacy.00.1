import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCart } from "../../hooks/useCart";
import { productCategories } from "../../data/products";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const BestsellersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Get bestseller products (first 5 products from different categories)
  const bestsellerProducts = [
    productCategories[2]?.products[0], // Prime Bacon
    productCategories[2]?.products[2], // Mexican Chorizo
    productCategories[2]?.products[1], // Pepper Sausages
    productCategories[1]?.products[1], // Curry Cut Cubes(boneless)
    productCategories[1]?.products[0], // Curry Cut Cubes (with bone)
  ].filter(Boolean);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(bestsellerProducts.length / itemsPerSlide);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-[#FCF3E8] py-20">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3 flex items-end justify-between mb-4">
            <h2 className="text-[#C72C41] font-oswald text-5xl font-semibold tracking-wider leading-tight uppercase">
              Bestsellers
            </h2>
            <a
              href="/products"
              className="flex items-center gap-3 text-[#C72C41] font-bold hover:text-[#C72C41]/80 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out">
                {bestsellerProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="w-full md:w-1/3 flex-shrink-0 px-2"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                  >
                    <div className="bg-white text-[#262729] flex flex-col h-full">
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
                            Best Sellers
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-grow p-4">
                        <h5 className="text-lg font-bold leading-7 mb-1">
                          {product.name}
                        </h5>
                        <p className="text-[#262729]/64 text-sm">
                          {product.weight}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 pt-0">
                        <div className="font-bold">
                          <span className="text-xl leading-7 text-[#262729]">
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
                          className="bg-[#C72C41] text-white font-bold text-sm uppercase px-6 py-2 hover:bg-[#C72C41]/90 transition-all duration-300"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                {/* Pagination Dots */}
                <div className="flex gap-1">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index
                          ? "bg-[#C72C41]"
                          : "bg-[#262729]/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex gap-5">
                  <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-10 h-4 opacity-35 hover:opacity-100 transition-opacity"
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft className="w-5 h-3 fill-[#C72C41]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex items-center justify-center w-10 h-4 hover:opacity-80 transition-opacity"
                    style={{ transform: "scaleX(-1)" }}
                  >
                    <ChevronLeft className="w-5 h-3 fill-[#C72C41]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Banner */}
        <div className="flex flex-wrap -mx-3 pt-20">
          <div className="w-full">
            <div className="bg-[#C72C41] text-white grid grid-cols-1 lg:grid-cols-[2fr,1fr] items-center px-11 relative">
              <div>
                <h3 className="font-oswald text-4xl font-bold leading-12 mb-4 uppercase">
                  fast, reliable and fresh quality pork delivered at your
                  doorstep!
                </h3>
                <p className="text-white/72 font-medium max-w-[330px]">
                  Enjoy hassle-free home delivery straight from the farm to your
                  kitchen.
                </p>
              </div>
              <div className="h-72 text-right -mt-9">
                <img
                  src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/delivery-boy.png"
                  alt="delivery boy"
                  className="h-full inline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
