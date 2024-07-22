import { Container } from "react-bootstrap";
import HospitalList from "../components/HospitalList";

const Home = () => {
  return (
    <Container>
      <h1 className="my-4">Hospitals</h1>
      <HospitalList />
    </Container>
  );
};

export default Home;
