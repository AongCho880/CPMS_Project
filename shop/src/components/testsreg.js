import React, { Fragment, useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const CustReport = ({ profile }) => {
  const [inputs, setInputs] = useState({
    shop: null,
    product: null,
  });

  const { shop, product } = inputs;
  const [showModal, setShowModal] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopphoneNumber, setShopPhoneNumber] = useState("");
  const [shoppassword, setShopPassword] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [UC, setUC] = useState("");
  const [Road, setRoad] = useState("");
  const [Word, setWord] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(""); // State for current date and time
  const [currentLocation, setCurrentLocation] = useState(""); // State for current location
  const [reportDescription, setReportDescription] = useState(""); // State to hold report description
  const frontVideoRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const [frontCameraActive, setFrontCameraActive] = useState(false);
  const [productCameraActive, setProductCameraActive] = useState(false);
  const productVideoRef = useRef(null);
  const productCanvasRef = useRef(null);

  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [UCs, setUCS] = useState([]);

  // const handleCloseModal = () => setShowModal(false);
  const handleCloseModal = () => {
    setShowModal(false);
    resetFormFields(); // Reset the form fields when the modal is closed
  };
  const handleShowModal = () => setShowModal(true);

  const handleShopNameChange = (e) => {
    setShopName(e.target.value);
  };

  const handleDivisionChange = async (e) => {
    const selectedDivision = e.target.value;
    setDivision(selectedDivision);
    setDistrict(""); // Reset district when division changes
    try {
      // Fetch districts based on the selected division
      const response = await fetch(
        `http://localhost:5000/location/shop-loc/${selectedDivision}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();

        console.log("from dis------------", data);
        // console.log("from frontend------------", data[0]); // Assuming data is an array
        setDistricts(data); // Set the fetched districts
      } else {
        console.error("Failed to fetch districts.");
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setSubDistrict(""); // Reset district when division changes
    try {
      // Fetch sub-districts based on the selected district
      const response = await fetch(
        `http://localhost:5000/location/shop-locsub/${selectedDistrict}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const dat = await response.json();
        console.log("from sub-dis------------", dat);
        // console.log("from frontend------------", data[0]);

        setSubDistricts(dat); // Set the fetched sub-districts
      } else {
        console.error("Failed to fetch sub-districts.");
      }
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  };

  const handleSubDistrictChange = async (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrict(selectedSubDistrict);
    setUC(""); // Reset district when division changes
    try {
      // Fetch sub-districts based on the selected district
      const response = await fetch(
        `http://localhost:5000/location/shop-locuc/${selectedSubDistrict}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("from sub-dis------------", data);
        // console.log("from frontend------------", data[0]);

        setUCS(data); // Set the fetched sub-districts
      } else {
        console.error("Failed to fetch sub-districts.");
      }
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  };

  // useEffect(() => {
  //   if (districts.length > 0) {
  //     const numberOfDistricts = districts.length;
  //     const numbersArray = Array.from({ length: numberOfDistricts }, (_, index) => index + 1);
  //     console.log("Districts array:", numbersArray);
  //   }
  // }, [districts]);

  // useEffect(() => {
  //   if (subDistricts.length > 0) {
  //     const numberOfSubDistricts = subDistricts.length;
  //     const numbersArray_2 = Array.from({ length: numberOfSubDistricts }, (_, index) => index + 1);
  //     console.log("Sub-districts array:", numbersArray_2);
  //   }
  // }, [subDistricts]);

  // const handleSubDistrictChange = (e) => {
  //   setSubDistrict(e.target.value);
  // };

  const handleUCChange = (e) => {
    setUC(e.target.value);
  };

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handleRoadChange = (e) => {
    setRoad(e.target.value);
  };

  const handleShopPhoneNumberChange = (e) => {
    setShopPhoneNumber(e.target.value);
  };

  const handleReportDescriptionChange = (e) => {
    setReportDescription(e.target.value);
  };

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    setCurrentDateTime(formattedDateTime);
  };

  // Function to get current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setCurrentLocation(googleMapsLink);
      },
      (error) => {
        console.error("Error getting location:", error);
        setCurrentLocation("Location not available");
      }
    );
  };

  const startFrontCamera = () => {
    setFrontCameraActive(true);
    initializeCamera(frontVideoRef);
    setInputs({ ...inputs, shop: null });
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
    setInputState({
      ...inputs,
      [canvasRef === frontCanvasRef ? "shop" : "product"]: dataURL,
    });
    stopCamera(videoRef);
  };

  const resetFormFields = () => {
    setCurrentDateTime("");
    setCurrentLocation("");
    setShopName("");
    setProductName("");
    setDivision("");
    setDistrict("");
    setSubDistrict("");
    setUC("");
    setWord("");
    setRoad("");
    setReportDescription("");
    setInputs({ shop: null, product: null });
    setFrontCameraActive(false);
    setProductCameraActive(false);
  };

  const handleSubmit = async () => {
    try {
      // Gather all form data
      const formData = {
        currentDateTime,
        currentLocation,
        c_phone: profile.c_phone,
        c_name: profile.c_name,
        c_selfiePhoto: profile.c_selfiephoto,
        c_frontNID: profile.c_frontnid,
        c_backNID: profile.c_backnid,
        shopName,
        division,
        district,
        subDistrict,
        UC,
        Word,
        Road,
        shopPhoto: inputs.shop,
        productName,
        productPhoto: inputs.product,
        s_report_description: reportDescription,
        status: "Unsolved",
        // Add other form fields as needed
      };

      console.log("from NOn Report-----------", formData);

      // Send form data to backend
      const response = await fetch(
        "http://localhost:5000/shop/submit-report-non-reg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully!");
        // Optionally reset the form or close the modal after submission
        handleCloseModal();
        resetFormFields();
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Button onClick={handleShowModal}>Create a report</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Report</Modal.Title>
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
            <Form.Group controlId="currentLocation">
              <Form.Label>Current Location</Form.Label>
              <Form.Control type="text" value={currentLocation} readOnly />
              <Button variant="secondary" onClick={getCurrentLocation}>
                Get Location
              </Button>
            </Form.Group>

            <Form.Group controlId="customerInfo">
              <Form.Label>Customer Info:</Form.Label>
              <Form.Group controlId="customerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control type="text" value={profile.c_name} readOnly />
              </Form.Group>
              <Form.Group controlId="customerNumber">
                <Form.Label>Customer Number</Form.Label>
                <Form.Control type="text" value={profile.c_phone} readOnly />
              </Form.Group>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>

              <Form.Group controlId="division">
                <Form.Label>Division</Form.Label>
                <Form.Control
                  as="select"
                  value={division}
                  onChange={handleDivisionChange}
                >
                  <option value="">Select Division</option>
                  {/* Barishal, Chattogram, Dhaka, Khulna, Rajshahi, Rangpur, Mymensingh and Sylhet */}
                  <option value="Barishal">Barishal</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Sylhet">Sylhet</option>
                  {/* Add options for other divisions */}
                </Form.Control>

                <Form.Group controlId="district">
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    as="select"
                    value={district}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district.district}>
                        {district.district}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Label>Sub-district</Form.Label>
                <Form.Control
                  as="select"
                  value={subDistrict}
                  onChange={handleSubDistrictChange}
                >
                  <option value="">Select Sub-district</option>
                  {subDistricts.map((subDistrict, index) => (
                    <option key={index} value={subDistrict.upazila}>
                      {subDistrict.upazila}
                    </option>
                  ))}
                </Form.Control>

                <Form.Label>Select Union/City-Corporation</Form.Label>
                <Form.Control as="select" value={UC} onChange={handleUCChange}>
                  <option value="">Select Union/City-Corporation</option>
                  {UCs.map((UC, index) => (
                    <option key={index} value={UC.unions}>
                      {UC.unions}
                    </option>
                  ))}
                </Form.Control>

                {/* <Form.Control as="select" value={UC} onChange={handleUCChange} style={{ marginBottom: "10px" }}>
  <option key="default" value="">Select Union/City-Corporation</option>
  <option key="uc1" value="uc1">UC 1</option>
  <option key="uc2" value="uc2">UC 2</option>
  Add more UC options as needed
</Form.Control> */}

                <Form.Group controlId="word">
                  <Form.Label>Word</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Word"
                    value={Word}
                    onChange={handleWordChange}
                    style={{ marginBottom: "10px" }} // Add margin bottom style
                  />
                </Form.Group>

                <Form.Group controlId="road">
                  <Form.Label>Road</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Road"
                    value={Road}
                    onChange={handleRoadChange}
                    style={{ marginBottom: "10px" }} // Add margin bottom style
                  />
                </Form.Group>
              </Form.Group>
            </Form.Group>
            <Form.Group controlId="shopName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter shop name"
                value={shopName}
                onChange={handleShopNameChange}
              />
            </Form.Group>
            <Form.Group controlId="shopPhoto">
              <Form.Label>Shop Photo</Form.Label>
              <div className="d-flex flex-column align-items-center">
                {shop ? (
                  <Fragment>
                    <img src={shop} alt="Shop" className="img-fluid mt-3" />
                    <div className="mt-3">
                      <Button variant="primary" onClick={startFrontCamera}>
                        Retake Shop Photo
                      </Button>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {!frontCameraActive ? (
                      <Button variant="primary" onClick={startFrontCamera}>
                        Take Shop Photo
                      </Button>
                    ) : (
                      <Fragment>
                        <video
                          ref={frontVideoRef}
                          width="240"
                          height="180"
                          autoPlay
                        ></video>
                        <canvas
                          ref={frontCanvasRef}
                          style={{ display: "none" }}
                          width="240"
                          height="180"
                        ></canvas>
                        <div className="d-flex flex-column align-items-center mt-3">
                          <Button
                            variant="danger"
                            onClick={() => stopCamera(frontVideoRef)}
                          >
                            Stop Camera
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() =>
                              capturePhoto(
                                frontVideoRef,
                                frontCanvasRef,
                                setInputs
                              )
                            }
                          >
                            Capture Shop Photo
                          </Button>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
            </Form.Group>
            <Form.Group controlId="shopPhoneNumbeer">
              <Form.Label>Shop PhoneNumber</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Shop Phone Number"
                value={shopphoneNumber}
                onChange={handleShopPhoneNumberChange}
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustReport;
