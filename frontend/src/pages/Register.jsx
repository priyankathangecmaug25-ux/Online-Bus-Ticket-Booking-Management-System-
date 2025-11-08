import React, { useState } from "react";
import { Container, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { registerUser } from "../api/api";
import { emailRegex, passwordRegex, phoneRegex } from "../utils/validators";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.fullname.trim()) e.fullname = "Full name is required";
    if (!emailRegex.test(form.email)) e.email = "Invalid email";
    if (!phoneRegex.test(form.phone)) e.phone = "Phone must be 10 digits";
    if (!passwordRegex.test(form.password))
      e.password = "Password min 6 chars and include letters+numbers";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerUser(form);
      
     
      setToastMsg("Registration successful! Redirecting...");
      setToastVariant("success");
      setShowToast(true);

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setToastMsg(err.response?.data?.message || "Registration failed");
      setToastVariant("danger");
      setShowToast(true);
    }
  }

  return (
    <Container style={{ maxWidth: 600 }}>
      
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          bg={toastVariant}
          delay={2000}
          autohide
          onClose={() => setShowToast(false)}
        >
          <Toast.Body className="text-white fw-semibold">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <h2 className="mb-3">Sign Up</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
          {errors.fullname && <div className="text-danger small">{errors.fullname}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div className="text-danger small">{errors.email}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <div className="text-danger small">{errors.phone}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <div className="text-danger small">{errors.password}</div>}
        </Form.Group>

        <Button type="submit" className="w-100">Register</Button>
      </Form>
    </Container>
  );
}
