import React from "react";
import { Navbar as BSNav, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
   const role = user?.role || "";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <BSNav bg="light" expand="lg" className="mb-1 shadow-sm">
      <Container>
        <BSNav.Brand as={Link} to="/">
        <img
      src="/src/assets/images/Buslogo.jpg"   
      alt="Logo"
      style={{ width: "65px", height: "60px", marginRight: "10px",border: "2px solid #0d6efd",borderRadius: "8px"}}
    /><span className="brand-text">Bus Karo</span>
        </BSNav.Brand>
        <BSNav.Toggle aria-controls="basic-navbar-nav" />
        <BSNav.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/mybookings" className="nav-link-custom">My Bookings</Nav.Link>
            {role === "admin" && (
              <Nav.Link as={Link} to="/dashboard" className="nav-link-custom">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
            
            
          <Nav>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
              </>
            ) : (
              <>
                {token && (
            <span className="nav-link">
              Hi, {role === "admin" ? "Admin" : user?.fullname || "User"}
            </span>
          )}
          
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Nav>
        </BSNav.Collapse>
      </Container>
    </BSNav>
  );
}
