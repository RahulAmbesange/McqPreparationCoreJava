import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/ExamQuestion.css';
import NavBar from '../NavBar';
import { IoMdArrowRoundBack } from 'react-icons/io';

function ExamQuestions() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const navigate = useNavigate();
  const userId = "some-user-id"; // Replace with authenticated user ID

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/questions');
        if (response.data.success) {
          setQuestions(response.data.questions);
        } else {
          setError('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Something went wrong while fetching questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear any stored authentication data here, like tokens or user info
    localStorage.removeItem('userToken'); // Example: removing token from localStorage
    navigate('/login'); // Redirecting to login page
  };

  // Handle option selection and update score
  const handleAnswerChange = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];

    if (currentAnswer === undefined) {
      if (option === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      if (currentAnswer === currentQuestion.correctAnswer && option !== currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore - 1);
      }
      if (currentAnswer !== currentQuestion.correctAnswer && option === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: option,
    }));
  };

  // Save the final result to the backend
  const saveResult = async (finalScore) => {
    try {
      const response = await axios.post('http://localhost:8080/api/result/save', {
        userId,
        score: finalScore,
      });
      if (!response.data.success) {
        console.error('Failed to save result');
      }
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  // Handle final result calculation
  const calculateResult = async () => {
    await saveResult(score);
    setShowFinalResult(true);
    navigate('/result', { state: { score, totalQuestions: questions.length } });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const handleSubmit = () => {
    calculateResult();
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <div className='loadingquestions'>Loading questions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exam-container">
      {/* NavBar with Logout button */}
      <NavBar title="MyCareer" link2="/result" linkText2="Result" link3='' titleName='/home'linkText3='Logout' onLogout={handleLogout} />

      <h2>MCQ Questions</h2>
      <div>
        <button onClick={handleBack} className="back-button1">
          <IoMdArrowRoundBack />
        </button>
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <div className="question-card">
            <h3>
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].questionText}
            </h3>
            <ul className="options-list">
              {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <li key={optionIndex} className='option-item'>
                  <input
                    type='radio'
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    onChange={() => handleAnswerChange(option)}
                    checked={userAnswers[currentQuestionIndex] === option}
                  />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
            <div className="current-score">
              <h4>Current Score: {score}</h4>
            </div>
          </div>
        )}

        {showFinalResult && (
          <div className="final-result">
            <h3>Final Result</h3>
            <p>Your Score: {score} / {questions.length}</p>
          </div>
        )}
      </div>

      {!showFinalResult && (
        <>
          <button onClick={handleNextQuestion} className="submit-button">
            {currentQuestionIndex === questions.length - 1 ? 'Submit Answers' : 'Next Question'}
          </button>
          <button onClick={handleSubmit} className="submit-button">
            Submit Now
          </button>
        </>
      )}
    </div>
  );
}

export default ExamQuestions;
