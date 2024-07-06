// AddProduct.js

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../style/AddProduct.css"; // Import CSS file for styling

const AddProduct = () => {
  const [product, setProduct] = useState({
    p_name: "",
    r_price: "",
    w_price: "",
    p_category: "",
    image: null,
  });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("From Front-end: ", product);

    fetch("http://localhost:5000/products/admin-add-product", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push("/products"); // Redirect to the product list page after successful addition
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // When file reading is completed, set the image data URL in the state
      setProduct({ ...product, image: reader.result });
      // console.log("asdfghjk:  ", reader.result);
      // console.log("Image value in product state: ", product.image); // Log the image value
    };

    if (file) {
      // Start reading the selected image file
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h3 className="add-product-heading">Add Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Enter Product Name"
              onChange={(e) =>
                setProduct({ ...product, p_name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputRetailPrice" className="form-label">
              Retail Price
            </label>
            <input
              type="text"
              className="form-control"
              id="inputRetailPrice"
              placeholder="Enter Retail Price"
              onChange={(e) =>
                setProduct({ ...product, r_price: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputWholesalePrice" className="form-label">
              Wholesale Price
            </label>
            <input
              type="text"
              className="form-control"
              id="inputWholesalePrice"
              placeholder="Enter Wholesale Price"
              onChange={(e) =>
                setProduct({ ...product, w_price: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Product Category
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCategory"
              placeholder="Enter Product Category"
              onChange={(e) =>
                setProduct({ ...product, p_category: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputImage" className="form-label">
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="inputImage"
              onChange={handleImageChange}
            />
          </div>
          {product.image && (
            <div className="mb-3">
              <img
                src={product.image}
                alt="Product"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

// // AddProduct.js

// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     p_name: "",
//     r_price: "",
//     w_price: "",
//     p_category: "",
//     image: null,
//   });
//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("From Front-end: ", product);

//     fetch("http://localhost:5000/products/admin-add-product", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(product),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           history.push("/products"); // Redirect to the product list page after successful addition
//         } else {
//           alert(data.error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       // When file reading is completed, set the image data URL in the state
//       setProduct({ ...product, image: reader.result });
//       // console.log("asdfghjk:  ", reader.result);
//       // console.log("Image value in product state: ", product.image); // Log the image value
//     };

//     if (file) {
//       // Start reading the selected image file
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-3">
//       <div className="p-3 rounded w-50 border">
//         <h3 className="text-center">Add Product</h3>
//         <form className="row g-1" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label htmlFor="inputName" className="form-label">
//               Product Name
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-1"
//               id="inputName"
//               placeholder="Enter Product Name"
//               onChange={(e) =>
//                 setProduct({ ...product, p_name: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputRetailPrice" className="form-label">
//               Retail Price
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputRetailPrice"
//               placeholder="Enter Retail Price"
//               onChange={(e) =>
//                 setProduct({ ...product, r_price: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputWholesalePrice" className="form-label">
//               Wholesale Price
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputWholesalePrice"
//               placeholder="Enter Wholesale Price"
//               onChange={(e) =>
//                 setProduct({ ...product, w_price: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputCategory" className="form-label">
//               Product Category
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputCategory"
//               placeholder="Enter Product Category"
//               onChange={(e) =>
//                 setProduct({ ...product, p_category: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputImage" className="form-label">
//               Product Image
//             </label>
//             <input
//               type="file"
//               className="form-control"
//               id="inputImage"
//               onChange={handleImageChange}
//             />
//           </div>
//           {product.image && (
//             <div className="col-12">
//               <img
//                 src={product.image}
//                 alt="Product"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>
//           )}
//           <div className="col-12">
//             <button type="submit" className="btn btn-primary w-100">
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     p_name: "",
//     r_price: "",
//     w_price: "",
//     p_category: "",
//     image: null,
//   });

//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("p_name", product.p_name);
//     formData.append("w_price", product.w_price);
//     formData.append("r_price", product.r_price);
//     formData.append("p_category", product.p_category);
//     formData.append("image", product.image);

//     try {
//       const response = await fetch('http://localhost:5000/products/admin-add-product', {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       console.log("abc   :",data);
//       if (data.success) {
//         history.push('/products');
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       // When file reading is completed, set the image data URL in the state
//       setProduct({ ...product, image: reader.result });
//       console.log("asdfghjk:  ",reader.result);
//     };

//     if (file) {
//       // Start reading the selected image file
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-3">
//       <div className="p-3 rounded w-50 border">
//         <h3 className="text-center">Add Product</h3>
//         <form className="row g-1" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label htmlFor="inputName" className="form-label">Product Name</label>
//             <input type="text" className="form-control rounded-1" id="inputName" placeholder="Enter Product Name" onChange={(e) => setProduct({ ...product, p_name: e.target.value })} />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputRetailPrice" className="form-label">Retail Price</label>
//             <input type="text" className="form-control rounded-0" id="inputRetailPrice" placeholder="Enter Retail Price" onChange={(e) => setProduct({ ...product, r_price: e.target.value })} />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputWholesalePrice" className="form-label">Wholesale Price</label>
//             <input type="text" className="form-control rounded-0" id="inputWholesalePrice" placeholder="Enter Wholesale Price" onChange={(e) => setProduct({ ...product, w_price: e.target.value })} />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputCategory" className="form-label">Product Category</label>
//             <input type="text" className="form-control rounded-0" id="inputCategory" placeholder="Enter Product Category" onChange={(e) => setProduct({ ...product, p_category: e.target.value })} />
//           </div>
//           <div className="col-12">
//   <label htmlFor="inputImage" className="form-label">Product Image</label>
//   <input type="file" className="form-control" id="inputImage" onChange={handleImageChange} />
// </div>
// {product.image && (
//   <div className="col-12">
//     <img
//       src={product.image}
//       alt="Product"
//       style={{
//         width: "100px", // Set the width to your desired size
//         height: "100px", // Set the height to your desired size
//         objectFit: "cover",
//         // borderRadius: "50%", // Make the image rounded
//         // overflow: "hidden" // Hide overflow to ensure rounded shape
//       }}
//     />
//   </div>
// )}

//           <div className="col-12">
//             <button type="submit" className="btn btn-primary w-100">Add Product</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
