import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import { data } from "react-router-dom";
import CartItem from "./CartItem";

function onIncrementComp(product1, product2) {
    if (product1.price > product2.price) {
        return 1;
    }
    else {
        return -1;
    }
}
function onDcrementComp(product1, product2) {
    if (product1.price < product2.price) {
        return 1;
    }
    else {
        return -1;
    }
}

function Home(props) {
     const [searchTerm,setSearchTerm] = useState("");
  const [productsArr,setProductsArr] = useState([]);
  const [sortDir,setSortDir] = useState(0);
  const [currCategory,setCurrCategory] = useState("All categories");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [allProducts, setAllProducts] = useState([]);
  
    

    function fetchProducts() {
        async function fn() {
            const response = await fetch("https://fakestoreapi.in/api/products")
            const productsdata = await response.json()
            setProductsArr(productsdata.products);
            setAllProducts(productsdata.products);
        }
        fn()
    }

    function fetchCategories() {
        async function fn() {
            const response = await fetch("https://fakestoreapi.in/api/products/category")
            const categoriesData = await response.json()
            setCurrCategory(categoriesData.categories);

        }
        fn();
    }

    useEffect(fetchProducts, [])
    useEffect(fetchCategories, [])

  useEffect(()=>{
    if(selectedCategory === "All"){
      setProductsArr(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter((product)=> product.category == selectedCategory);
    setProductsArr(filteredProducts);
  }, [selectedCategory])

    let filteredArr = productsArr
    if (searchTerm !== "") {
        filteredArr = filteredArr.filter((product) => {
            let lowerTitle = product.title.toLowerCase();
            let lowerSearcTerm = searchTerm.toLocaleLowerCase();
            if (lowerTitle.includes(lowerSearcTerm)) {
                return lowerTitle.includes(lowerSearcTerm)
            }
        })
    }

    let filteredSortedArr = filteredArr
    if (sortDir !== 0) {
        if (sortDir == 1) {
            filteredSortedArr = filteredSortedArr.sort(onIncrementComp);
        }
        else {
            filteredSortedArr = filteredSortedArr.sort(onDcrementComp)
        }
    }
function AddingToCart(Products){
    console.log(Products)
    SetCartProp([...cart,Products])
    SetIsClicked(true)
}

    return (
        <>
            <div className="w-full bg-blue">
                <NavBar secrchItem={searchTerm} SearchTermSet={setSearchTerm} Sorting={setSortDir}/>
                 <div className="bg-gray-500 h-10">
        {currCategory=="All categories"?"":
        <div className="flex justify-end items-center">
          <button className="border-2 mt-2 ml-4 pr-1 pl-1 rounded-lg" onClick={()=> setSelectedCategory("All")}>All Categories</button>
            {currCategory.map((category)=>{
             return <button className="border-2 w-auto mt-2 ml-10 pr-2 pl-1 rounded-lg" onClick={()=>setSelectedCategory(category)}>{category}</button>
            })}
          </div>}
       </div>
                <main className="flex flex-wrap justify-center min-w-65 gap-4">
                    {filteredArr == null ? <h1> page is loading</h1> :
                        filteredSortedArr.map((products, id) => {
                            return <CartItem Product = {products} id ={id}/>
                        })
                    }
                </main>
            </div>
        </>
    )
}

export default Home
