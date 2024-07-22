import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Home from "./pages/Home";
import CreateHospital from "./pages/CreateHospital";
import HospitalDetailsPage from "./pages/HospitalDetailsPage";
import EditHospital from "./pages/EditHospital";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Hospital Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create">
                Create Hospital
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateHospital />} />
          <Route path="/hospital/:id" element={<HospitalDetailsPage />} />
          <Route path="/edit/:id" element={<EditHospital />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
