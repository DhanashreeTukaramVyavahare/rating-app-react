import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/survey');
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Our Survey</h1>
      <button onClick={handleStart}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
