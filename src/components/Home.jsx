import { useEffect, useState } from "react"

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

function Home() {
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

    return (
        <>
            <div className="w-full bg-blue">
                <header className="flex justify-center w-full h-[70px] bg-netural-800 bg-black">
                    <div>
                        <input placeholder="search for products" className="mt-3 w-80 p-3 border-1 bg-gray-300 rounded-lg" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex ml-3 items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => { setSortDir(1) }} className="size-9 mr-2 mt-2  bg-white rounded-2xl">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => { setSortDir(-1) }} className="size-9 ml-2 mt-2 bg-white rounded-2xl">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </header>


                <main className="flex flex-wrap justify-center min-w-65 gap-4">
                    {filteredArr == null ? <h1> page is loading</h1> :
                        filteredSortedArr.map((products, id) => {
                            return <div className="border-1 m-1 w-72 p-2 text-center mt-9 rounded-2xl " key={products.id}>
                                <img className="size-60 mt-2" src={products.image} />
                                <div>
                                    <h3 className="mt-2 text-lg"> {products.title}</h3>
                                    <h5 className="mt-5 text-lg ">{products.price} </h5>
                                </div>
                            </div>
                        })
                    }
                </main>
            </div>
        </>
    )
}

export default Home
