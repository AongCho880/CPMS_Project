import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import ShowProducts from "./ShowProducts";
import ShopDetails from "./ShopDetails";

const SDashboard = ({ setAuth }) => {
  const [profile, setProfile] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shopId, setShopId] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/shop-dashboard", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const data = await res.json();
        setProfile(data);
        setShopId(data.s_id);
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Router>
      <div className="full-screen">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">
              <img
                src={profile.s_selfiephoto}
                alt="Selfie"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "10px",
                }}
              />
              <span>{profile.s_name}</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link as={Link} to="/shop-dashboard">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/show-products">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/add-product">
                  Add Product
                </Nav.Link>
              </Nav>
              <Nav className="ml-5">
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/shop-dashboard">
            {isLoggedIn && <ShopDetails profile={profile} />}
          </Route>

          <Route path="/show-products">
            <ShowProducts shopId={shopId} />
          </Route>
          <Route path="/add-product">
            <AddProduct shopId={shopId} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default SDashboard;
