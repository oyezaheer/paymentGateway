import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { initiatePayment } from '../../services/api';

function CheckoutForm() {
  const [email, setEmail] = useState('');
  const { cart } = useCart();

  const handlePayment = async () => {
    try {
      if (!cart || cart.length === 0) {
        alert('Cart is empty. Please add items before proceeding to checkout.');
        return;
      }

      const response = await initiatePayment(email, cart);
      console.log(response); // Debugging: Check response structure.

      if (response && response.url) {
        window.location.href = response.url; // Redirect to the payment gateway
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handlePayment}>Proceed to Checkout</button>
    </div>
  );
}

export default CheckoutForm;
