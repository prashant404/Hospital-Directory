import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getHospitalsByCity, updateHospital } from '../services/hospitalService';

const EditHospitalForm = () => {
  const [hospital, setHospital] = useState({
    rating: 0,
    image: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospital();
  }, []);

  const fetchHospital = async () => {
    try {
      const response = await getHospitalsByCity('');
      const foundHospital = response.data.find(h => h._id === id);
      if (foundHospital) {
        setHospital({
          rating: foundHospital.rating || 0,
          image: foundHospital.image || ''
        });
      }
    } catch (error) {
      alert('Error fetching hospital details');
    }
  };

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHospital(id, { 
        rating: parseFloat(hospital.rating), 
        image: hospital.image 
      });
      alert('Hospital updated successfully');
      navigate('/');
    } catch (error) {
      alert('Error updating hospital: ' + error.message);
    }
  };

  if (!hospital) return <div>Loading...</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" name="rating" value={hospital.rating} onChange={handleChange} required min="0" max="5" step="0.1" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="url" name="image" value={hospital.image} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Hospital
      </Button>
    </Form>
  );
};

export default EditHospitalForm;