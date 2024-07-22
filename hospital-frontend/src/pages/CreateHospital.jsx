import { Container } from "react-bootstrap";
import HospitalForm from "../components/HospitalForm";

const CreateHospital = () => {
  return (
    <Container>
      <h1 className="my-4">Create New Hospital</h1>
      <HospitalForm />
    </Container>
  );
};

export default CreateHospital;
