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
    <div className="flex flex-col justify-center items-center border-1 m-1 w-72 p-2 text-center mt-9 rounded-2xl " key={Product.id}>
        <img className="size-60 mt-2" src={Product.image} />
        <div>
            <h3 className="mt-2 text-lg"> {Product.title}</h3>
            <h5 className="mt-5 text-lg ">{Product.price} </h5>
        </div>
        {count !== 0 ? <>
            <button onClick={AddingToCart}>Increment</button>
            <p>{count}</p>
            <button onClick={DecrementCart}>Decrement</button>
        </> :
        <div className="mt-2 border-2 rounded-xl w-max p-1" onClick={AddingToCart}>
            <button> Add to cart</button>
        </div>
}
    </div>
    </>
  )
}

export default CartItem