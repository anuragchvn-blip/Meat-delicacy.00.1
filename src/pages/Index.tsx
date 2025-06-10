import React from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroForm } from "@/components/ui/hero-form";
import { productCategories } from "@/data/products";
import { getFeaturedBlogs } from "@/data/blogs";
import {
  Star,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  Calendar,
  User,
  Search,
  ShoppingCart,
} from "lucide-react";

export default function Index() {
  const featuredBlogs = getFeaturedBlogs(3);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navigation />

      {/* Hero Section with Ordering Form */}
      <main className="pt-20 bg-brand-dark">
        <section className="relative">
          {/* Background Gradient Overlay */}
          <div
            className="absolute bottom-0 left-1/2 h-full w-3/5 z-10"
            style={{
              background:
                "linear-gradient(270.63deg, rgba(38, 38, 38, 0) 0.5%, rgb(38, 38, 38) 50.75%, rgba(38, 38, 38, 1) 101%)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Background Image */}
          <div className="relative">
            <div className="h-[650px]">
              <img
                src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/home-banner.webp"
                alt="banner figure"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="max-w-[1232px] mx-auto px-3 w-full">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full lg:w-7/12 ml-auto px-3 flex-shrink-0 max-w-full">
                  <div className="relative text-center z-10">
                    <h1 className="text-brand-cream/50 font-['Oswald'] text-lg md:text-2xl font-medium leading-7 md:leading-9 mb-2 text-center uppercase">
                      Delivered at your door step
                    </h1>
                    <h2
                      className="font-['Oswald'] text-6xl md:text-8xl lg:text-[130px] font-bold leading-tight md:leading-[146px] text-center uppercase"
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
                    <div className="w-full max-w-[440px] mx-auto -mt-8 md:-mt-[92.8px] text-center">
                      <img
                        src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc-banner.png"
                        alt="banner meat"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ordering Form */}
              <div className="flex flex-wrap -mx-3 mt-8">
                <div className="w-full px-3">
                  <HeroForm className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="bg-brand-dark py-20">
          <div className="max-w-[1232px] mx-auto px-3">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-4 w-full px-3">
              <div>
                <h2
                  className="font-['Oswald'] text-5xl font-semibold tracking-wide leading-[67.2px] mb-4 uppercase"
                  style={{
                    background:
                      "linear-gradient(90.01deg, rgb(248, 227, 201) 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Our products
                </h2>
                <p className="text-white/60 font-medium leading-5">
                  Find your favourite cuts, delivered fast with special offers
                  you won't want to miss.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2.5 text-brand-cream font-bold"
              >
                <span>View all</span>
                <ArrowRight className="w-5 h-3" />
              </a>
            </div>

            {/* Product Categories Tabs */}
            <div className="flex items-center justify-between mb-4 w-full px-3">
              <ul className="flex flex-wrap gap-5" role="tablist">
                {productCategories.map((category, index) => (
                  <li key={category.id} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      className={`px-4 py-2 font-bold relative transition-all duration-150 ${
                        index === 0
                          ? "bg-red-600 text-brand-cream"
                          : "bg-gray-900 text-gray-400"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1.5">
                <span className="text-white/60">Sort by:</span>
                <select className="bg-transparent text-brand-cream font-bold text-sm border-none">
                  <option value="popular">Popular</option>
                  <option value="most-rated">Most Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="mt-12 px-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {productCategories[0].products.slice(0, 8).map((product) => (
                  <Card
                    key={product.id}
                    className="bg-transparent border-none text-white flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-6 right-0 bg-red-600 text-white font-['Oswald'] text-xs font-bold tracking-wide px-2 py-2 z-10 uppercase">
                        {product.category}
                      </div>
                    </div>
                    <CardContent className="flex-grow pt-4">
                      <h5 className="text-white text-lg font-bold leading-6 mb-1">
                        {product.name}
                      </h5>
                      <p className="text-white/60 text-sm leading-5 mb-2">
                        {product.weight}
                      </p>
                    </CardContent>
                    <div className="flex items-center justify-between mt-2 px-6 pb-6">
                      <div className="font-bold">
                        <span className="text-white text-xl font-bold leading-7">
                          ₹{product.price}/-
                        </span>
                        {product.originalPrice && (
                          <span className="text-red-600 font-bold leading-5 ml-2">
                            <strike>₹{product.originalPrice}/-</strike>
                          </span>
                        )}
                      </div>
                      <Button className="bg-brand-cream text-brand-dark font-bold text-sm uppercase px-6 py-2 hover:bg-brand-cream-dark transition-all duration-300">
                        Add
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="bg-[#FCF3E8] py-20">
          <div className="max-w-[1232px] mx-auto px-3">
            <div className="flex items-end justify-between mb-4 w-full px-3">
              <h2 className="text-red-600 font-['Oswald'] text-5xl font-semibold tracking-wide leading-[67.2px] uppercase">
                Bestsellers
              </h2>
              <a
                href="#"
                className="flex items-center gap-2.5 text-red-600 font-bold"
              >
                <span>View all</span>
                <ArrowRight className="w-5 h-3" />
              </a>
            </div>

            {/* Bestsellers Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex gap-5">
                {productCategories[2].products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-[389px]">
                    <Card className="bg-white flex flex-col h-full">
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-6 right-0 bg-red-600 text-white font-['Oswald'] text-xs font-bold tracking-wide px-2 py-2 z-10 uppercase">
                          Best Sellers
                        </div>
                      </div>
                      <CardContent className="flex-grow pt-4">
                        <h5 className="text-gray-900 text-lg font-bold leading-6 mb-1">
                          {product.name}
                        </h5>
                        <p className="text-gray-600 text-sm leading-5 mb-2">
                          {product.weight}
                        </p>
                      </CardContent>
                      <div className="flex items-center justify-between mt-2 px-6 pb-6">
                        <div className="font-bold">
                          <span className="text-gray-900 text-xl font-bold leading-7">
                            ₹{product.price}/-
                          </span>
                          {product.originalPrice && (
                            <span className="text-red-600 font-bold leading-5 ml-2">
                              <strike>₹{product.originalPrice}/-</strike>
                            </span>
                          )}
                        </div>
                        <Button className="bg-red-600 text-white font-bold text-sm uppercase px-6 py-2 hover:bg-red-700">
                          Add
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Banner */}
            <div className="mt-20 px-3">
              <div className="bg-red-600 text-white grid grid-cols-[645px_1fr] items-center px-11 relative">
                <div>
                  <h3 className="font-['Oswald'] text-4xl font-bold leading-12 mb-4 uppercase">
                    fast, reliable and fresh quality pork delivered at your
                    doorstep!
                  </h3>
                  <p className="text-white/70 font-medium max-w-[330px]">
                    Enjoy hassle-free home delivery straight from the farm to
                    your kitchen.
                  </p>
                </div>
                <div className="h-[287px] -mt-9 text-right">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/delivery-boy.png"
                    alt="delivery boy"
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pork Anatomy Interactive Section */}
        <section className="bg-[#FCF3E8] py-20">
          <div className="max-w-[1232px] mx-auto px-3">
            <div className="grid grid-cols-[1fr_340px] gap-15">
              <div className="flex flex-col gap-4">
                <div className="max-w-[800px] flex items-center">
                  <div className="relative">
                    <img
                      src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/front.png"
                      className="max-w-full transition-opacity duration-300"
                      alt="Pork anatomy front"
                    />
                    {/* Interactive dots */}
                    <div className="absolute top-2/5 left-[100px] w-4 h-4 bg-green-600 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="relative -left-px -top-4">
                    <img
                      src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/middle.png"
                      className="max-w-full transition-opacity duration-300"
                      alt="Pork anatomy middle"
                    />
                    <div className="absolute bottom-[-5px] left-[19%] w-4 h-4 bg-green-600 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="relative -left-px -top-4">
                      <img
                        src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/middle-top.png"
                        className="max-w-full transition-opacity duration-300"
                        alt="Pork anatomy middle top"
                      />
                      <div className="absolute top-[28%] left-[60%] w-4 h-4 bg-green-600 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="relative -left-1">
                    <img
                      src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/back.png"
                      className="max-w-full transition-opacity duration-300"
                      alt="Pork anatomy back"
                    />
                    <div className="absolute top-[35%] left-[10%] w-4 h-4 bg-green-600 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="min-h-[200px] relative">
                <div className="flex items-center justify-center h-full bg-red-600/20 border text-gray-600 font-medium px-10 text-center">
                  <p>Click on the image to view the products</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                From Our Kitchen
              </h2>
              <p className="text-xl text-gray-600">
                Expert tips, recipes, and insights from our culinary team
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publishDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-dark transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {post.readTime}
                      </span>
                      <Button
                        variant="ghost"
                        className="text-brand-dark hover:text-brand-dark-secondary p-0"
                      >
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-8"
              >
                View All Articles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="bg-brand-dark py-20">
          <div className="max-w-[1232px] mx-auto px-3">
            <div className="text-center mb-2 w-full px-3">
              <h2
                className="font-['Oswald'] text-5xl font-semibold tracking-wide leading-[67.2px] mb-4 text-center uppercase"
                style={{
                  background:
                    "linear-gradient(90.01deg, rgb(248, 227, 201) 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                What our customers have to say
              </h2>
            </div>

            {/* Testimonials Carousel */}
            <div className="overflow-hidden relative touch-pan-y z-10">
              <div className="flex">
                {[
                  {
                    name: "Priya S",
                    text: "The freshness of the meat here is unmatched! Every order I've received has been incredibly tender and flavorful. It's like it just came straight from the farm. I've stopped buying from anywhere else—this is my go-to for fresh pork!",
                  },
                  {
                    name: "Arjun M",
                    text: "If you're looking for quality pork and delicious sausages, this is the place. The sausages are perfectly spiced and juicy, and the pork is always fresh. It's so convenient to order and have it delivered to my doorstep.",
                  },
                  {
                    name: "Neha R",
                    text: "The pork here is 100% organic, and you can taste the difference! Every cut is so flavorful and juicy. From roasts to sausages, everything I've tried has been exceptional. Hands down, the best place for pork and pork items!",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[1018px] flex items-center justify-center"
                  >
                    <div className="bg-gray-800 px-10 py-12">
                      <div className="flex items-center gap-4 text-white/70 font-semibold mb-4">
                        <User className="w-4 h-4" />
                        <span>{testimonial.name}</span>
                      </div>
                      <blockquote className="text-white leading-5 relative">
                        <p className="font-medium text-lg leading-6 pt-2">
                          {testimonial.text}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-brand-dark">
          <div className="max-w-[1232px] mx-auto px-3">
            <div className="flex justify-between py-10 px-3">
              <div className="flex gap-10 text-white">
                <a
                  href="tel: +918123959702"
                  className="text-sm font-semibold leading-5"
                >
                  +91-8123959702
                </a>
                <a
                  href="mailto: support@meatdelicacy.com"
                  className="text-sm font-semibold leading-5"
                >
                  support@meatdelicacy.com
                </a>
              </div>
              <div className="flex items-center gap-5">
                <h6 className="text-white text-sm font-semibold leading-5">
                  Follow Us
                </h6>
                <a href="#" className="text-blue-600 underline">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/facebook.svg"
                    alt="Facebook"
                  />
                </a>
                <a href="#" className="text-blue-600 underline">
                  <img
                    src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/instagram.svg"
                    alt="Instagram"
                  />
                </a>
              </div>
            </div>

            <ul className="flex justify-center gap-[70px] border-t border-brand-cream/40 py-9 px-3">
              <li>
                <a
                  href="#"
                  className="text-white text-sm font-semibold leading-5"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm font-semibold leading-5"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm font-semibold leading-5"
                >
                  Term & Condition
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm font-semibold leading-5"
                >
                  Refund & Return Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-sm font-semibold leading-5"
                >
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 text-white font-semibold py-4 text-center">
            <p className="text-sm font-semibold leading-5">
              Copyright © 2024 Meat Delicacy
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
