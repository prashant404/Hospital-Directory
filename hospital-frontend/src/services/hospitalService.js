import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/hospitals';

export const createHospital = async (hospitalData) => {
  return axios.post(`${API_URL}/create`, hospitalData);
};

export const getHospitalsByCity = async (city) => {
  return axios.get(`${API_URL}?city=${city}`);
};

export const deleteHospital = async (id) => {
  return axios.delete(`${API_URL}/delete?id=${id}`);
};

export const updateHospital = async (id, updateData) => {
  return axios.put(`${API_URL}/update?id=${id}`, updateData);
};

export const addHospitalDetails = async (id, detailsData) => {
  return axios.post(`${API_URL}/details?id=${id}`, detailsData);
};
