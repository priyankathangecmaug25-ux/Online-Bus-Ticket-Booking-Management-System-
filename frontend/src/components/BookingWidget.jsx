import React, { useState } from "react";
import { Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { addBooking } from "../api/api";

export default function BookingWidget({ busId }) {
  const [form, setForm] = useState({ seats: "", payment_mode: "Online" });


  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  async function handleSubmit(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      setToastMsg("Please login first.");
      setToastVariant("warning");
      setShowToast(true);
      return;
    }

    const bookingData = {
      user_id: user.id,
      bus_id: busId,
      seats: form.seats,
      payment_mode: form.payment_mode,
      status: "Confirmed"
    };


    try {
      await addBooking(bookingData);

      setToastMsg("Booking confirmed!");
      setToastVariant("success");
      setShowToast(true);

      setForm({ seats: "", payment_mode: "Online" });
    } catch (error) {
      setToastMsg("Failed to book ticket. Try again.");
      setToastVariant("danger");
      setShowToast(true);
      console.error(error);
    }
  }

  return (
    <>

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

      <Card className="p-3 shadow-sm mt-3">
        <h4>Book Bus ID: {busId}</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>No. of Seats</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="Enter number of seats"
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Mode</Form.Label>
            <Form.Select
              value={form.payment_mode}
              onChange={(e) =>
                setForm({ ...form, payment_mode: e.target.value })
              }
            >
              <option>Online</option>
              <option>Cash</option>
              <option>Card</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Confirm Booking
          </Button>
        </Form>
      </Card>
    </>
  );
}
