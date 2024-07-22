import { Container } from "react-bootstrap";
import EditHospitalForm from "../components/EditHospitalForm";

const EditHospital = () => {
  return (
    <Container>
      <h1 className="my-4">Edit Hospital</h1>
      <EditHospitalForm />
    </Container>
  );
};

export default EditHospital;
