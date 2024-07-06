import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import RegistrationForm from "./SRegister";
import "../Style/ShopLogin.css";

const SLogin = ({ setAuth }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleCloseRegistration = () => setShowRegistration(false);
  const handleShowRegistration = () => setShowRegistration(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const s_phone = formData.get("phone");
      const s_password = formData.get("password");

      const response = await fetch("http://localhost:5000/auth/shop-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          s_phone: s_phone,
          s_password: s_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setAuth(true);
        console.log("Login successful:", data);
      } else {
        alert("Invalid Credential.");
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="container-shop">
      <div className="login-box-shop">
        <h2 className="mb-4">Shop Login</h2>
        <form onSubmit={handleLoginSubmit} className="needs-validation">
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              required
            />
            <div className="invalid-feedback">
              Please enter your phone number.
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
          <Modal.Title>Shop Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm handleClose={handleCloseRegistration} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SLogin;

// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import RegistrationForm from "./SRegister";
// import "../Style/ShopLogin.css";

// const SLogin = ({ setAuth }) => {
//   const [showRegistration, setShowRegistration] = useState(false);

//   const handleCloseRegistration = () => setShowRegistration(false);
//   const handleShowRegistration = () => setShowRegistration(true);

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData(e.target);
//       const s_phone = formData.get("phone"); // Use "phone" here
//       const s_password = formData.get("password"); // Use "password" here

//       const response = await fetch("http://localhost:5000/auth/shop-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           s_phone: s_phone,
//           s_password: s_password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Login successful, handle the response accordingly
//         localStorage.setItem("token", data.token);
//         setAuth(true);
//         console.log("Login successful:", data);
//       } else {
//         // Login failed, handle the response accordingly
//         alert("Invalid Credential.");
//         console.error("Login failed:", data);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error.message);
//     }
//   };

//   return (
//     <div className="home-container mt-5">
//       <h2 className="mb-4">Shop Login</h2>
//       <form onSubmit={handleLoginSubmit} className="needs-validation">
//         <div className="mb-3">
//           <label htmlFor="phone" className="form-label">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             className="form-control"
//             id="phone"
//             name="phone"
//             placeholder="Enter phone number"
//             required
//           />
//           <div className="invalid-feedback">
//             Please enter your phone number.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             placeholder="Password"
//             required
//           />
//           <div className="invalid-feedback">Please enter your password.</div>
//         </div>
//         <button type="submit" className="btn btn-primary me-2">
//           Login
//         </button>
//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={handleShowRegistration}
//         >
//           Register
//         </button>
//       </form>

//       <Modal show={showRegistration} onHide={handleCloseRegistration}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shop Registration</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <RegistrationForm handleClose={handleCloseRegistration} />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default SLogin;
