import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const initiatePayment = async (email, items) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/payment/checkout`, {
      email,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};