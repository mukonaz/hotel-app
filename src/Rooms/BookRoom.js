import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { db } from '../firebase'; // Firebase setup
import { useAuth } from '../authContext'; // Authentication context

// Load Stripe with your publishable key
const stripePromise = loadStripe(''); // Use your Stripe publishable key

const BookRoomForm = ({ roomId, handleBookingSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Check if Stripe has been initialized correctly
    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true); // Set loading state

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const res = await fetch('http://localhost:4242/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: 5000, // Price in cents (e.g., $50.00)
          }),
        });

        const { clientSecret } = await res.json();

        const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
          payment_method: id,
        });

        if (confirmPayment.paymentIntent.status === 'succeeded') {
          // Payment successful, now proceed with booking in Firebase
          handleBookingSuccess();
        } else {
          alert('Payment failed');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed: ' + error.message);
      }
    } else {
      console.error(error);
      alert(error.message);
    }

    setPaymentProcessing(false); // Reset loading state
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || paymentProcessing}>
        {paymentProcessing ? 'Processing...' : 'Pay & Book'}
      </button>
    </form>
  );
};

const BookRoom = ({ roomId }) => {
  const { currentUser } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Show/Hide payment form

  const handleBookingSuccess = async () => {
    // Add booking to Firestore after successful payment
    try {
      await db.collection('bookings').add({
        roomId: roomId,
        userId: currentUser.uid,
        date: new Date(),
      });
      alert('Room booked successfully!');
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Error booking room: ' + error.message);
    }
  };

  const handleBookNowClick = () => {
    setShowPaymentForm(true); // Show payment form when "Book Now" is clicked
  };

  return (
    <div>
      {!showPaymentForm ? (
        <button onClick={handleBookNowClick}>Book Now</button> // Trigger payment form
      ) : (
        <Elements stripe={stripePromise}>
          <BookRoomForm roomId={roomId} handleBookingSuccess={handleBookingSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default BookRoom;
