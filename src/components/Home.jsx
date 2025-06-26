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
    const {SetCartProp,cart} = props
    const [productsArr, setProductsArr] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDir, setSortDir] = useState(0);
    const [currCategory, setCurrCategory] = useState("All categories");
    const [categoriesList, setCategoriesList] = useState([]);
    

    function fetchProducts() {
        async function fn() {
            const response = await fetch("https://fakestoreapi.in/api/products")
            const productsdata = await response.json()
            setProductsArr(productsdata.products);
        }
        fn()
    }

    function fetchCategories() {
        async function fn() {
            const response = await fetch("https://fakestoreapi.in/api/products/categories")
            const categoriesData = await response.json()
            setCategoriesList(categoriesData)
        }
        fn();
    }

    useEffect(fetchProducts, [])
    useEffect(fetchCategories, [])



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
                <main className="flex flex-wrap justify-center min-w-65 gap-4">
                    {filteredArr == null ? <h1> page is loading</h1> :
                        filteredSortedArr.map((products, id) => {
                            return <CartItem Product = {products} id ={id} setCartProp={SetCartProp}/>
                        })
                    }
                </main>
            </div>
        </>
    )
}

export default Home
