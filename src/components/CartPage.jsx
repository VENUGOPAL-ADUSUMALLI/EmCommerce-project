import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    setCart(cartItems ? JSON.parse(cartItems) : []);
  }, []);

  function cartEmpty() {
    localStorage.removeItem("cartItems");
    setCart([]); // Update state to trigger re-render
  }

  return (
    <>
      <NavBar />
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">🛒 Your Cart</h2>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-6 px-4">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-center items-center border border-gray-300 shadow-md w-72 p-4 rounded-2xl bg-white hover:shadow-lg transition duration-300"
            >
              <img
                className="w-60 h-60 object-contain mt-2"
                src={product.image}
                alt={product.title}
              />
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <h5 className="mt-2 text-green-600 font-medium text-lg">₹ {product.price}</h5>
                <p className="mt-1 text-gray-700 font-medium">Count: {product.count}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-6">Your cart is empty.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            onClick={cartEmpty}
          >
            🗑️ Empty Cart
          </button>
        </div>
      )}
    </>
  );
}

export default CartPage;
