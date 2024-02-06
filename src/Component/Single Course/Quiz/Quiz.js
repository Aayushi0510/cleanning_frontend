// Quiz.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Quiz = ({ questions, quizCourseId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    console.log(
      selectedOption.trim() === questions[currentQuestionIndex].correctOption
    );
    console.log(questions[currentQuestionIndex].correctOption);
    if (
      selectedOption.trim() === questions[currentQuestionIndex].correctOption
    ) {
      setScore(score + 1);
      console.log(score, "score");
    }

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // const renderOptions = (options) => {
  //   return options.map((option, index) => (

  //     <div
  //       key={index}
  //       className={`p-2 cursor-pointer ${
  //         selectedOption === option ? 'bg-main text-white' : 'bg-gray-200'
  //       }`}
  //       onClick={() => handleOptionSelect(option)}
  //     >
  //       {option}
  //     </div>
  //   ));
  // };
  const [answerSubmitted, setAnswerSubmitted] = useState(false); // New state

  const renderOptions = (options) => {
    const correctOption = questions[currentQuestionIndex].correctOption;
    const isSelected = selectedOption !== null;

    return options.map((option, index) => {
      const isCorrect = option.trim() === correctOption;
      const isOptionSelected =
        isSelected && selectedOption.trim() === option.trim();
      const isWrongSelected = isSelected && !isCorrect && isOptionSelected;

      return (
        <div
          key={index}
          className={`p-2 cursor-pointer ${
            isWrongSelected
              ? "bg-red-500 text-white flex gap-4"
              : isCorrect && isSelected
              ? "bg-green-500 text-white flex gap-4"
              : "bg-gray-200"
          }`}
          onClick={() => {
            if (selectedOption === null) {
              handleOptionSelect(option);
            }
          }}
        >
          {isCorrect && isSelected && <span className="text-lg">&#10003;</span>}
          <span>{option}</span>
        </div>
      );
    });
  };

  const passingScore = Math.ceil(0.8 * questions.length);
  const isPassing = score >= passingScore;

  const renderQuizContent = () => {
    if (questions.length === 0) {
      return <p>Loading...</p>;
    }
    if (currentQuestionIndex < questions.length) {
      const { questionText, options } = questions[currentQuestionIndex];

      return (
        <>
          <div className="mb-4 text-lg font-semibold">{questionText}</div>

          <p className="mb-4 text-sm w-[600px] bg-bgg border-gray-700 py-2 px-2 text-red-700 ">
            In order to pass the quiz you need to answer correctly at 80% of
            questions.
          </p>
          <div className="grid grid-cols-1 gap-4">{renderOptions(options)}</div>

          <button
            className="mt-4 bg-secondry text-white py-2 px-4 rounded cursor-pointer"
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            Next
          </button>
        </>
      );
    } else {
      return (
        <div className="text-center py-4">
          <p className="mb-4 text-lg font-semibold">Quiz Completed!</p>
          <h4 className="py-2">Result</h4>
          <p>
            Your Score: {score}/{questions.length}
          </p>
          {isPassing ? (
            <div className="mt-2">
              <p className="text-sm mb-8">
                Congratulations! You have passed the quiz.
              </p>
              <Link
                to={`/coursemodule/${quizCourseId}`}
                className="bg-main px-3 py-2 mt-10 rounded-lg text-white"
              >
                Next Module
              </Link>
            </div>
          ) : (
            <div className="mt-5">
              <p>
                Sorry, you did not pass the quiz. Please review the material and
                try again.
              </p>
              <button
                onClick={handleRestartQuiz}
                className="bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Restart Quiz
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
  };

  return (
    <div className="px-5 w-4/5 mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-main mb-4">Quiz</h2>
      {renderQuizContent()}
    </div>
  );
};

export default Quiz;
