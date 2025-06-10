import { useCart } from "../../contexts/CartContext";
import { Button } from "./button";

export const CartVisibilityTest = () => {
  const { isCartOpen, setIsCartOpen, cartItems, addToCart } = useCart();

  const forceOpenCart = () => {
    console.log("Force opening cart...");
    setIsCartOpen(true);
  };

  const forceCloseCart = () => {
    console.log("Force closing cart...");
    setIsCartOpen(false);
  };

  return (
    <div className="fixed top-20 left-4 bg-red-600 text-white p-4 rounded-lg z-[9999] max-w-xs">
      <h3 className="font-bold mb-2">Cart Visibility Test</h3>
      <div className="text-xs space-y-1 mb-3">
        <div>Cart Open: {isCartOpen ? "TRUE" : "FALSE"}</div>
        <div>Cart Items Count: {cartItems.length}</div>
      </div>
      <div className="space-y-2">
        <Button
          onClick={forceOpenCart}
          className="w-full bg-green-600 hover:bg-green-700 text-xs py-1"
          size="sm"
        >
          Force Open Cart
        </Button>
        <Button
          onClick={forceCloseCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-xs py-1"
          size="sm"
        >
          Force Close Cart
        </Button>
      </div>

      {/* Directly render cart state indicator */}
      <div className="mt-3 p-2 bg-black/50 rounded text-xs">
        {isCartOpen && (
          <div className="text-green-400">✓ Cart should be visible</div>
        )}
        {!isCartOpen && (
          <div className="text-red-400">✗ Cart should be hidden</div>
        )}
      </div>
    </div>
  );
};
