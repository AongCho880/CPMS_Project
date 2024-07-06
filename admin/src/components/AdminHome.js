import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const AdminHome = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} className="text-center">
          <h1>Welcome to Admin Panel</h1>
          <Link to="/admin-login" className="btn btn-primary mt-3 me-2">
            Login
          </Link>
          <Link to="/admin-register" className="btn btn-secondary mt-3">
            Register
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
