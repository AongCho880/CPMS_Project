import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "../style/reg.css";

const UnsolvedRegShopReport = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [shopPhotoUrl, setShopPhotoUrl] = useState("");
  const [productPhotoUrl, setProductPhotoUrl] = useState("");
  const [cPhotoUrl, setCPhotoUrl] = useState("");
  const [cnfPhotoUrl, setCNFPhotoUrl] = useState("");
  const [cnbPhotoUrl, setCNBPhotoUrl] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch("http://localhost:5000/adminreport/shops", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }

      const data = await response.json();
      console.log("from reg---------", data);
      setShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict(""); // Reset district when division changes
    setSelectedSubdistrict(""); // Reset subdistrict when division changes
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedSubdistrict(""); // Reset subdistrict when district changes
  };

  const handleSubdistrictChange = (event) => {
    setSelectedSubdistrict(event.target.value);
  };

  const showReports = (shop) => {
    setSelectedShop(shop);
    setShowModal(true);
  };

  const hideDetails = () => {
    setSelectedShop(null);
    setSelectedReport(null); // Reset selected report
    setShowModal(false);
  };

  const viewAddress = () => {
    setShowAddressModal(true);
  };

  const viewCustomerDetails = (report) => {
    setSelectedReport(report);
    setShowCustomerModal(true);
  };

  const handleSPhotoClick = (selectedShop) => {
    setSelectedShop(selectedShop);
    setShopPhotoUrl(selectedShop.s_photo); // Set the URL of the full-size shop photo
    setShowModal(true);
  };

  const handleCPhotoClick = (selectedReport) => {
    setSelectedReport(selectedReport);
    setCPhotoUrl(selectedReport.c_selfiephoto); // Set the URL of the full-size C photo
    setShowModal(true);
  };

  const handleCNPhotoClick = (selectedReport) => {
    setSelectedReport(selectedReport);
    setCNFPhotoUrl(selectedReport.c_frontnid); // Set the URL of the full-size NID photo
    setCNBPhotoUrl(selectedReport.c_backnid); // Set the URL of the full-size NID photo
    setShowModal(true);
  };

  const handlePhotoClick = (report) => {
    setSelectedReport(report);
    setProductPhotoUrl(report.p_photo); // Set the URL of the full-size product photo
    setShowModal(true);
  };

  const updateReportsStatus = async (
    divisionName,
    districtName,
    subdistrictName,
    unionName,
    wordName,
    roadName,
    shopName
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/adminreport/regshops/updateStatus/${divisionName}/${districtName}/${subdistrictName}/${unionName}/${wordName}/${roadName}/${shopName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Solved" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedShopsCopy = [...shops];
      const shopIndex = updatedShopsCopy.findIndex(
        (shop) =>
          shop.s_name === shopName &&
          shop.shop_info.address.s_div === divisionName &&
          shop.shop_info.address.s_dist === districtName &&
          shop.shop_info.address.s_subdist === subdistrictName &&
          shop.shop_info.address.s_union === unionName &&
          shop.shop_info.address.s_word === wordName &&
          shop.shop_info.address.s_road === roadName
      );
      if (shopIndex !== -1) {
        updatedShopsCopy[shopIndex] = {
          ...updatedShopsCopy[shopIndex],
          shop_info: {
            ...updatedShopsCopy[shopIndex].shop_info,
            reports: updatedShopsCopy[shopIndex].shop_info.reports.map(
              (report) => ({
                ...report,
                status: "solved",
              })
            ),
            reportsCount: 0,
          },
        };
        setShops(updatedShopsCopy);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredShops = shops.filter((shop) => {
    const matchesDivision = selectedDivision
      ? shop.shop_info.address.s_div === selectedDivision
      : true;
    const matchesDistrict = selectedDistrict
      ? shop.shop_info.address.s_dist === selectedDistrict
      : true;
    const matchesSubdistrict = selectedSubdistrict
      ? shop.shop_info.address.s_subdist === selectedSubdistrict
      : true;
    return matchesDivision && matchesDistrict && matchesSubdistrict;
  });

  return (
    <div>
      <div className="filter-container">
        <Form.Group controlId="divisionSelect" className="mb-3">
          <Form.Label>Select Division</Form.Label>
          <Form.Control
            as="select"
            value={selectedDivision}
            onChange={handleDivisionChange}
          >
            <option value="">All Divisions</option>
            
                  <option value="Barishal">Barishal</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Sylhet">Sylhet</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="districtSelect" className="mb-3">
          <Form.Label>Select District</Form.Label>
          <Form.Control
            as="select"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedDivision}
          >
            <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.district}>
                      {district.district}
                    </option>
                  ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="subdistrictSelect" className="mb-3">
          <Form.Label>Select Subdistrict</Form.Label>
          <Form.Control
            as="select"
            value={selectedSubdistrict}
            onChange={handleSubdistrictChange}
            disabled={!selectedDistrict}
          >
            <option value="">All Subdistricts</option>
            {/* Replace the following options with your actual subdistricts based on selected district */}
            {selectedDistrict === "District1-1" && (
              <>
                <option value="Subdistrict1-1-1">Subdistrict1-1-1</option>
                <option value="Subdistrict1-1-2">Subdistrict1-1-2</option>
              </>
            )}
            {selectedDistrict === "District1-2" && (
              <>
                <option value="Subdistrict1-2-1">Subdistrict1-2-1</option>
                <option value="Subdistrict1-2-2">Subdistrict1-2-2</option>
              </>
            )}
            {selectedDistrict === "District2-1" && (
              <>
                <option value="Subdistrict2-1-1">Subdistrict2-1-1</option>
                <option value="Subdistrict2-1-2">Subdistrict2-1-2</option>
              </>
            )}
            {selectedDistrict === "District2-2" && (
              <>
                <option value="Subdistrict2-2-1">Subdistrict2-2-1</option>
                <option value="Subdistrict2-2-2">Subdistrict2-2-2</option>
              </>
            )}
            {selectedDistrict === "District3-1" && (
              <>
                <option value="Subdistrict3-1-1">Subdistrict3-1-1</option>
                <option value="Subdistrict3-1-2">Subdistrict3-1-2</option>
              </>
            )}
            {selectedDistrict === "District3-2" && (
              <>
                <option value="Subdistrict3-2-1">Subdistrict3-2-1</option>
                <option value="Subdistrict3-2-2">Subdistrict3-2-2</option>
              </>
            )}
          </Form.Control>
        </Form.Group>
      </div>

      <div className="shop-report-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Division</th>
              <th>District</th>
              <th>Subdistrict</th>
              <th>Reports Count</th>
              <th>View Reports</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop, index) => (
              <tr key={index}>
                <td>{shop.s_name}</td>
                <td>{shop.shop_info.address.s_div}</td>
                <td>{shop.shop_info.address.s_dist}</td>
                <td>{shop.shop_info.address.s_subdist}</td>
                <td>{shop.shop_info.reportsCount}</td>
                <td>
                  <Button variant="primary" onClick={() => showReports(shop)}>
                    View Reports
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={hideDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Reports Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedShop && (
            <>
              <h4>{selectedShop.s_name}</h4>
              <p>
                Address:{" "}
                {`${selectedShop.shop_info.address.s_road}, ${selectedShop.shop_info.address.s_word}, ${selectedShop.shop_info.address.s_union}, ${selectedShop.shop_info.address.s_subdist}, ${selectedShop.shop_info.address.s_dist}, ${selectedShop.shop_info.address.s_div}`}
              </p>
              <div>
                <h5>Reports:</h5>
                {selectedShop.shop_info.reports.map((report, index) => (
                  <div key={index} className="report-details">
                    <p>
                      <strong>Report ID:</strong> {report.r_id}
                    </p>
                    <p>
                      <strong>Problem:</strong> {report.r_problem}
                    </p>
                    <p>
                      <strong>Report Status:</strong>{" "}
                      {report.status === "solved" ? (
                        <span className="solved-text">Solved</span>
                      ) : (
                        <span className="unsolved-text">Unsolved</span>
                      )}
                    </p>
                    <p>
                      <strong>Product Photo:</strong>
                      <img
                        src={report.p_photo}
                        alt="Product"
                        onClick={() => handlePhotoClick(report)}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                      />
                    </p>
                    <Button onClick={() => viewCustomerDetails(report)}>
                      Customer Details
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div className="customer-details">
              <p>
                <strong>Name:</strong> {selectedReport.c_name}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${
                    !selectedReport.c_phone.startsWith("+88")
                      ? "+88" + selectedReport.c_phone
                      : selectedReport.c_phone
                  }`}
                  rel="noopener noreferrer"
                >
                  {!selectedReport.c_phone.startsWith("+88")
                    ? "+88" + selectedReport.c_phone
                    : selectedReport.c_phone}
                </a>
              </p>
              <p>
                <strong>NID:</strong> {selectedReport.c_nid}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${selectedReport.c_address.c_road}, ${selectedReport.c_address.c_word}, ${selectedReport.c_address.c_union}, ${selectedReport.c_address.c_subdist}, ${selectedReport.c_address.c_dist}, ${selectedReport.c_address.c_div}`}
              </p>
              <div className="photos-container">
                <div className="photo-section">
                  <strong>Customer Selfie Photo:</strong>
                  <img
                    src={selectedReport.c_selfiephoto}
                    alt="Selfie"
                    onClick={() => handleCPhotoClick(selectedReport)}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="photo-section">
                  <strong>Customer NID Front:</strong>
                  <img
                    src={selectedReport.c_frontnid}
                    alt="NID Front"
                    onClick={() => handleCNPhotoClick(selectedReport)}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="photo-section">
                  <strong>Customer NID Back:</strong>
                  <img
                    src={selectedReport.c_backnid}
                    alt="NID Back"
                    onClick={() => handleCNPhotoClick(selectedReport)}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnsolvedRegShopReport;
