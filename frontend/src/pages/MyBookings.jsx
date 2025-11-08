import React, { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";
import { getBookingsByUser, getAllBookings } from "../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load user and role BEFORE useEffect
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role?.toLowerCase(); 

  useEffect(() => {
    async function loadBookings() {
      if (!user) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        let res;
        if (role === "admin") {
          //Admin sees all bookings
          res = await getAllBookings();
        } else {
          // User sees only their bookings
          res = await getBookingsByUser(user.id);
        }

        setBookings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [user, role]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container className="my-4">
      <h2>{role === "admin" ? "All Customer Bookings" : "My Bookings"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sr No.</th>
            {role === "admin" && <th>Customer</th>}
            <th>Bus Name</th>
            <th>Seats</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={role === "admin" ? 7 : 6} className="text-center text-muted">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((b, i) => (
              <tr key={b.id}>
                <td>{i + 1}</td>
                {role === "admin" && <td>{b.user_name || b.user_email || "N/A"}</td>}
                <td>{b.bus_name || b.bus_id}</td>
                <td>{b.seats}</td>
                <td>₹{b.total_amount}</td>
                <td>{b.status}</td>
                <td>{new Date(b.created_at || Date.now()).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      <footer className="bg-light py-3 text-center border-top mt-5">
        <small>
          &copy; {new Date().getFullYear()} Online Ticket Booking System. All
          Rights Reserved.
        </small>
      </footer>
    </Container>
  );
}
