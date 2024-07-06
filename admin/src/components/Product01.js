import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product01 = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/products/all-products")
            .then(response => response.json())
            .then(data => {
                if (data.Status) {
                    setProducts(data.Result);
                    setLoading(false); // Data is loaded, set loading to false
                } else {
                    alert(data.Error);
                    setLoading(false); // Data fetching failed, set loading to false
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Data fetching failed, set loading to false
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/products/delete-product/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(result => {
                if (result.Status) {
                    window.location.reload();
                } else {
                    alert(result.Error);
                }
            })
            .catch(err => console.log(err));
    };

    // Conditional rendering based on loading state
    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Product List</h3>
            </div>
            {loading ? ( // Display loading message while data is being fetched
                <div>Loading...</div>
            ) : (
                <div className="mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>P_Name</th>
                                <th>W_price</th>
                                <th>R_price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.p_id}>
                                    <td>{product.p_name}</td>
                                    <td>{product.w_price}</td>
                                    <td>{product.r_price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <Link to={`/dashboard/edit_product/${product.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleDelete(product.p_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Product01;