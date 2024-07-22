import { useState, useEffect } from "react";
import { Button, Form, Modal, Card, Row, Col } from "react-bootstrap";
import {
  getHospitalsByCity,
  deleteHospital,
} from "../services/hospitalService";
import AddHospitalDetailsForm from "./AddHospitalDetailsForm";
import "./styles.css";


const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState("");
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    if (city) {
      fetchHospitals();
    }
  }, [city]);

  const fetchHospitals = async () => {
    try {
      const response = await getHospitalsByCity(city);
      setHospitals(response.data);
    } catch (error) {
      alert("Error fetching hospitals");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      try {
        await deleteHospital(id);
        setHospitals(hospitals.filter((hospital) => hospital._id !== id));
      } catch (error) {
        alert("Error deleting hospital");
      }
    }
  };

  const handleAddDetails = (hospital) => {
    setSelectedHospital(hospital);
    setShowAddDetails(true);
  };

  const handleShowDetails = (hospital) => {
    setSelectedHospital(hospital);
    setShowDetails(true);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Search by City</Form.Label>
        <Form.Control
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
      </Form.Group>
      <Row xs={1} md={2} lg={3} className="g-4">
        {hospitals.map((hospital) => (
          <Col key={hospital._id}>
            <Card
              onClick={() => handleShowDetails(hospital)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={hospital.image}
                alt={hospital.name}
                className="card-img-top"
              />
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>Rating: {hospital.rating}</Card.Text>
                <Button
                  variant="info"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddDetails(hospital);
                  }}
                  className="me-2"
                >
                  Add Details
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(hospital._id);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showAddDetails} onHide={() => setShowAddDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hospital Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddHospitalDetailsForm
            hospitalId={selectedHospital?._id}
            onSuccess={() => {
              setShowAddDetails(false);
              fetchHospitals();
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedHospital?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img
              variant="top"
              src={selectedHospital?.image}
              alt={selectedHospital?.name}
              className="card-img-top"
            />
            <Card.Body>
              <Card.Text>Rating: {selectedHospital?.rating}</Card.Text>
              <Card.Text>City: {selectedHospital?.city}</Card.Text>
              <Card.Text>
                Description:{" "}
                {selectedHospital?.description || "No description available"}
              </Card.Text>
              <Card.Text>
                Number of Doctors: {selectedHospital?.numberOfDoctors || "N/A"}
              </Card.Text>
              <Card.Text>
                Number of Departments:{" "}
                {selectedHospital?.numberOfDepartments || "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HospitalList;
