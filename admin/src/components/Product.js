import React, { useEffect, useState } from "react";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products/all-products")
      .then((response) => response.json())
      .then((data) => {
        if (data.Status) {
          setProduct(data.Result);
        } else {
          alert(data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch("http://localhost:3000/admin/delete_product/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.Status) {
          window.location.reload();
        } else {
          alert(result.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Product List</h3>
      </div>
      <button
        className="btn btn-success"
        onClick={() => setShowAddProduct(!showAddProduct)}
      >
        {showAddProduct ? "Hide Add Product" : "Add Product"}
      </button>
      {showAddProduct && (
        <div className="mt-3">
          <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Add Product</h3>
            {/* Add product form goes here */}
          </div>
        </div>
      )}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>P_Name</th>
              <th>P_image</th>
              <th>W_price</th>
              <th>R_price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((e) => (
              <tr key={e.p_id}>
                <td>{e.p_name}</td>
                <td>{<img src={`${e.image}`} alt="Product" />}</td>
                <td>{e.w_price}</td>
                <td>{e.r_price}</td>
                <td>{e.category}</td>
                <td>
                  {/* Edit and delete buttons go here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;