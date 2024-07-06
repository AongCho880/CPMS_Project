import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "../App.css";

const AdminRegister = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("I am from AdminRegister");
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/admin/admin-register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();

      console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setRegistrationSuccess(true);
        // toast.success("Register Successfully");
      } else {
        setAuth(false);
        // toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000); // Hide success message after 3 seconds
    }
  }, [registrationSuccess]);

  return (
    <div className="container-shop">
      <Fragment>
        <Container className="d-flex flex-column align-items-center justify-content-center my-5">
          <div className="login-box-shop">
            <h2 className="mb-4">Admin Register</h2>
            {registrationSuccess && (
              <div className="alert alert-success" role="alert">
                Registration Successful! You can now login.
              </div>
            )}
            <Form onSubmit={onSubmitForm} className="needs-validation">
              <Form.Group controlId="email">
                <Form.Label className="mb-1">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email Address"
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
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
                  className="my-3"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="btn-block my-3"
              >
                Register
              </Button>
              <p className="text-center">Or</p>
              <Link
                to="/admin-login"
                className="btn btn-success btn-block my-3"
              >
                Login
              </Link>
            </Form>
          </div>
        </Container>
      </Fragment>
      {registrationSuccess && <Redirect to="/admin-login" />}
    </div>
  );
};

export default AdminRegister;
