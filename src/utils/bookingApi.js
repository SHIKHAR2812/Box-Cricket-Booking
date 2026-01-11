import axios from 'axios';
import API_URL from './api';

export const getAllBookings = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
