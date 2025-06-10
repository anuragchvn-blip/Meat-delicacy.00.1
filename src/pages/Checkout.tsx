import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";
import { Navigation } from "../components/ui/navigation";
import { Footer } from "../components/ui/Footer";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: user?.phone || "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "",
    timeSlot: "",
    specialInstructions: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create order
      const orderItems = cartItems.map((item) => ({
        productId: item.product.id.toString(),
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        weight: item.selectedWeight || "1kg",
      }));

      const orderData = {
        items: orderItems,
        totalAmount: getTotalPrice(),
        deliveryAddress: {
          id: Date.now().toString(),
          label: "Home",
          fullAddress: `${formData.address}, ${formData.city}`,
          pincode: formData.pincode,
          city: formData.city,
          isDefault: true,
        },
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
        },
        paymentMethod: formData.paymentMethod,
        timeSlot: formData.timeSlot,
        specialInstructions: formData.specialInstructions,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        alert("Order placed successfully! We'll contact you soon.");
        navigate("/");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#262729]">
        <Navigation />
        <div className="pt-20 flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-white text-2xl mb-4">Your cart is empty</h2>
          <Button
            onClick={() => navigate("/")}
            className="bg-brand-cream text-[#303132] font-bold"
          >
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#262729]">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-brand-cream text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <div className="bg-[#363739] p-6 rounded-lg">
              <h2 className="text-brand-cream text-xl font-bold mb-6">
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="bg-[#262729] border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="bg-[#262729] border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-[#262729] border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-[#262729] border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">
                    Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-[#262729] border-gray-600 text-white"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="bg-[#262729] border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-white">
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) =>
                        handleInputChange("pincode", e.target.value)
                      }
                      className="bg-[#262729] border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Delivery Time Slot *</Label>
                  <Select
                    value={formData.timeSlot}
                    onValueChange={(value) =>
                      handleInputChange("timeSlot", value)
                    }
                  >
                    <SelectTrigger className="bg-[#262729] border-gray-600 text-white">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12:00 PM to 03:00 PM">
                        12:00 PM to 03:00 PM
                      </SelectItem>
                      <SelectItem value="04:00 PM to 08:00 PM">
                        04:00 PM to 08:00 PM
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      handleInputChange("paymentMethod", value)
                    }
                  >
                    <SelectTrigger className="bg-[#262729] border-gray-600 text-white">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="instructions" className="text-white">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    value={formData.specialInstructions}
                    onChange={(e) =>
                      handleInputChange("specialInstructions", e.target.value)
                    }
                    className="bg-[#262729] border-gray-600 text-white"
                    rows={3}
                    placeholder="Any special instructions for delivery..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-cream text-[#303132] font-bold text-lg py-3 hover:bg-brand-cream/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Placing Order..." : "Place Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-[#363739] p-6 rounded-lg h-fit">
              <h2 className="text-brand-cream text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">
                        {item.product.name}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {item.selectedWeight || "1kg"} × {item.quantity}
                      </p>
                      <p className="text-brand-cream font-bold">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 mt-6 pt-4">
                <div className="flex justify-between items-center text-xl">
                  <span className="text-brand-cream font-bold">Total:</span>
                  <span className="text-brand-cream font-bold">
                    ₹{getTotalPrice()}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#C72C41]/20 rounded border border-[#C72C41]/40">
                <p className="text-brand-cream text-sm">
                  🚀 90-minute delivery within 5km radius
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
