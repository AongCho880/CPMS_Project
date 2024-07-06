// ShowProductlistdash.js

import React, { useEffect, useState } from "react";
import ProductList from './ProductList';
import EditProductModal from './EditProductModal';

const ShowProductlistdash = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products/all-products");
      const data = await res.json();
      console.log("After delete get all products: ", data);
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
  };

  const saveEditedProduct = async (product) => {
    try {
      const res = await fetch(`http://localhost:5000/products/edit-product/${product.p_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        getProducts();
        setSelectedProduct(null);
      } else {
        console.error("Failed to edit product");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteProduct = async (productId) => {
    console.log("Delete Product called ID: ", productId);
    try {
      const res = await fetch("http://localhost:5000/products/delete-product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_id: productId }),
      });

      if (res.ok) {
        getProducts();
      } else {
        console.error("Failed to delete product");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-5">
      <ProductList
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
      <EditProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        saveEditedProduct={saveEditedProduct}
      />
    </div>
  );
};

export default ShowProductlistdash;
