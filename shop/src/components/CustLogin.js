import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import RegistrationForm from "./CustRegistration";
import "../Style/ShopLogin.css";

const CustLogin = ({ setAuth }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleCloseRegistration = () => setShowRegistration(false);
  const handleShowRegistration = () => setShowRegistration(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const c_phone = formData.get("phone");
      const c_password = formData.get("password");

      const response = await fetch("http://localhost:5000/auth/cust-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          c_phone: c_phone,
          c_password: c_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setAuth(true);
      } else {
        alert("Invalid Credential");
      }
    } catch (error) {
      console.error("Error logging in: ", error.message);
    }
  };

  return (
    <div className="container-shop">
      <div className="login-box-shop">
        <h2 className="mb-4">Customer Login</h2>
        <form onSubmit={handleLoginSubmit} className="needs-validation">
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              required
            />
            <div className="invalid-feedback">
              Please enter your phone number
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">Please enter your password.</div>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Login
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleShowRegistration}
          >
            Register
          </button>
        </form>
      </div>
      <Modal show={showRegistration} onHide={handleCloseRegistration}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm handleClose={handleCloseRegistration} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustLogin;
