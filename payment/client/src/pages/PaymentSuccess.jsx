import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h2>
      <p className="mb-4">Thank you for your purchase.</p>
      <Link to="/" className="text-blue-600 hover:text-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
};

export default PaymentSuccess;