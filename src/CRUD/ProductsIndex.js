import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ProductsIndex(){
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    function GetProducts(){
        axios({
            method: "GET",
            url: "http://localhost:4000/products",
        })
        .then(response=>{
            setProducts(response.data);
        })
    }
    useEffect(()=>{
        GetProducts();
    },[])

    function handleDeleteClick(e){
        axios({
            method: "DELETE",
            url: `http://localhost:4000/delete/${e.currentTarget.value}`
        })
        
        alert("Record Deleted");
        navigate("/home");
    }

    return(
        <div className="container-fluid">
            <h2>Products Data</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.ProductId}>
                                <td>{product.Name}</td>
                                
                                <td>
                                    <Link to={'/productdetails/' + product.ProductId} className="btn btn-info me-2">
                                        <span className="bi bi-eye-fill"></span>
                                    </Link>
                                    <Link to={'/editproduct/' + product.ProductId} className="btn btn-warning me-2">
                                        <span className="bi bi-pen"></span>
                                    </Link>
                                    <button  onClick={handleDeleteClick} value={product.ProductId}  className="btn btn-danger">
                                        <span className="bi bi-trash"></span>
                                    </button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
            <div>
                <Link to="/registerproduct">Add New Product</Link>
            </div>
        </div>
    )
}