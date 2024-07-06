import React, { useState, useEffect } from "react";
import { debounce } from "lodash"; // Import debounce function
import "../Style/CustProfile.css";
import { Table, Button, Modal } from "react-bootstrap";

const CustProfile = ({ profile }) => {
  console.log("Called ---------- ", profile.c_phone);
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productPhotoUrl, setProductPhotoUrl] = useState("");
  const [ShopPhotoUrl, setShopPhotoUrl] = useState("");
  const [ShowModal, setShowModal] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    if (profile.c_phone) {
      // Debounce fetchReports function
      const debouncedFetchReports = debounce(fetchReports, 500);
      debouncedFetchReports();

      return () => {
        // Clear the debounce timeout on unmount
        debouncedFetchReports.cancel();
      };
    }
  }, [profile]); // Dependency added to fetch reports when profile changes

  const fetchReports = async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching data
      const response = await fetch(
        `http://localhost:5000/adminreport/all-reports/${profile.c_phone}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      console.log("From frontend all reports ----------", typeof data, data);
      setReportData(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching reports:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  // Get the current date
  // const currentDate = new Date().toLocaleDateString();

  const handlePhotoClick = (report) => {
    setProductPhotoUrl(report.p_photo); // Set the URL of the full-size product photo
  };
  const handleSPhotoClick = (report) => {
    setShopPhotoUrl(report.s_photo); // Set the URL of the full-size product photo
  };
  const viewShopDetails = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Generate table rows
  // const reportRows = [];
  // for (let i = 0; i < 10; i++) {
  // 	reportRows.push(
  // 		<tr key={i}>
  // 			<td>{currentDate}</td>
  // 			<td>Pending</td>
  // 			<td>
  // 				<img src="" alt="Product Img" />
  // 			</td>
  // 			<td>This is a sample description for the product.</td>
  // 			<td>
  // 				<Button>View Shop Info</Button>
  // 			</td>
  // 		</tr>
  // 	);
  // }

  return (
    <div className="profile-container">
      {/* Display loading state if data is still loading */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* First part - Customer Information */}
          <div className="customer-info">
            <div className="avatar">
              <img
                src={profile.c_selfiephoto}
                alt="Selfie"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="profile-info">
              <h2>{profile.c_name}</h2>
              <p>Phone: {profile.c_phone}</p>
            </div>
          </div>

          {/* Divider Line */}
          <div className="divider"></div>

          {/* Second part - Customer Report */}
          <div className="table-container-report">
            <Table striped bordered hover className="table">
              <thead>
                <tr>
                  <th className="table-heading-report">Report Date</th>
                  <th className="table-heading-report">Status</th>
                  <th className="table-heading-report">Product Photo</th>
                  <th className="table-heading-report">Description</th>
                  <th className="table-heading-report">Shop Info</th>
                </tr>
              </thead>
              <tbody className="report-table-body">
                {(reportData.rg_reports || reportData.nrg_reports) &&
                reportData ? (
                  Object.keys(reportData).map(
                    (reports, index) =>
                      reportData[reports] &&
                      reportData[reports].map((report, indx) => (
                        <tr key={indx}>
                          <td>{formatDate(report.date_time)}</td>
                          <td>{report.status}</td>
                          <td>
                            <img
                              src={report.p_photo}
                              alt="Product Img"
                              style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                overflow: "hidden",
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => handlePhotoClick(report)}
                            />
                          </td>
                          <td>{report.s_report_description}</td>
                          <td>
                            <Button onClick={() => viewShopDetails(report)}>
                              View Shop Info
                            </Button>
                          </td>
                        </tr>
                      ))
                  )
                ) : (
                  <tr>
                    <td colSpan="5">No reports found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Modal
              show={ShowModal}
              onHide={() => setShowModal(false)}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Customer Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Shop Name</th>
                      <th>Shop Photo</th>
                      <th>Shop Phone</th>
                      <th>Shop Address</th>
                      <th>Google Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedReport && selectedReport.s_name}</td>
                      <td>
                        <img
                          src={selectedReport && selectedReport.s_photo}
                          alt="Selfie"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            overflow: "hidden",
                            marginRight: "10px",
                            cursor: "pointer", // Add cursor pointer for clickable effect
                          }}
                          onClick={() => handleSPhotoClick(selectedReport)}
                        />
                      </td>
                      <td>
                        {selectedReport && selectedReport.s_phone
                          ? selectedReport.s_phone
                          : "Nonregistered Shop"}
                      </td>

                      <td>
                        {selectedReport &&
                          `${selectedReport.s_road}, ${selectedReport.s_word}, ${selectedReport.s_union}, ${selectedReport.s_subdist}, ${selectedReport.s_dist}, ${selectedReport.s_div}`}
                      </td>
                      <td>{selectedReport && selectedReport.s_location}</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={ShopPhotoUrl !== ""}
              onHide={() => setShopPhotoUrl("")}
              size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title>Full Size Shop Photo</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={ShopPhotoUrl}
                  alt="Full Size Img"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShopPhotoUrl("")}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={productPhotoUrl !== ""}
              onHide={() => setProductPhotoUrl("")}
              size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title>Full Size Product Photo</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={productPhotoUrl}
                  alt="Full Size Img"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setProductPhotoUrl("")}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default CustProfile;
