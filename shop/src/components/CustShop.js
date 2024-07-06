import React, { Fragment, useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Image, Row, Col } from "react-bootstrap";
import "../Style/CustShop.css";

const CustShop = ({ profile }) => {
  const [inputs, setInputs] = useState({
    product: null,
  });
  const { product } = inputs;
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shopId, setShopId] = useState("");
  const [shopInfo, setShopInfo] = useState(null);
  const [error, setError] = useState(null);
  const [reporting, setReporting] = useState(false); // State to control reporting modal
  const [reportDescription, setReportDescription] = useState(""); // State to hold report description
  const [currentDateTime, setCurrentDateTime] = useState(""); // State for current date and time
  const [productCameraActive, setProductCameraActive] = useState(false);
  const productVideoRef = useRef(null);
  const productCanvasRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/shop-products/${shopId}`,
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
    fetchProducts();
  }, [shopId]);

  const handleCloseModal = () => {
    setShowModal(false);
    setShopId("");
    setShopInfo(null);
    setError(null);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    setCurrentDateTime(formattedDateTime);
  };

  const handleShowModal = () => setShowModal(true);

  const handleShopIdChange = (e) => {
    setShopId(e.target.value);
  };

  const handleEnterShop = async () => {
    try {
      const response = await fetch(`http://localhost:5000/shop/${shopId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Shop not found");
      }
      const shopData = await response.json();
      console.log("Cust shop frontend ------- : ", shopData);
      setShopInfo(shopData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleExitShop = () => {
    setShopInfo(null);
  };

  const handleReportShop = () => {
    setReporting(true);
  };

  const handleCloseReportModal = () => {
    setReporting(false);
    handleResetForm(); // Reset the form
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleReportDescriptionChange = (e) => {
    setReportDescription(e.target.value);
  };

  const startProductCamera = () => {
    setProductCameraActive(true);
    initializeCamera(productVideoRef);
    setInputs({ ...inputs, product: null });
  };

  const stopCamera = (videoRef) => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const initializeCamera = async (videoRef) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = (videoRef, canvasRef, setInputState) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!video || !canvas) {
      console.error("Video or canvas element not found.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setInputState({ ...inputs, product: dataURL });
    stopCamera(videoRef);
  };

  const handleResetForm = () => {
    setReportDescription(""); // Reset report description
    setCurrentDateTime(""); // Reset current date and time
    setProductName("");
    setInputs({ product: null }); // Reset product photo
    setProductCameraActive(false); // Reset product camera state
  };

  const handleSubmitReport = async () => {
    try {
      const formData = {
        s_id: shopInfo.s_id,
        s_name: shopInfo.s_name,
        s_phone: shopInfo.s_phone,
        s_frontNID: shopInfo.s_frontnid,
        s_backNID: shopInfo.s_backnid,
        s_div: shopInfo.s_div,
        s_dist: shopInfo.s_dist,
        s_subdist: shopInfo.s_subdist,
        s_union: shopInfo.s_union,
        s_word: shopInfo.s_word,
        s_road: shopInfo.s_road,
        s_location: shopInfo.s_location,
        c_phone: profile.c_phone,
        c_name: profile.c_name,
        c_selfiePhoto: profile.c_selfiephoto,
        c_frontNID: profile.c_frontnid,
        c_backNID: profile.c_backnid,
        s_report_description: reportDescription,
        date_time: currentDateTime,
        p_name: productName,
        p_photo: inputs.product,
        s_photo: shopInfo.s_photo,
        status: "Unsolved",
      };

      // console.log("from Report-----------",formData);

      // console.log("from Report-----------",profile);

      const response = await fetch("http://localhost:5000/shop/submit-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");

        handleCloseReportModal(); // Close the report modal
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
      <div className="container_cust-product">
        <div className="container-cust">
          <h2 className="mb-4">Shop Information</h2>
          {!shopInfo && (
            <div>
              <Button onClick={handleShowModal}>Enter to a shop</Button>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Shop ID</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group controlId="shopId">
                    <Form.Label>Shop ID</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Shop ID"
                      value={shopId}
                      onChange={handleShopIdChange}
                    />
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleEnterShop}>
                    Enter Shop
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
          {shopInfo && (
            <div>
              <div className="mb-3 shop-owner-container">
                <img
                  src={`${shopInfo.s_selfiephoto}`}
                  alt="Shop Owner Img"
                  className="shop-owner-image"
                />
                <h3>{shopInfo.s_name}</h3>
                <p>
                  <strong>ID:</strong> {shopInfo.s_id}
                </p>
                <p>
                  <strong>Phone:</strong> {shopInfo.s_phone}
                </p>
              </div>

              <Button
                variant="warning"
                className="float-end mb-3 me-3"
                onClick={handleReportShop}
              >
                Report Shop
              </Button>

              <Button
                variant="danger"
                className="float-end mb-3"
                onClick={handleExitShop}
              >
                Exit from Shop
              </Button>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {shopInfo && (
            <div className="px-5 mt-3">
              <div className="d-flex justify-content-center">
                <h3>Product List</h3>
              </div>
              <div className="table-contain">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="table-heading">Product Name</th>
                      <th className="table-heading">Products Image</th>
                      <th className="table-heading">Retail Price</th>
                      <th className="table-heading">Wholesale Price</th>
                      <th className="table-heading">Product Category</th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reporting Modal */}
      <Modal show={reporting} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="currentDateTime">
              <Form.Label>Current Date and Time</Form.Label>
              <Form.Control type="text" value={currentDateTime} readOnly />
              <Button variant="secondary" onClick={getCurrentDateTime}>
                Update
              </Button>
            </Form.Group>
            {shopInfo && (
              <>
                <Form.Group controlId="shopInfo">
                  <Form.Label>Shop Info:</Form.Label>
                  <Form.Group controlId="s_id">
                    <Form.Label>Shop ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_id || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_name">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_name || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_phone">
                    <Form.Label>Shop Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_phone || ""}
                      readOnly
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address:</Form.Label>
                  <Form.Group controlId="s_div">
                    <Form.Label>Division</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_div || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_dis">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_dist || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_subdist">
                    <Form.Label>Sub District</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_subdist || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_union">
                    <Form.Label>Union</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_union || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_union">
                    <Form.Label>Word</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_word || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_road">
                    <Form.Label>Road</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_road || ""}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="s_location">
                    <Form.Label>Google Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={shopInfo.s_location || ""}
                      readOnly
                    />
                  </Form.Group>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="customerInfo">
              <Form.Label>Customer Info:</Form.Label>
              <Form.Group controlId="c_name">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.c_name || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="c_phone">
                <Form.Label>Customer Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.c_phone || ""}
                  readOnly
                />
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="shopName">
              <Form.Label>Prduct Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product name"
                value={productName}
                onChange={handleProductNameChange}
              />
            </Form.Group>

            <Form.Group controlId="productPhoto">
              <Form.Label>Product Photo</Form.Label>
              <div className="d-flex flex-column align-items-center">
                {product ? (
                  <Fragment>
                    <img
                      src={product}
                      alt="Product"
                      className="img-fluid mt-3"
                    />
                    <div className="mt-3">
                      <Button variant="primary" onClick={startProductCamera}>
                        Retake Product Photo
                      </Button>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {!productCameraActive ? (
                      <Button variant="primary" onClick={startProductCamera}>
                        Take Product Photo
                      </Button>
                    ) : (
                      <Fragment>
                        <video
                          ref={productVideoRef}
                          width="240"
                          height="180"
                          autoPlay
                        ></video>
                        <canvas
                          ref={productCanvasRef}
                          style={{ display: "none" }}
                          width="240"
                          height="180"
                        ></canvas>
                        <div className="d-flex flex-column align-items-center mt-3">
                          <Button
                            variant="danger"
                            onClick={() => stopCamera(productVideoRef)}
                          >
                            Stop Camera
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() =>
                              capturePhoto(
                                productVideoRef,
                                productCanvasRef,
                                setInputs
                              )
                            }
                          >
                            Capture Product Photo
                          </Button>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
            </Form.Group>
            <Form.Group controlId="reportDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the issue with this shop"
                value={reportDescription}
                onChange={handleReportDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReportModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReport}>
            Submit Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustShop;

// import React, { Fragment, useState, useRef, useEffect } from 'react';
// import { Button, Modal, Form, Image, Row, Col } from 'react-bootstrap';

// const CustShop = ({ profile }) => {
//     const [inputs, setInputs] = useState({
//         product: null,
//     });
//     const { product } = inputs;
//     const [products, setProducts] = useState([]);
//     const [productName, setProductName] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const [shopId, setShopId] = useState("");
//     const [shopInfo, setShopInfo] = useState(null);
//     const [error, setError] = useState(null);
//     const [reporting, setReporting] = useState(false); // State to control reporting modal
//     const [reportDescription, setReportDescription] = useState(""); // State to hold report description
//     const [currentDateTime, setCurrentDateTime] = useState(""); // State for current date and time
//     const [productCameraActive, setProductCameraActive] = useState(false);
//     const productVideoRef = useRef(null);
//     const productCanvasRef = useRef(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/products/shop-products/${shopId}`, {
//                     method: "GET",
//                     headers: { token: localStorage.token },
//                 });
//                 const data = await res.json();
//                 setProducts(data);
//             } catch (err) {
//                 console.error(err.message);
//             }
//         };
//         fetchProducts();
//     }, [shopId]);

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setShopId("");
//         setShopInfo(null);
//         setError(null);
//     };

//     const getCurrentDateTime = () => {
//         const now = new Date();
//         const formattedDateTime = now.toLocaleString();
//         setCurrentDateTime(formattedDateTime);
//     };

//     const handleShowModal = () => setShowModal(true);

//     const handleShopIdChange = (e) => {
//         setShopId(e.target.value);
//     };

//     const handleEnterShop = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/shop/${shopId}`, {
//                 method: "GET"
//             });
//             if (!response.ok) {
//                 throw new Error("Shop not found");
//             }
//             const shopData = await response.json();
//             console.log("Cust shop frontend ------- : ", shopData);
//             setShopInfo(shopData);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const handleExitShop = () => {
//         setShopInfo(null);
//     };

//     const handleReportShop = () => {
//         setReporting(true);
//     };

//     const handleCloseReportModal = () => {
//         setReporting(false);
//         handleResetForm(); // Reset the form
//     };

//     const handleProductNameChange = (e) => {
//         setProductName(e.target.value);
//       };

//     const handleReportDescriptionChange = (e) => {
//         setReportDescription(e.target.value);
//     };

//     const startProductCamera = () => {
//         setProductCameraActive(true);
//         initializeCamera(productVideoRef);
//         setInputs({ ...inputs, product: null });
//     };

//     const stopCamera = (videoRef) => {
//         const video = videoRef.current;
//         if (video && video.srcObject) {
//             const tracks = video.srcObject.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//     };

//     const initializeCamera = async (videoRef) => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             const video = videoRef.current;
//             if (video) {
//                 video.srcObject = stream;
//             }
//         } catch (error) {
//             console.error("Error accessing camera:", error);
//         }
//     };

//     const capturePhoto = (videoRef, canvasRef, setInputState) => {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');

//         if (!video || !canvas) {
//             console.error("Video or canvas element not found.");
//             return;
//         }

//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const dataURL = canvas.toDataURL('image/png');
//         setInputState({ ...inputs, product: dataURL });
//         stopCamera(videoRef);
//     };

//     const handleResetForm = () => {
//         setReportDescription(""); // Reset report description
//         setCurrentDateTime(""); // Reset current date and time
//         setProductName("");
//         setInputs({ product: null }); // Reset product photo
//         setProductCameraActive(false); // Reset product camera state
//     };

//     const handleSubmitReport = async () => {
//         try {
//             const formData = {
//             s_id : shopInfo.s_id,
//             s_name: shopInfo.s_name,
//             s_phone: shopInfo.s_phone,
//             s_div: shopInfo.s_div,
//             s_dist: shopInfo.s_dist,
//             s_subdist: shopInfo.s_subdist,
//             s_union: shopInfo.s_union,
//             s_word: shopInfo.s_word,
//             s_road: shopInfo.s_road,
//             s_location: shopInfo.s_location,
//             c_phone: profile.c_phone,
//             c_name: profile.c_name,
//             c_selfiePhoto: profile.c_selfiephoto,
//             c_frontNID: profile.c_frontnid,
//             c_backNID: profile.c_backnid,
//             s_report_description: reportDescription,
//             date_time: currentDateTime,
//             p_name: productName,
//             p_photo: inputs.product,
//             s_photo: shopInfo.s_photo,
//             status:'Unsolved'
//         };

//         // console.log("from Report-----------",formData);

//         // console.log("from Report-----------",profile);

//             const response = await fetch("http://localhost:5000/shop/submit-report", {
//                 method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log("Form submitted successfully!");

//         handleCloseReportModal(); // Close the report modal
//       } else {
//         console.error("Failed to submit form.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//     return (
//         <div className="container mt-5" style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
//             <style>
//                 {`
//                     /* Hide the scrollbar */
//                     ::-webkit-scrollbar {
//                         display: none;
//                     }
//                 `}
//             </style>
//             <h2 className="mb-4">Shop Dashboard</h2>
//             {shopInfo && (
//                 <div>
//                     <Button variant="danger" className="float-end mb-3" onClick={handleExitShop}>
//                         Exit from Shop
//                     </Button>
//                     <Button variant="warning" className="float-end mb-3 me-3" onClick={handleReportShop}>
//                         Report Shop
//                     </Button>
//                     <div className="mb-3">
//                         <h3>Shop Information</h3>
//                         <p><strong>ID:</strong> {shopInfo.s_id}</p>
//                         <p><strong>Name:</strong> {shopInfo.s_name}</p>
//                         <p><strong>Phone:</strong> {shopInfo.s_phone}</p>
//                     </div>

//                     <img
//                                                 src={`${shopInfo.s_selfiephoto}`}
//                                                 alt="Product"
//                                                 style={{
//                                                     width: "70px", // Set the width to a smaller size
//                                                     height: "70px", // Set the height to a smaller size
//                                                     objectFit: "cover",
//                                                     borderRadius: "50%", // Make the image rounded
//                                                     overflow: "hidden", // Hide overflow to ensure rounded shape
//                                                 }}
//                                             />
//                     <Row>
//                         <Col md={6}>
//                             <div className="avatar">
//                                 <Image src={shopInfo.s_selfiephoto} alt="Shop Owner Img" className="avatar-img" rounded />
//                             </div>
//                         </Col>
//                     </Row>
//                     <div className="px-5 mt-3">
//                         <div className="d-flex justify-content-center">
//                             <h3>Product List</h3>
//                         </div>
//                         <div className="mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th className="col">Product Name</th>
//                                         <th className="col">Products Image</th>
//                                         <th className="col">Retail Price</th>
//                                         <th className="col">Wholesale Price</th>
//                                         <th className="col">Product Category</th>
//                                         <th className="col">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {products.map((product) => (
//                                         <tr key={product.p_id}>
//                                             <td>{product.p_name}</td>
//                                             <td><img
//                                                 src={`${product.image_data}`}
//                                                 alt="Product"
//                                                 style={{
//                                                     width: "70px", // Set the width to a smaller size
//                                                     height: "70px", // Set the height to a smaller size
//                                                     objectFit: "cover",
//                                                     borderRadius: "50%", // Make the image rounded
//                                                     overflow: "hidden", // Hide overflow to ensure rounded shape
//                                                 }}
//                                             /></td>
//                                             <td>{product.r_price}</td>
//                                             <td>{product.w_price}</td>
//                                             <td>{product.p_category}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {!shopInfo && (
//                 <div>
//                     <Button onClick={handleShowModal}>Enter to a shop</Button>
//                     <Modal show={showModal} onHide={handleCloseModal}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Enter Shop ID</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <Form.Group controlId="shopId">
//                                 <Form.Label>Shop ID</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Enter Shop ID"
//                                     value={shopId}
//                                     onChange={handleShopIdChange}
//                                 />
//                             </Form.Group>
//                             {error && <p className="text-danger">{error}</p>}
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleCloseModal}>
//                                 Close
//                             </Button>
//                             <Button variant="primary" onClick={handleEnterShop}>
//                                 Enter Shop
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </div>
//             )}
//             {/* Reporting Modal */}
//             <Modal show={reporting} onHide={handleCloseReportModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Report Shop</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="currentDateTime">
//                             <Form.Label>Current Date and Time</Form.Label>
//                             <Form.Control type="text" value={currentDateTime} readOnly />
//                             <Button variant="secondary" onClick={getCurrentDateTime}>
//                                 Update
//                             </Button>
//                         </Form.Group>
//                         {shopInfo && (
//                             <>
//                                 <Form.Group controlId="shopInfo">
//                                     <Form.Label>Shop Info:</Form.Label>
//                                     <Form.Group controlId="s_id">
//                                         <Form.Label>Shop ID</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_id || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_name">
//                                         <Form.Label>Shop Name</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_name || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_phone">
//                                         <Form.Label>Shop Phone</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_phone || ""} readOnly />
//                                     </Form.Group>
//                                 </Form.Group>
//                                 <Form.Group controlId="address">
//                                     <Form.Label>Address:</Form.Label>
//                                     <Form.Group controlId="s_div">
//                                         <Form.Label>Division</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_div || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_dis">
//                                         <Form.Label>District</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_dist || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_subdist">
//                                         <Form.Label>Sub District</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_subdist || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_union">
//                                         <Form.Label>Union</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_union || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_union">
//                                         <Form.Label>Word</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_word || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_road">
//                                         <Form.Label>Road</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_road || ""} readOnly />
//                                     </Form.Group>
//                                     <Form.Group controlId="s_location">
//                                         <Form.Label>Google Location</Form.Label>
//                                         <Form.Control type="text" value={shopInfo.s_location || ""} readOnly />
//                                     </Form.Group>
//                                 </Form.Group>
//                             </>
//                         )}
//                         <Form.Group controlId="customerInfo">
//                             <Form.Label>Customer Info:</Form.Label>
//                             <Form.Group controlId="c_name">
//                                 <Form.Label>Customer Name</Form.Label>
//                                 <Form.Control type="text" value={profile.c_name || ""} readOnly />
//                             </Form.Group>
//                             <Form.Group controlId="c_phone">
//                                 <Form.Label>Customer Phone</Form.Label>
//                                 <Form.Control type="text" value={profile.c_phone || ""} readOnly />
//                             </Form.Group>
//                         </Form.Group>
//                         <Form.Group controlId="shopName">
//               <Form.Label>Prduct Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Product name"
//                 value={productName}
//                 onChange={handleProductNameChange}
//               />
//             </Form.Group>

//                         <Form.Group controlId="productPhoto">
//                             <Form.Label>Product Photo</Form.Label>
//                             <div className="d-flex flex-column align-items-center">
//                                 {product ? (
//                                     <Fragment>
//                                         <img src={product} alt="Product" className="img-fluid mt-3" />
//                                         <div className="mt-3">
//                                             <Button variant="primary" onClick={startProductCamera}>Retake Product Photo</Button>
//                                         </div>
//                                     </Fragment>
//                                 ) : (
//                                     <Fragment>
//                                         {!productCameraActive ? (
//                                             <Button variant="primary" onClick={startProductCamera}>Take Product Photo</Button>
//                                         ) : (
//                                             <Fragment>
//                                                 <video ref={productVideoRef} width="240" height="180" autoPlay></video>
//                                                 <canvas ref={productCanvasRef} style={{ display: 'none' }} width="240" height="180"></canvas>
//                                                 <div className="d-flex flex-column align-items-center mt-3">
//                                                     <Button variant="danger" onClick={() => stopCamera(productVideoRef)}>Stop Camera</Button>
//                                                     <Button variant="primary" onClick={() => capturePhoto(productVideoRef, productCanvasRef, setInputs)}>Capture Product Photo</Button>
//                                                 </div>
//                                             </Fragment>
//                                         )}
//                                     </Fragment>
//                                 )}
//                             </div>
//                         </Form.Group>
//                         <Form.Group controlId="reportDescription">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Describe the issue with this shop"
//                                 value={reportDescription}
//                                 onChange={handleReportDescriptionChange}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseReportModal}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleSubmitReport}>
//                         Submit Report
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default CustShop;
