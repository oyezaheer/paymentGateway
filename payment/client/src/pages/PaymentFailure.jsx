import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailure = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Payment Failed
      </h2>
      <p className="mb-4">Something went wrong with your payment. Please try again.</p>
      <Link to="/cart" className="text-blue-600 hover:text-blue-700">
        Return to Cart
      </Link>
    </div>
  );
};

export default PaymentFailure;