import { Container } from "react-bootstrap";
import HospitalDetails from "../components/HospitalDetails";

const HospitalDetailsPage = () => {
  return (
    <Container>
      <h1 className="my-4">Hospital Details</h1>
      <HospitalDetails />
    </Container>
  );
};

export default HospitalDetailsPage;
