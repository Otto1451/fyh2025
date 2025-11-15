import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from "./useAuth";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

export default function Navigation() {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="px-4 mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          AO2 Tracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">

            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <>
                <Nav.Link as={Link} to="/scan">Scan Warranty</Nav.Link>
                <Nav.Link as={Link} to="/warranties">My Warranties</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
