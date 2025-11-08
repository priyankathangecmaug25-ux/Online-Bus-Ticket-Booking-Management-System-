import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

export default function About() {
  return (
    <div>
      
      <div className="bg-primary text-white text-center py-5">
        <h1>About Online Ticket Booking System</h1>
        <p className="lead">
          Fast • Secure • Reliable — Book your tickets anytime, anywhere
        </p>
      </div>

      {/* Main Content */}
      <Container className="my-5">
        <Row className="align-items-center mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <Image
              src="/src/assets/images/aboutus.jpg"
              alt="Bus Travel"
              fluid
              rounded
              className="shadow-sm"
              height={50}
            />
          </Col>
          <Col md={6}>
            <h2>Who We Are</h2>
            <p>
              The <strong>Online Ticket Booking System</strong> is designed to
              simplify your travel experience. Whether it’s for a daily commute,
              a weekend getaway, or an outstation trip, our platform provides
              hassle-free ticket booking with real-time bus schedules and secure
              payment options.
            </p>
            <p>
              Our mission is to make travel planning easier, faster, and more
              convenient for everyone — from students to business travelers.
            </p>
            <p>This platform is developed using modern full-stack technologies, including React for the frontend, Node.js & Express for the backend, MySQL for database management, and Bootstrap/React-Bootstrap for responsive UI design.</p>
          </Col>
        </Row>

        {/* Core Values */}
        <Row className="text-center mb-5">
          <h2 className="mb-4">Our Core Values</h2>
          <Col md={4} sm={12} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Efficiency</Card.Title>
                <Card.Text>
                  Book your tickets in seconds with our user-friendly interface
                  and real-time availability.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Security</Card.Title>
                <Card.Text>
                  We ensure your payments and personal data are fully protected
                  using modern encryption standards.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Support</Card.Title>
                <Card.Text>
                  Our customer support team is always ready to assist you 24/7
                  with booking issues or queries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Our Team Section */}
        <Row className="text-center mb-5">
          <h2 className="mb-4">Meet Our Team</h2>

          <Col md={4} sm={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="/src/assets/images/Priyanka.jpg"
                height={400}
                alt="Team Member 1"
              />
              <Card.Body>
                <Card.Title>Priyanka Thange</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Software Developer
                </Card.Subtitle>
                <Card.Text>
                  I designed and developed the UI and UX Home and About pages with a clean, responsive, and visually appealing layout.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/priyanka-thange-495386269"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", textDecoration: "none", color: "#0a66c2" }}
                  > LinkedIn Profile
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="/src/assets/images/Vedant.jpg"
                alt="Team Member 2"
                height={400}
              />
              <Card.Body>
                <Card.Title>Vedant Padave</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Software Developer
                </Card.Subtitle>
                <Card.Text>
                  Focused on creating a responsive and user-friendly interface. I have designed and developed the Dashboard and My Bookings page.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/vedant-padave-b98b33348"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", textDecoration: "none", color: "#0a66c2" }}
                  > LinkedIn Profile
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="/src/assets/images/Mujahid.jpg"
                alt="Team Member 3"
                height={400}
              />
              <Card.Body>
                <Card.Title>Mujahid Bagwan</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Software Developer
                </Card.Subtitle>
                <Card.Text>
                  My role in this project is to build a reliable bus booking platform with secure login and signup features and a user-friendly interface.
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/mujahid-bagwan-928a02282"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", textDecoration: "none", color: "#0a66c2" }}
                  > LinkedIn Profile
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Us */}
        <Row className="text-center">
          <h2 className="mb-4">Contact Us</h2>
          <Col md={4} sm={12} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>📍 Address</Card.Title>
                <Card.Text>
                  Travel Avenue, Mumbai, Maharashtra, India
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>📧 Email</Card.Title>
                <Card.Text>buskaro@gmail.com</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>📞 Phone</Card.Title>
                <Card.Text>+91 98765 43210</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-light py-3 text-center border-top mt-5">
        <small>
          &copy; {new Date().getFullYear()} Online Ticket Booking System. All
          Rights Reserved.
        </small>
      </footer>
    </div>
  );
}
