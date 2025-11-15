import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import trackerImg from "../assets/Ao2_Tracker.png";

export default function HomePage() {
  return (
    <div className="py-5">
      <Container>

        {/* Hero Section */}
        <Row className="align-items-center mb-5">
          <Col md={6} className="text-center text-md-start">
            <h1 className="fw-bold display-5">AO2 Tracker</h1>
            <p className="lead mt-3">
              Easily scan, extract, and store your warranty information using
              AI-powered OCR & GPT. Never lose track of a warranty again.
            </p>

            <div className="mt-4">
              <Button
                as={Link}
                to="/scan"
                variant="primary"
                size="lg"
                className="me-3"
              >
                Scan Warranty
              </Button>
              <Button
                as={Link}
                to="/warranties"
                variant="primary"
                size="lg"
                className="me-3"
              >
                View My Warranties
              </Button>
            </div>
          </Col>

          <Col md={6} className="mt-4 mt-md-0 text-center">
            <img
              src={trackerImg}
              alt="Warranty Illustration"
              style={{ width: "65%" }}
            />
          </Col>
        </Row>

        {/* Feature Section */}
        <h2 className="fw-bold text-center mb-4">Why Use Warranty Keeper?</h2>

        <Row className="g-4">
          <Col md={4}>
            <Card className="p-3 h-100 shadow-sm bg-dark text-light">
              <Card.Body>
                <Card.Title className="fw-bold">📄 AI-Powered OCR</Card.Title>
                <Card.Text>
                  Upload an image or PDF of your receipt or warranty. Our system
                  reads the text automatically.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 h-100 shadow-sm bg-dark text-light">
              <Card.Body>
                <Card.Title className="fw-bold">🤖 GPT Data Extraction</Card.Title>
                <Card.Text>
                  Warranty details (purchase date, expiry, product name) are
                  automatically extracted using AI.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 h-100 shadow-sm bg-dark text-light">
              <Card.Body>
                <Card.Title className="fw-bold">☁️ Stored in Firebase</Card.Title>
                <Card.Text>
                  Your warranties are securely stored and linked to your
                  account. Access them anywhere, anytime.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
