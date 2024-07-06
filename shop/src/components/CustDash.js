import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Tab, Nav, Navbar, Container } from 'react-bootstrap';
import "../Style/CustDash.css";
import Profile from "./CustProfile";
import Shop from "./CustShop";
import Report from "./CustReport";
import CustProducts from "./CustProducts";

const CustDash = ({ setAuth }) => {
    const [profile, setProfile] = useState({});
    const [activeTab, setActiveTab] = useState("profile");
    const history = useHistory();

    useEffect(() => {
        const fetchAll = async () => {
            await getProfile();
        };
        fetchAll();
    }, []);

    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:5000/auth/cust-dashboard", {
                method: "GET",
                headers: { token: localStorage.token },
            });
            const parseData = await res.json();
            setProfile(parseData);
        } catch (err) {
            console.log("Customer profile error:", err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        history.push("/customer-login");
    };

    const handleTabSelect = (key) => {
        setActiveTab(key);
    };

    return (
        <div className="full-screen">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#">
                        <img src={profile.c_selfiephoto} alt="Selfie" style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            overflow: "hidden",
                            marginRight: "10px"
                        }} />
                        <span>{profile.c_name}</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav onSelect={handleTabSelect}>
                            <Nav.Link eventKey="profile" active={activeTab === "profile"}>Profile</Nav.Link>
                            <Nav.Link eventKey="shop" active={activeTab === "shop"}>Shop</Nav.Link>
                            <Nav.Link eventKey="report" active={activeTab === "report"}>Report</Nav.Link>
                            <Nav.Link eventKey="products" active={activeTab === "products"}>Products</Nav.Link>
                        </Nav>
                        <Nav className="ml-5">
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className="mt-5">
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                    <Tab.Content>
                        <Tab.Pane eventKey="profile">
                            <Profile profile={profile} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="shop">
                            <Shop profile={profile} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="report">
                            <Report profile={profile}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="products">
                            <CustProducts />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
};

export default CustDash;
