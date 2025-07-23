import React, { useState } from "react";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";
import { alphabets, quizQuestions } from "./question";

const QuizPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();
  const handleBack = () => {
    if (currentIndex === 0) {
      navigate("/");
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOptionClick = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/results");
    }
  };

  localStorage.setItem("userAnswers", JSON.stringify(answers));

  const currentQuestion = quizQuestions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  const radius = 48.5;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentIndex + 1) / quizQuestions.length;
  const offset = circumference * (1 - progress);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-circle">
          <svg width="101" height="101">
            <circle
              cx="50.5"
              cy="50.5"
              r={radius}
              stroke="#bae6fd"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="50.5"
              cy="50.5"
              r={radius}
              stroke="#38bdf8"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 50.5 50.5)"
              style={{ transition: "stroke-dashoffset 0.3s" }}
            />
          </svg>
          <span className="progress-text">
            {currentIndex + 1}/{quizQuestions.length}
          </span>
        </div>
      </div>

      <h2 className="quiz-question">{currentQuestion.question}</h2>

      <div className="quiz-options">
        {currentQuestion.options.map((opt, index) => (
          <button
            key={opt}
            className={`quiz-option ${
              selectedAnswer === opt ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(opt)}
          >
            {alphabets[index]}. {opt}
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <button className="quiz-back" onClick={handleBack}>
          Back
        </button>
        <button
          className="quiz-next"
          disabled={!selectedAnswer}
          onClick={handleNext}
        >
          {currentIndex === quizQuestions.length - 1
            ? "Discover your results"
            : "Next question →"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
