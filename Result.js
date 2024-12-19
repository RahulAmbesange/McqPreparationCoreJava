import React, { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import '../assets/Styles/Result.css'; // Make sure to import the new CSS file

const Result = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
  const [finalScore, setFinalScore] = useState(score);

  // Dynamically update the score (example: we can set a timer to simulate real-time score updates)
  useEffect(() => {
    if (score !== finalScore) {
      setFinalScore(score); // Update the final score
    }
  }, [score, finalScore]);

  return (
    <div className="result-container">
      <div className="result-box">
        <h2>Test Results</h2>
        <div className="score-box">
          <p className="score">{finalScore}</p>
          <p className="total-questions">
            Out of {totalQuestions} questions
          </p>
        </div>
        <p>Thank you for taking the test!</p>
        <Link className="home-btn" to='/examquestions'>Go Home</Link>
      </div>
    </div>
  );
};

export default Result;
