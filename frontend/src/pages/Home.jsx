import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getAllBuses } from "../api/api";
import dayjs from "dayjs";

export default function Home() {
  const [buses, setBuses] = useState([]);
  const [filter, setFilter] = useState({ source: "", destination: "", date: "" });

  useEffect(() => {
    async function load() {
      try {
        const res = await getAllBuses();
        setBuses(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const filtered = buses.filter(b => {
    const matchSource = !filter.source || b.source.toLowerCase().includes(filter.source.toLowerCase());
    const matchDest = !filter.destination || b.destination.toLowerCase().includes(filter.destination.toLowerCase());
    const matchDate = !filter.date || (b.date === filter.date);
    return matchSource && matchDest && matchDate;
  });

  return (
    <Container>
      <div className="home-banner">
      
        <h1 className="mb-3">India's No. 1 online bus <br></br> ticket booking site</h1></div>
      
      <Form className="mb-3">
        <Row className="g-2">
          <Col sm={12} md={4}>
            <Form.Control placeholder="Source" value={filter.source} onChange={e => setFilter({...filter, source: e.target.value})}/>
          </Col>
          <Col sm={12} md={4}>
            <Form.Control placeholder="Destination" value={filter.destination} onChange={e => setFilter({...filter, destination: e.target.value})}/>
          </Col>
          <Col sm={12} md={3}>
            <Form.Control type="date" value={filter.date} onChange={e => setFilter({...filter, date: e.target.value})}/>
          </Col>
          <Row className="justify-content-center mt-4">
              <Col md="auto">
                <Button type="submit" className="search-btn px-5 py-2">
                  Search Buses
                </Button>
              </Col>
            </Row>
        </Row>
      </Form>

      <Row xs={1} md={2} lg={3} className="g-3">
        {filtered.map(bus => (
          <Col key={bus.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{bus.bus_name}</Card.Title>
                <Card.Text>
                  {bus.source} → {bus.destination} <br />
                  Departs: {bus.departure_time} • Arrives: {bus.arrival_time} <br />
                  Date: {dayjs(bus.date).format("DD MMM YYYY")} • ₹{bus.price}
                </Card.Text>
                <Button href={`/dashboard?busId=${bus.id}`} variant="primary">Book</Button>
              </Card.Body>
            </Card>
            
          </Col>
        ))}
      </Row>
      {/* Footer */}
      <footer className="bg-light py-3 text-center border-top mt-5">
        <small>
          &copy; {new Date().getFullYear()} Online Ticket Booking System. All
          Rights Reserved.
        </small>
      </footer>
    </Container>
    
  );
}
