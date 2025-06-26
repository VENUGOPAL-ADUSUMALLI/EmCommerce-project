import { useEffect,useState } from "react"

function onIncrementComp(product1,product2){
  if(product1.price > product2.price){
    return 1
  }else{
    return -1
  }
}

function onDecrementComp(product1,product2){
  if(product1.price < product2.price){
    return 1
  }else{
    return -1
  }
}




function Dummy() {
  
  const [searchTerm,setSearchTerm] = useState("");
  const [productsArr,setProductsArr] = useState(null);
  const [sortDir,setSortDir] = useState(0);
  const [currCategory,setCurrCategory] = useState("All categories");
  
  /**
   * I create a state varible which tells us which sorting to be happend
   * 0 -> unsorted
   * 1 -> increasing order along with price detials
   * -1 -> decreasing order with price detials
   */

  function handleInput(e){
    setSearchTerm(e.target.value);
  }


   function fetchProducts(){
    async function fn() {
      const response = await fetch("https://fakestoreapi.in/api/products");
      const productsData = await response.json();
      //console.log(productsData.products)
      setProductsArr(productsData.products);
    }
    fn()
  }

  function fetchCategories(){
    async function fn() {
      const response = await fetch("https://fakestoreapi.in/api/products/category");
      const categoriesData = await response.json();
     // console.log(categoriesData.categories)
      setCurrCategory(categoriesData.categories);
    }
    fn();
  }

  useEffect(fetchProducts,[]);

  useEffect(fetchCategories,[]);

// searching is all about hiding the unwanted elements
let filteredArr = productsArr;// copy os state variable

if(searchTerm!==""){
  filteredArr= filteredArr.filter((product)=>{
    let lowerTitle = product.title.toLowerCase();
    let lowerSearchTerm = searchTerm.toLowerCase(); 
    return lowerTitle.includes(lowerSearchTerm);
  })
}

let filteredSortedArr = filteredArr;
// sorting is always rearranging the elements
if(sortDir!==0){
  if(sortDir==1){
      filteredSortedArr = filteredSortedArr.sort(onIncrementComp)
  }else{
    filteredSortedArr = filteredSortedArr.sort(onDecrementComp)
  }
}


  return (
    <div>
      <header className="flex justify-center w-full h-[30px] bg-neutral-800">
        <input 
        className="w-80 p-3 border-1 bg-gray-300 rounded-lg"
        type="text"
        value={searchTerm}
        placeholder="Search For Products" 
        onChange={handleInput}
        />
        <div className="flex ml-3 items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={()=>{setSortDir(1)}} className="size-7 mr-2 bg-white rounded-2xl">
             <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={()=>{setSortDir(-1)}} className="size-7 ml-2 bg-white rounded-2xl">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
          </svg>
        </div>
      </header>
       <div className="bg-gray-500 h-10">
        {currCategory=="All categories"?"":
        <div className="flex justify-end items-center">
          <button className="border-1 mt-2 ml-4 pr-1 pl-1 rounded-lg">All Categories</button>
            {currCategory.map((category)=>{
             return <button className="border-1 mt-2 ml-4 pr-1 pl-1 rounded-lg">{category}</button>
            })}
          </div>}
       </div>
       
      <main className="flex flex-wrap justify-center min-w-60">
        {filteredArr == null?<h1>Loading..</h1>:
          filteredArr.map((product,id)=>{
           return <div className="border-1 m-1 w-62 p-2 text-center mt-9 rounded-2xl" key={product.id} >
              <img className="size-60 mt-2" src={product.image} alt="product_img"/>
              <div >
                <h3 className="mt-2">{product.title}</h3>
                <h5 className="mt-3">${product.price}</h5>
              </div>
            </div>
          })}
        
      </main>
    </div>
  )
}

export default Dummy