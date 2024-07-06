import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "../App.css";

const AdminLogin = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/admin/admin-login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      console.log("This is token: ", parseRes.token);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        // toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        // toast.error(parseRes);
      }
    } catch (err) {
      alert("Credentials do not match !!!");
    }
  };

  return (
    <div className="container-shop">
      <Fragment>
        <Container className="d-flex flex-column align-items-center justify-content-center my-5">
          <div className="login-box-shop">
            <h2 className="mb-4">Admin Login</h2>

            <Form onSubmit={onSubmitForm} className="needs-validation">
              <Form.Group controlId="email">
                <Form.Label className="mb-1">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  className="my-3"
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="mb-1">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  className="my-3"
                  required
                />
              </Form.Group>
              <Button type="submit" variant="success" className="btn-block">
                Login
              </Button>
              <p className="text-center my-2">Or</p>
              <Link
                to="/admin-register"
                className="btn btn-primary btn-block my-2"
              >
                Register
              </Link>
            </Form>
          </div>
        </Container>
      </Fragment>
    </div>
  );
};

export default AdminLogin;
