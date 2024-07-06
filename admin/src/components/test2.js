// Frontend: UnsolvedNonRegShopReport.js
import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import "../style/reg.css";

const UnsolvedNonRegShopReport = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState(null);
  const [selectedUnion, setSelectedUnion] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpazilaModal, setShowUpazilaModal] = useState(false);
  const [showUnionModal, setShowUnionModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [shopPhotoUrl, setShopPhotoUrl] = useState("");
  const [productPhotoUrl, setProductPhotoUrl] = useState("");
  const [cPhotoUrl, setCPhotoUrl] = useState("");
  const [cnfPhotoUrl, setCNFPhotoUrl] = useState("");
  const [cnbPhotoUrl, setCNBPhotoUrl] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    fetchUpazilas();
  }, []);

  const fetchUpazilas = async () => {
    try {
      const response = await fetch("http://localhost:5000/adminreport/nonreg/upazilas", {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error('Failed to fetch upazilas');
      }

      const data = await response.json();
      setUpazilas(data);

      console.log("Upazilas:", data);
    } catch (error) {
      console.error("Error fetching upazilas:", error);
    }
  };

  const showUnions = (upazila) => {
    setSelectedUpazila(upazila);
    setShowUpazilaModal(true);
  };

  const showShops = (union) => {
    setSelectedUnion(union);
    setShowUnionModal(true);
  };

  const showReports = (shop) => {
    setSelectedShop(shop);
    setShowShopModal(true);
  };

  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };


  const viewCustomerDetails = (report) => {
    setSelectedReport(report);
    setShowCustomerModal(true);
  };

  const viewAddress = () => {
    setShowAddressModal(true);
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



  const updateReportsStatus = async (shopName) => {
    try {
      const response = await fetch(`http://localhost:5000/adminreport/nonreg/updateStatus/${shopName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Solved" })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedShopsCopy = [...shops];
      const shopIndex = updatedShopsCopy.findIndex(shop => shop.s_name === shopName);
      if (shopIndex !== -1) {
        updatedShopsCopy[shopIndex] = {
          ...updatedShopsCopy[shopIndex],
          shop_info: {
            ...updatedShopsCopy[shopIndex].shop_info,
            reports: updatedShopsCopy[shopIndex].shop_info.reports.map(report => ({
              ...report,
              status: "solved"
            })),
            reportsCount: 0
          }
        };
        setShops(updatedShopsCopy);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  return (
    <div>
      <h1>Non-Registered Shop Reports</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Upazila</th>
            <th>Number of Reports</th>
            <th>View Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {upazilas.map((upazila, index) => (
            <tr key={index}>
              <td>{upazila.name}</td>
              <td>{upazila.reportsCount}</td>
              <td>
                <Button onClick={() => showUnions(upazila)}>View Details</Button>
              </td>
              <td>
                {upazila.hasUnsolvedReports ?
                  <Button onClick={() => updateReportsStatus(upazila.name)}>Unsolved</Button> : 'Solved'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modals for showing details */}
      <Modal show={showUpazilaModal} onHide={() => setShowUpazilaModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upazila Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Union</th>
                <th>Number of Reports</th>
                <th>View Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through unions in the selected upazila */}
              {selectedUpazila && selectedUpazila.unions.map((union, index) => (
                <tr key={index}>
                  <td>{union.name}</td>
                  <td>{union.reportsCount}</td>
                  <td>
                    <Button onClick={() => showShops(union)}>View Details</Button>
                  </td>
                  <td>
                    {union.hasUnsolvedReports ?
                      <Button onClick={() => updateReportsStatus(union.name)}>Unsolved</Button> : 'Solved'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpazilaModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUnionModal} onHide={() => setShowUnionModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Union Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Number of Reports</th>
                <th>View Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through shops in the selected union */}
              {selectedUnion && selectedUnion.shops.map((shop, index) => (
                <tr key={index}>
                  <td>{shop.name}</td>
                  <td>{shop.reportsCount}</td>
                  <td>
                    <Button onClick={() => showReports(shop)}>View Details</Button>
                  </td>
                  <td>
                    {shop.hasUnsolvedReports ?
                      <Button onClick={() => updateReportsStatus(shop.name)}>Unsolved</Button> : 'Solved'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnionModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showShopModal} onHide={() => setShowShopModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shop Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{selectedShop && selectedShop.name}</h4>
          <p>Number of Reports: {selectedShop && selectedShop.reportsCount}</p>
          {/* Add more details about the shop here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={viewAddress}>View Address</Button>
          <Button variant="secondary" onClick={() => setShowShopModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Report Details</h4>
          {/* Add details about the selected report here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Address Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display address details here */}
          {/* You can use selectedShop and selectedUnion data to display the address */}
          {/* For example: */}
          <p>Division: {selectedDivision}</p>
          <p>District: {selectedDistrict}</p>
          {/* Add more details based on your database schema */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddressModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UnsolvedNonRegShopReport;
