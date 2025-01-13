import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCheckout = () => {
    // Navigate to the checkout page instead of directly to API
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {state.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">
                {item.quantity} x {formatPrice(item.price)}
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>{formatPrice(state.total)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 inline-block text-center"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
