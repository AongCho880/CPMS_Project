import React, { useState, useEffect } from "react";
import { debounce } from "lodash"; // Import debounce function
import "../Style/ShopDetails.css";
import { Table, Button, Modal } from "react-bootstrap";

const ShopDetails = ({ profile }) => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productPhotoUrl, setProductPhotoUrl] = useState("");

  useEffect(() => {
    if (profile.s_phone) {
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
        `http://localhost:5000/adminreport/all-reports/shop/${profile.s_phone}`,
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

  const handlePhotoClick = (report) => {
    setProductPhotoUrl(report.p_photo); // Set the URL of the full-size product photo
  };

  return (
    <div className="profile-container">
      {/* Display loading state if data is still loading */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* First part - Shop Information */}
          <div className="shop-info-container">
            <h1>Shop Info</h1>
            <div className="avatar">
              <img
                src={profile.s_selfiephoto}
                alt="Selfie"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  overflow: "hidden",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="profile-info">
              <h2>{profile.s_name}</h2>
              <h4>ID: {profile.s_id}</h4>
              <h5>Phone: {profile.s_phone}</h5>
            </div>
            <div className="profile-info">
              <h6>
                Address: {profile.s_road}, {profile.s_word}, {profile.s_union}
                {profile.s_subdistict}, {profile.s_dist}, {profile.s_div}
              </h6>
            </div>
          </div>

          {/* Divider Line */}
          <div className="divider"></div>

          {/* Second part - Shop Reports */}
          <div className="table-container-rep">
            {reportData.length === 0 ? (
              <h4>No reports</h4>
            ) : (
              <div>
                <h2>Shop Reports :</h2>
                <Table striped bordered hover className="table-rep">
                  <thead>
                    <tr>
                      <th className="table-heading-rep">Report Date</th>
                      <th className="table-heading-rep">Product Name</th>
                      <th className="table-heading-rep">Product Photo</th>
                      <th className="table-heading-rep">Description</th>
                      <th className="table-heading-rep">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((report) => (
                      <tr key={report.r_id}>
                        <td>{formatDate(report.date_time)}</td>
                        <td>{report.p_name}</td>
                        <td>
                          <img
                            src={report.p_photo}
                            alt="Product"
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            onClick={() => handlePhotoClick(report)}
                          />
                        </td>
                        <td>{report.s_report_description}</td>
                        <td>{report.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

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

export default ShopDetails;

{
  /* <div className="container_cust-product">
        <div className="container-cust">
          <h2 className="mb-4">Shop Information</h2>
              <div className="mb-3 shop-owner-container">
                <img
                  src={`${profile.s_photo}`}
                  alt="Shop Img"
                  className="shop-image"
                />
                <h3>{profile.s_name}</h3>
                <p>
                  <strong>ID:</strong> {profile.s_id}
                </p>
                <p>
                  <strong>Phone:</strong> {profile.s_phone}
                </p>
              </div>
        </div>

        <div style={{ flex: 1 }}>
          
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
        </div>
      </div>



 */
}

// import React from "react";

// const ShopDetails = ({ profile }) => {
//     return (
//         <div style={{ display: "flex", alignItems: "center" }}>
//             {/* Shop Images */}
//             <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
//                 <img src={profile.s_selfiephoto} alt="Profile" style={{ width: "100%", marginBottom: "10px" }} />
//                 <img src={profile.s_frontnid} alt="Profile" style={{ width: "100%", marginBottom: "10px" }} />
//                 <img src={profile.s_backnid} alt="Profile" style={{ width: "100%", marginBottom: "10px" }} />
//             </div>

//             {/* Shop Information */}
//             <div style={{ flex: "1" }}>
//                 <h2>Shop Details</h2>
//                 <p><strong>Shop Name:</strong> {profile.s_name}</p>
//                 <p><strong>Shop ID:</strong> {profile.s_id}</p>
//                 <p><strong>Phone:</strong> {profile.s_phone}</p>
//                 <p><strong>Division:</strong> {profile.s_div}</p>
//                 <p><strong>District:</strong> {profile.s_dist}</p>
//                 <p><strong>Subdistrict:</strong> {profile.s_subdist}</p>
//                 <p><strong>Union:</strong> {profile.s_union}</p>
//                 <p><strong>Road:</strong> {profile.s_road}</p>
//                 {/* Add more details as needed */}
//             </div>
//         </div>
//     );
// };

// export default ShopDetails;
