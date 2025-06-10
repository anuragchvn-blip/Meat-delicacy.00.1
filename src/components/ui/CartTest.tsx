import { useCart } from "../../contexts/CartContext";
import { productCategories } from "../../data/products";
import { Button } from "./button";

export const CartTest = () => {
  const { cartItems, addToCart, getTotalItems, clearCart, setIsCartOpen } =
    useCart();

  const testProduct = productCategories[0]?.products[0]; // Pork Lard

  return (
    <div className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">🛒 Cart Test</h3>
      <div className="text-sm space-y-2">
        <p>Items in cart: {getTotalItems()}</p>
        <p>Cart length: {cartItems.length}</p>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => {
              if (testProduct) {
                addToCart(testProduct, 1, "1kg");
                console.log("✅ Added test product to cart");
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1"
          >
            Add Test Item
          </Button>

          <Button
            onClick={() => {
              setIsCartOpen(true);
              console.log("👀 Opening cart sidebar");
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1"
          >
            Open Cart
          </Button>

          <Button
            onClick={() => {
              clearCart();
              console.log("🗑️ Cleared cart");
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
          >
            Clear
          </Button>
        </div>

        {cartItems.length > 0 && (
          <div className="mt-2 text-xs">
            <p className="font-semibold">Cart contents:</p>
            {cartItems.map((item, index) => (
              <div key={item.id} className="text-xs">
                {index + 1}. {item.product.name} x{item.quantity}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
