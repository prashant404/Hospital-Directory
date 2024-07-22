import { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getHospitalsByCity } from "../services/hospitalService";

const HospitalDetails = () => {
  const [hospital, setHospital] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchHospital();
  }, []);

  const fetchHospital = async () => {
    try {
      const response = await getHospitalsByCity("");
      const foundHospital = response.data.find((h) => h._id === id);
      setHospital(foundHospital);
    } catch (error) {
      alert("Error fetching hospital details");
    }
  };

  if (!hospital) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Img variant="top" src={hospital.image} />
      <Card.Body>
        <Card.Title>{hospital.name}</Card.Title>
        <Card.Text>
          City: {hospital.city}
          <br />
          Rating: {hospital.rating}
          <br />
          Description: {hospital.description || "No description available"}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          Specialities: {hospital.speciality.join(", ")}
        </ListGroup.Item>
        <ListGroup.Item>
          Number of Doctors: {hospital.numberOfDoctors || "N/A"}
        </ListGroup.Item>
        <ListGroup.Item>
          Number of Departments: {hospital.numberOfDepartments || "N/A"}
        </ListGroup.Item>
      </ListGroup>
      {hospital.additionalImages && (
        <Card.Body>
          <Card.Title>Additional Images</Card.Title>
          <div className="d-flex flex-wrap">
            {hospital.additionalImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Additional ${index + 1}`}
                className="m-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ))}
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default HospitalDetails;
