
import React, { useEffect, useState } from "react";
import { Container, Button, Table, Spinner, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAllBuses,
  deleteBus,
} from "../api/api.js";
import BookingWidget from "../components/BookingWidget";

export default function Dashboard() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); 

  const busId = searchParams.get("busId");

  // Read user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  // Load all buses 
  useEffect(() => {
    async function loadBuses() {
      if (role === "admin") {
        try {
          const res = await getAllBuses();
          setBuses(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch buses");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadBuses();
  }, [role]);

  // Delete bus
  const handleDelete = async (id) => {
  console.log("Deleting bus with id:", id);
  try {
    const res = await deleteBus(id);
    console.log("Delete response:", res);

    setToastMessage("Bus deleted successfully!");
    setToastVariant("success");
    setShowToast(true);

    setBuses(prev => prev.filter(bus => bus.id !== id));
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);

    setToastMessage(err.response?.data?.message || "Failed to delete bus");
    setToastVariant("danger");
    setShowToast(true);
  }
};


  
  const handleAddBus = () => navigate("/add-bus");
  const handleEditBus = (id) => navigate(`/editbus/${id}`);

  
  
  

  return (
    <Container className="my-4">
      {/* USER VIEW */}
      {role === "customer" && (
        <>
          <p className="lead text-center">
            Incredible Journey, Safest and Comfortable.
          </p>
          {busId && <BookingWidget busId={busId} />}
        </>
      )}

      {/* ADMIN VIEW */}
      {role === "admin" && (
        <>
          <h2 className="mb-3"> Bus Management Dashboard</h2>

          <div className="d-flex justify-content-between mb-3">
            <p className="text-muted">Manage, add, or remove buses below.</p>
            <Button variant="success" onClick={() => navigate("/addbus")}>
              Add New Bus

            </Button>
          </div>

          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Bus Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Price (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.length > 0 ? (
                  buses.map((bus, index) => (
                    <tr key={bus.id}>
                      <td>{index + 1}</td>
                      <td>{bus.bus_name}</td>
                      <td>{bus.source}</td>
                      <td>{bus.destination}</td>
                      <td>
                        {bus.date
                          ? new Date(bus.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{bus.price}</td>
                      <td className="d-flex gap-2 justify-content-center">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleEditBus(bus.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(bus.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No buses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </>
      )}
      {/* Footer */}
      <footer className="bg-light py-3 text-center border-top mt-5">
        <small>
          &copy; {new Date().getFullYear()} Online Ticket Booking System. All
          Rights Reserved.
        </small>
      </footer>
      <ToastContainer position="top-end" className="p-3">
  <Toast
    bg={toastVariant}
    onClose={() => setShowToast(false)}
    show={showToast}
    delay={2000}
    autohide
  >
    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
  </Toast>
</ToastContainer>
    </Container>
    
  );
}
