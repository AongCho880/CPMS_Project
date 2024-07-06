import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "../style/AdminDashboard.css";
import BarChart from "./BarChart"; // Import the BarChart component
import ShowProductlistdash from "./ShowProductlistDash";
import AddProduct from "./AddProduct";
import RegReportPage from "./RegReportPage";
import NonRegReportPage from "./NonRegReportPage";

const AdminDashboard = ({ setAuth }) => {
  const [mail, setMail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/admin-dashboard", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const data = await res.json();
        setMail(data.email);

        console.log("faslfjsahf;sff------", data);
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      } catch (err) {
        console.error(err.message);
      }
    };

    getProfile();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <h4>Admin Dashboard</h4>
            <p>{mail}</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin-dashboard">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/add-product">
                Add Product
              </Nav.Link>
              <Nav.Link as={Link} to="/regreport">
                Reg Report
              </Nav.Link>
              <Nav.Link as={Link} to="/nonregreport">
                Non-Reg Report
              </Nav.Link>
              {/* <Nav.Link href="#">Users</Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link> */}
              <Button variant="light" onClick={logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container mt-5">
          <Switch>
            <Route exact path="/admin-dashboard">
              {isLoggedIn && <BarChart />} {/* Render BarChart if logged in */}
            </Route>
            <Route path="/products">
              <ShowProductlistdash />
            </Route>
            <Route path="/add-product">
              <AddProduct />
            </Route>
            <Route path="/regreport">
              <RegReportPage />
            </Route>
            <Route path="/nonregreport">
              <NonRegReportPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default AdminDashboard;
