import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data';

const SurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswerChange = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/thank-you');
      localStorage.setItem('surveyAnswers', JSON.stringify({ ...answers, status: 'COMPLETED' }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === 'rating') {
      return (
        <div>
          <p>{question.text}</p>
          {[...Array(question.scale)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleAnswerChange(question.id, i + 1)}
              className={answers[question.id] === i + 1 ? 'selected' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    } else if (question.type === 'text') {
      return (
        <div>
          <p>{question.text}</p>
          <input
            type="text"
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            value={answers[question.id] || ''}
          />
        </div>
      );
    }
  };

  return (
    <div className="survey-screen">
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      {renderQuestion()}
      <div>
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
        <button onClick={handleNext}>
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default SurveyScreen;
