import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const { state } = useLocation();
  const { totalPrice, roomName } = state || {};
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
      return;
    }

    alert(`Payment of $${totalPrice} for ${roomName} successful!`);
    navigate('/profile'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Complete Your Booking</h2>
        <p className="mb-2 text-gray-700">Room: <span className="font-medium">{roomName}</span></p>
        <p className="mb-4 text-gray-700">Total Price: <span className="font-medium">${totalPrice}</span></p>
        <form onSubmit={handlePayment}>
          <div className="mb-4 border rounded-lg p-3">
            <CardElement 
              options={{ 
                style: { 
                  base: { 
                    fontSize: '16px', 
                    color: '#32325d',
                    '::placeholder': { color: '#a0aec0' }
                  },
                },
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={!stripe} 
            className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-gray-800 transition duration-300"
          >
            Pay ${totalPrice}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
