import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data';

const SurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const sessionId = Date.now();

  const handleAnswerChange = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitSurvey();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitSurvey = () => {
    localStorage.setItem(`survey-${sessionId}`, JSON.stringify({
      sessionId,
      answers,
      status: 'COMPLETED',
    }));
    navigate('/thank-you');
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === 'rating') {
      return (
        <div>
          <p>{question.text}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {[...Array(question.scale)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handleAnswerChange(question.id, i + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: answers[question.id] === i + 1 ? '#007bff' : '#ddd',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (question.type === 'text') {
      return (
        <div>
          <p>{question.text}</p>
          <input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <h1>Customer Survey</h1>
      <div style={{ width: '300px', margin: '20px 0' }}>{renderQuestion()}</div>
      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <div>
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          style={{
            padding: '10px 20px',
            margin: '10px',
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            backgroundColor: '#007bff', // Blue color for Previous button
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#ff69b4', // Pink color for Next/Submit button
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default SurveyScreen;
