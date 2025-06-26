import React from 'react'
import { Link } from 'react-router-dom';
function NavBar(props) {
    let {secrchItem,SearchTermSet,Sorting} = props;
  return (
    <div>
          <header className="flex justify-center w-full h-[70px] bg-netural-800 bg-black">
                    <div>
                        <input placeholder="search for products" className="mt-3 w-80 p-3 border-1 bg-gray-300 rounded-lg" type="text" value={secrchItem} onChange={(e) => SearchTermSet(e.target.value)} />
                    </div>
                    <div className="flex ml-3 items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => {Sorting(1) }} className="size-9 mr-2 mt-2  bg-white rounded-2xl">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => {Sorting(-1) }} className="size-9 ml-2 mt-2 bg-white rounded-2xl">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                        </svg>
                        <Link to="/cart">
                        <div className="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  className="size-9 ml-2 mt-2  bg-white rounded-2xl">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        </div>
                        </Link>

                    </div>
                </header>
    </div>
  )
}

export default NavBar