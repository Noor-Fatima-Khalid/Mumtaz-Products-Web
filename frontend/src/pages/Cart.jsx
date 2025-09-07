import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  // Sample cart data (later we can plug into global state or backend)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Natural Chakki Ka Atta",
      price: 680,
      size: "5 KG",
      image: "https://via.placeholder.com/100",
      quantity: 1,
    },
    {
      id: 2,
      name: "Organic Brown Rice",
      price: 1200,
      size: "2 KG",
      image: "https://via.placeholder.com/100",
      quantity: 2,
    },
  ]);

  // Update quantity
  const updateQuantity = (id, newQty) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Total
  const estimatedTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-green-50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900 mb-2 sm:mb-0">
            Your cart
          </h1>
          
          <Link to="/products" className="text-sm text-amber-700 hover:underline self-start sm:self-auto">
            Continue shopping
          </Link>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="border-t border-b border-green-200 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src="haha.jpg"            //{item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover border rounded"
                />
                <div>
                  <h2 className="font-semibold text-lg text-green-900">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">Rs.{item.price}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                </div>
              </div>

              {/* Quantity + Price */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-2 hover:bg-green-100"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{item.quantity}</span>
                  <button
                    className="px-3 py-2 hover:bg-green-100"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={20} />
                </button>
                <p className="font-medium text-green-900">
                  Rs.{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Special Instructions */}
        {cartItems.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order special instructions
            </label>
            <textarea
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="3"
            ></textarea>
          </div>
        )}

        {/* Total Section */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-col items-end">
            <p className="text-lg font-semibold text-green-900">
              Estimated total Rs.{estimatedTotal.toFixed(2)} Pkr
            </p>
            <p className="text-sm text-gray-500">
              Taxes, discounts and shipping calculated at checkout.
            </p>

            <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-3 px-6 rounded shadow">
              Check out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
