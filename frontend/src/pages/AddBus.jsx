import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Toast, ToastContainer } from "react-bootstrap";
import { addBus } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddBus() {
  const [formData, setFormData] = useState({
    bus_name: "",
    source: "",
    destination: "",
    date: "",
    departure_time: "",
    arrival_time: "",
    total_seats: "",
    price: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBus(formData);
      setToastMsg("Bus added successfully!");
      setToastVariant("success");
      setShowToast(true);

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setToastMsg("Failed to add bus!");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <Container className="mt-5">
      
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          bg={toastVariant}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white fw-semibold">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Add New Bus</h3>

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Bus Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="bus_name"
                        value={formData.bus_name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Total Seats</Form.Label>
                      <Form.Control
                        type="number"
                        name="total_seats"
                        value={formData.total_seats}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Source</Form.Label>
                      <Form.Control
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Destination</Form.Label>
                      <Form.Control
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Departure Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="departure_time"
                        value={formData.departure_time}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Arrival Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="arrival_time"
                        value={formData.arrival_time}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Price (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button type="submit" className="px-5 py-2">
                    Add Bus
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
