import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page,setPage] = useState(2);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products/?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  // console.log(products);
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage)=>{
    if(selectedPage>1 && selectedPage<=products.length/10 && selectedPage !== page)
    setPage(selectedPage);
  }

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page*10-10,page*10).map((prod) => {
            return (
              <span className="prod__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {
            products.length>0&&<div className="pagination">
              <span 
              className={page > 1 ? "":"pagination_disable"}
              onClick={()=>selectPageHandler(page-1)}>👈</span>{
                [...Array(products.length/10)].map((_,i)=>{
                  return <span 
                  className={page===i+1?"pagination_selected":""}
                  onClick={()=>selectPageHandler(i+1)} key={i}>{i+1}</span>

                })
              } 
              <span 
              className={page < products.length /10 ? "":"pagination_disable"}
              onClick={()=>selectPageHandler(page+1)}>👉</span>

            </div>
          }
    </div>
  );
}
