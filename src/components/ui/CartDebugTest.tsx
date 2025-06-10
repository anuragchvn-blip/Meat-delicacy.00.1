import { useCart } from "../../contexts/CartContext";
import { productCategories } from "../../data/products";
import { Button } from "./button";

export const CartDebugTest = () => {
  const {
    cartItems,
    addToCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Get first product for testing
  const testProduct = productCategories[0]?.products[0];

  const handleTestAdd = () => {
    if (testProduct) {
      console.log("Testing add to cart with product:", testProduct);
      addToCart(testProduct, 1, "1kg");
    }
  };

  const handleOpenCart = () => {
    console.log("Opening cart manually");
    setIsCartOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-xs z-[9999]">
      <h3 className="font-bold mb-2">Cart Debug</h3>
      <div className="text-xs space-y-1">
        <div>Items: {getTotalItems()}</div>
        <div>Total: ₹{getTotalPrice()}</div>
        <div>Cart Open: {isCartOpen ? "Yes" : "No"}</div>
        <div>Cart Items:</div>
        <div className="max-h-20 overflow-y-auto text-xs">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div key={idx}>
                {item.product.name} x{item.quantity}
              </div>
            ))
          ) : (
            <div>Empty</div>
          )}
        </div>
      </div>
      <div className="space-y-2 mt-2">
        <Button
          onClick={handleTestAdd}
          className="w-full bg-green-600 hover:bg-green-700 text-xs py-1"
          size="sm"
        >
          Test Add
        </Button>
        <Button
          onClick={handleOpenCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-xs py-1"
          size="sm"
        >
          Open Cart
        </Button>
        <Button
          onClick={clearCart}
          className="w-full bg-red-600 hover:bg-red-700 text-xs py-1"
          size="sm"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
