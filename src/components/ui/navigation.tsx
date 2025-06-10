import React, { useState } from "react";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Cart } from "./Cart";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems, cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = getTotalItems();

  // Debug log cart state
  React.useEffect(() => {
    console.log(
      "Navigation - Cart count:",
      cartCount,
      "Cart items:",
      cartItems,
    );
  }, [cartCount, cartItems]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark-secondary/95 backdrop-blur-md border-b border-white/10">
      <nav className="relative">
        <div className="max-w-[1232px] mx-auto px-8 lg:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc.svg"
                  alt="Meat Delicacy logo"
                  className="h-14 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex items-center gap-12">
                <li>
                  <a
                    href="/"
                    className="text-white/90 font-semibold py-2 px-4 hover:text-brand-cream transition-colors duration-150 relative"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-white/90 font-semibold py-2 px-4 hover:text-brand-cream transition-colors duration-150 relative"
                  >
                    Our Products
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-white/90 font-semibold py-2 px-4 hover:text-brand-cream transition-colors duration-150 relative"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Desktop Cart & Auth */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => {
                  console.log("Opening cart with items:", cartItems);
                  setIsCartOpen(true);
                }}
                className="relative flex items-center gap-1 text-white/90 font-semibold hover:text-brand-cream transition-colors duration-150"
              >
                <ShoppingCart
                  className="w-5 h-5"
                  stroke="#F8E3C9"
                  strokeWidth={1.2}
                />
                <span className="font-bold ml-1">Cart</span>
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#C72C41] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                    {cartCount}
                  </div>
                )}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-brand-cream text-brand-dark font-bold text-sm uppercase px-4 py-2.5 rounded hover:bg-brand-cream-dark transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    {user.phone}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-48 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-gray-800">
                          {user.name || user.phone}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-brand-cream text-brand-dark font-bold text-sm uppercase px-6 py-2.5 hover:bg-brand-cream-dark transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1 text-white/90 font-semibold"
              >
                <ShoppingCart
                  className="w-4 h-4"
                  stroke="#F8E3C9"
                  strokeWidth={1.2}
                />
                <span className="font-bold text-xs">Cart</span>
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-brand-cream text-brand-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </div>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 text-brand-cream"
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden transition-all duration-300 overflow-hidden",
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="py-4 border-t border-white/10">
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="block text-white/90 font-semibold py-3 px-4 hover:text-brand-cream hover:bg-white/5 rounded transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="block text-white/90 font-semibold py-3 px-4 hover:text-brand-cream hover:bg-white/5 rounded transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Our Products
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="block text-white/90 font-semibold py-3 px-4 hover:text-brand-cream hover:bg-white/5 rounded transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </a>
                </li>
                <li className="pt-2">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-white/70 text-sm">
                        Welcome, {user.name || user.phone}
                      </div>
                      <Button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-brand-cream text-brand-dark font-bold text-sm uppercase hover:bg-brand-cream-dark"
                    >
                      Login
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
