
import React, { useState } from "react";
import { loginUser, loginAdmin } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password, role };

    try {
      const response =
        role === "admin" ? await loginAdmin(data) : await loginUser(data);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToastMessage("Login successful!");
      setToastVariant("success");
      setShowToast(true);

      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error) {
      setToastMessage(error.response?.data?.message || "Login failed");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastVariant}
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white fw-semibold">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <h3 className="text-center mb-4">Login</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Login As</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="text-center mt-2">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#d32f2f", cursor: "pointer", fontWeight: "600" }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
