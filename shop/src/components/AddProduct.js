import React, { useState, useEffect } from "react";
import "../Style/ShopProducts.css";

const AddProduct = ({ setShowAddProduct, shopId }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/products/notAv-products/${shopId}`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addProductToShop = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/products/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          s_id: shopId,
          p_id: productId,
        }),
      });
      if (res.ok) {
        const updatedProducts = products.filter(
          (product) => product.p_id !== productId
        );
        setProducts(updatedProducts);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const close = () => {
    setShowAddProduct(false);
  };

  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <div className="heading-cont">
        <h3>Add New Products</h3>
      </div>
      <div className="table-cont">
        <table className="table">
          <thead>
            <tr>
              <th className="table-head">Product Name</th>
              <th className="table-head">Products Image</th>
              <th className="table-head">Retail Price</th>
              <th className="table-head">Wholesale Price</th>
              <th className="table-head">Product Category</th>
              <th className="table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.p_id}>
                <td>{product.p_name}</td>
                <td>
                  <img
                    src={`${product.image_data}`}
                    alt="Product"
                    style={{
                      width: "70px", // Set the width to a smaller size
                      height: "70px", // Set the height to a smaller size
                      objectFit: "cover",
                      borderRadius: "50%", // Make the image rounded
                      overflow: "hidden", // Hide overflow to ensure rounded shape
                    }}
                  />
                </td>
                <td>{product.r_price}</td>
                <td>{product.w_price}</td>
                <td>{product.p_category}</td>
                <td>
                  <button
                    className="btn btn-primary" // Bootstrap button classes with custom narrow-button class
                    onClick={() => addProductToShop(product.p_id)}
                  >
                    Add to Shop
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

export default AddProduct;
