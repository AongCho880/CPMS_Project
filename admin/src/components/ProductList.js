import React, { useState } from "react";
import "../style/ProductList.css"; // Import CSS file for styling

const ProductList = ({ products, editProduct, deleteProduct }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product =>
    product.p_category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="heading-container">
        <h3 className="page-heading">Product List</h3>
        <input
          type="text"
          placeholder="Search by category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control search-input"
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="table-heading">
            <tr>
              <th >Product Image</th>
              <th >Product Name</th>
              <th >Retail Price</th>
              <th >Wholesale Price</th>
              <th >Product Category</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.p_id}>
                <td>{product.p_name}</td>
                <td>
                  <img
                    src={`${product.image_data}`}
                    alt="Product"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  />
                </td>
                <td>{product.r_price}</td>
                <td>{product.w_price}</td>
                <td>{product.p_category}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => deleteProduct(product.p_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
