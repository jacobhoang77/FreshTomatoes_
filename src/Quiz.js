import React, { useState } from 'react';
import './Quiz.css';

const quizPool = [
  {
    question: "Which movie won the Best Picture Oscar in 1994?",
    options: ["Forrest Gump", "Pulp Fiction", "The Shawshank Redemption", "The Lion King"],
    answer: "Forrest Gump",
  },
  {
    question: "Who directed 'Inception'?",
    options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
    answer: "Christopher Nolan",
  },
  {
    question: "Which movie features the quote, 'Here's looking at you, kid'?",
    options: ["Casablanca", "Gone with the Wind", "Citizen Kane", "The Maltese Falcon"],
    answer: "Casablanca",
  },
  {
    question: "What is the highest-grossing film of all time?",
    options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"],
    answer: "Avatar",
  },
  {
    question: "Which movie features the character 'Tony Stark'?",
    options: ["Iron Man", "The Dark Knight", "Spider-Man", "Superman"],
    answer: "Iron Man",
  },
  {
    question: "Who directed 'The Godfather'?",
    options: ["Francis Ford Coppola", "Martin Scorsese", "Steven Spielberg", "Quentin Tarantino"],
    answer: "Francis Ford Coppola",
  },
];

const getRandomQuestions = (numQuestions) => {
  const shuffled = quizPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

const RandomQuizGame = () => {
  const [questions] = useState(getRandomQuestions(5));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div>
          <h2>You scored {score} out of {questions.length}</h2>
          <button className="play-again-button" onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div>
          <div className="quiz-question">{questions[currentQuestion].question}</div>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option) => (
              <div key={option} className="quiz-option" onClick={() => handleAnswerOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomQuizGame;
