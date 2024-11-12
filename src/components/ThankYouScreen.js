import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you-screen">
      <h1>Thank you for your feedback!</h1>
      <p>Redirecting to the welcome screen...</p>
    </div>
  );
};

export default ThankYouScreen;
