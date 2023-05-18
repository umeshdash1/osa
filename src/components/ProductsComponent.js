import { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from "react-router-dom"
import { DetailsComponent } from "./DetailsComponent";
import { useCookies} from "react-cookie";


export function ProductsComponent(){
    
    const [categoryname, setCategoryName] = useState();
    const [products, setProducts] = useState([]);
    const [user, setUser]= useState();
    const params = useParams();
    const [cookies] = useCookies();
    let navigate = useNavigate();
    useEffect(()=>{
       if(cookies["username"]==undefined){
          navigate("/login");
       } else {
        setUser(cookies["username"]);
        setCategoryName(params.category);
        fetch(`http://fakestoreapi.com/products/category/${params.category}`)
        .then(response => response.json())
        .then(data=> {
           setProducts(data);
           console.log(data);
        })
       }
    },[])
    return(
        <div>
            <h2> {categoryname} Products - {user}</h2>
            <div>
                {
                    products.map(product=>
                            <Link to={'/details/' + product.id} key={product.id}><img key={product.id} src={product.image} width="100" height="100" className="m-2 p-2" border="1" /></Link>
                        )
                }
            </div>
            <Link to="/categories">Back to Categories</Link>
        </div>
    )
}