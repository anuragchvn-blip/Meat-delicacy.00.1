import { useCart } from "../../contexts/CartContext";
import { productCategories } from "../../data/products";
import { Button } from "./button";

export const CartDebug = () => {
  const { cartItems, addToCart, getTotalItems, clearCart } = useCart();

  const testProduct = productCategories[0]?.products[0];

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-black mb-2">Cart Debug</h3>
      <div className="text-black text-sm space-y-2">
        <p>Cart Items: {cartItems.length}</p>
        <p>Total Items: {getTotalItems()}</p>
        <div className="space-y-1">
          {cartItems.map((item) => (
            <div key={item.id} className="text-xs">
              {item.product.name} x{item.quantity}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (testProduct) {
                addToCart(testProduct, 1, "1kg");
                console.log("Added test product");
              }
            }}
            className="bg-blue-500 text-white text-xs px-2 py-1"
          >
            Add Test Item
          </Button>
          <Button
            onClick={() => {
              clearCart();
              console.log("Cleared cart");
            }}
            className="bg-red-500 text-white text-xs px-2 py-1"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
