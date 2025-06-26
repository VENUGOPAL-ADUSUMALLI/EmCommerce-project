    import React from 'react'
    import NavBar from './NavBar';
    import { useEffect } from 'react';
    function CartPage() {
    
    let cart=localStorage.getItem("cartItems")
    cart=JSON.parse(cart);
    console.log(cart)
    return (
        <>   
        <NavBar/>
        <div className='flex flex-wrap gap-10 justify-center'>
    {cart.map((product)=>{
        return(
            <div className="flex flex-col justify-center items-center border-1 m-1 w-72 p-2 text-center mt-9 rounded-2xl "> 
            <img className="size-60 mt-2" src={product.image} />
                <div>
                    <h3 className="mt-2 text-lg"> {product.title}</h3>
                    <h5 className="mt-5 text-lg ">{product.price} </h5>
                    <h1>Count: {product.count}</h1>
                    </div>
        </div>
        )

        
    })}
    </div>
    {/* <div>
        <button  className="mt-2 border-2 rounded-xl w-max p-1" onClick={cartEmpty}> Make Cart empty</button>
    </div> */}
    </>

    )
    }

    export default CartPage