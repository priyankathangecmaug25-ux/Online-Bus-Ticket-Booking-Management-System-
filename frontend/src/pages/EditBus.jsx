import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import { getBusById, updateBus } from "../api/api.js";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bus_name: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    date: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // ✅ Load existing bus data
  useEffect(() => {
    async function loadBus() {
      try {
        const res = await getBusById(id);
        setFormData(res.data);
      } catch (error) {
        setMessage("❌ Failed to load bus details");
      } finally {
        setLoading(false);
      }
    }
    loadBus();
  }, [id]);

  // 📝 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBus(id, formData);
      setMessage("✅ Bus updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage("❌ Failed to update bus");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="mt-4">
      <h3 className="mb-3">✏️ Edit Bus</h3>
      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Bus Name</Form.Label>
          <Form.Control
            name="bus_name"
            value={formData.bus_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Source</Form.Label>
          <Form.Control
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Departure Time</Form.Label>
          <Form.Control
            type="time"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arrival Time</Form.Label>
          <Form.Control
            type="time"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (₹)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Bus
        </Button>
      </Form>
    </Container>
  );
}
