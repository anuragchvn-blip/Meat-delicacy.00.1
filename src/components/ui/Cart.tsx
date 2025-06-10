import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useCart } from "../../contexts/CartContext";
import { X, Minus, Plus } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  // Debug log when cart opens
  useEffect(() => {
    if (isOpen) {
      console.log("Cart opened, current items:", cartItems);
    }
  }, [isOpen, cartItems]);

  const handleQuantityChange = (
    itemId: number,
    action: "increment" | "decrement",
  ) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      if (action === "increment") {
        updateQuantity(itemId, item.quantity + 1);
      } else if (action === "decrement") {
        if (item.quantity > 1) {
          updateQuantity(itemId, item.quantity - 1);
        } else {
          removeFromCart(itemId);
        }
      }
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[627px] bg-[#262729] z-[1045] transform transition-transform duration-300 ease-in-out overflow-y-auto border-l border-[#212529] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-600">
            <h3 className="text-brand-cream font-oswald text-3xl font-medium uppercase">
              your cart ({cartItems.length})
            </h3>
            <button
              onClick={onClose}
              className="text-brand-cream hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 p-5">
            {cartItems.length > 0 ? (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[112px_1fr] gap-5 text-white"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 z-10"></div>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-28 object-cover transition-transform duration-500 ease-in-out"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col">
                        <h5 className="text-brand-cream font-bold leading-5 mb-1">
                          {item.product.name}
                        </h5>
                        <p className="text-white/60 text-xs leading-4 flex-grow">
                          {item.selectedWeight || "1kg"}
                        </p>
                        <input
                          type="hidden"
                          name={`kgs_or_gramss_${item.product.id}`}
                          value={item.selectedWeight || "1kg"}
                        />

                        <div className="flex justify-between items-center mt-2">
                          {/* Price */}
                          <div className="font-bold">
                            <span className="text-white leading-5">
                              ₹
                              {(item.product.discountPrice ||
                                item.product.price) * item.quantity}
                              /-
                            </span>
                            {item.product.discountPrice && (
                              <span className="text-[#C72C41] text-xs font-bold leading-4 ml-2">
                                <strike>
                                  ₹{item.product.price * item.quantity}/-
                                </strike>
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-center">
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleQuantityChange(item.id, "decrement");
                              }}
                              href="#"
                              className="bg-[#E2D1BB] text-[#262729] w-6 h-6 flex items-center justify-center rounded-lg text-center hover:bg-[#D4C3A6] transition-colors"
                            >
                              <span className="leading-6 text-center">-</span>
                            </a>
                            <input
                              name="quantity"
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-12 h-5 text-center font-bold bg-transparent text-white border border-[#E2D1BB] mx-1"
                            />
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleQuantityChange(item.id, "increment");
                              }}
                              href="#"
                              className="bg-[#E2D1BB] text-[#262729] w-6 h-6 flex items-center justify-center rounded-lg text-center hover:bg-[#D4C3A6] transition-colors"
                            >
                              <span className="leading-6 text-center">+</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="flex flex-col items-center gap-3 text-center py-8">
                <img
                  src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/icons/cart/cart.svg"
                  alt="cart image"
                  className="mb-2 opacity-50"
                />
                <h5 className="text-brand-cream text-xl font-bold">
                  Your cart is empty
                </h5>
                <p className="text-[#A8A9A9] leading-5">
                  Check our variety of categories to find the right product for
                  you
                </p>
                <Button
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                  className="bg-brand-cream text-[#303132] font-bold text-sm capitalize hover:bg-brand-cream/90 transition-all duration-300 mt-2 w-72 py-3"
                >
                  Order now
                </Button>
              </div>
            )}
          </div>

          {/* Cart Footer - Only show when there are items */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-600 p-5">
              {/* Total Price */}
              <div className="flex justify-between items-center text-brand-cream text-3xl font-bold capitalize mb-4 pb-6 border-b border-[#494A4B]">
                <span>Total cart price</span>
                <span>
                  <span>₹</span>
                  <span>{getTotalPrice()}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-brand-cream text-[#303132] font-bold text-sm capitalize hover:bg-brand-cream/90 transition-all duration-300 py-3"
                >
                  Proceed to checkout
                </Button>
                <Button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clearCart();
                    }
                  }}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
