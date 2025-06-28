import React, { useEffect } from 'react'
import { useState } from 'react'
function CartItem(props) {
const {Product,id} = props
const [count, setCount] = useState(0);

function AddingToCart() {
    let cart = localStorage.getItem("cartItems");
    cart = cart ? JSON.parse(cart) : [];

    const existingProduct = cart.find((productItem) => productItem.id === Product.id);

    setCount(count + 1);

    if (!existingProduct) {
        const newProduct = { ...Product, count: 1 };
        const updatedCart = [...cart, newProduct];
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
        const updatedCart = cart.map((item) =>
            item.id === Product.id ? { ...item, count: item.count + 1 } : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

}

function DecrementCart(){
    if(count == 0){
        setCount(0)
    }

    let cart = localStorage.getItem("cartItems");
    cart = cart ? JSON.parse(cart) : [];

    setCount(count - 1);

    const updatedCart = cart.map((item) =>
            item.id === Product.id ? { ...item, count: item.count - 1 } : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    
}

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const item = cart.find((p) => p.id === Product.id);
    if (item) {
      setCount(item.count);
    }
  }, [Product.id]);

  
    
  return (
    <>
  <div
  className="flex flex-col justify-center items-center border border-gray-300 shadow-md m-2 w-72 p-4 text-center mt-9 rounded-2xl bg-white hover:shadow-lg transition duration-300"
  key={Product.id}
>
  <img className="w-60 h-60 object-contain mt-2" src={Product.image} alt={Product.title} />

  <div className="mt-3">
    <h3 className="text-lg font-semibold text-gray-800">{Product.title}</h3>
    <h5 className="mt-2 text-lg text-green-600 font-medium">₹ {Product.price}</h5>
  </div>

  {count !== 0 ? (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={AddingToCart}
        className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
      >
        +
      </button>
      <p className="text-lg font-bold">{count}</p>
      <button
        onClick={DecrementCart}
        className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
      >
        -
      </button>
    </div>
  ) : (
    <div
      className="mt-4 border-2 border-blue-500 rounded-xl px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition"
      onClick={AddingToCart}
    >
      <button>Add to cart</button>
    </div>
  )}
</div>
    </>
  )
}

export default CartItem