import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import useQuizStore from "~/components/utilis/store";

export const loader = async () => {
  const response = await fetch(
    "https://672f956866e42ceaf15e27ec.mockapi.io/postQuiz/POSTQUIZ"
  );

  if (!response.ok) {
    return {
      success: false,
      statusCode: response.status,
      message: response.statusText,
    };
  } else {
    const quizzes = await response.json();
    return {
      success: true,
      data: quizzes,
    };
  }
};

const User = () => {
  const loaderData = useLoaderData();
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  const reformattedData = loaderData.success
    ? loaderData.data.reduce((acc, item) => {
        Object.keys(item).forEach((key) => {
          if (!isNaN(key)) {
            acc.push(item[key]);
          }
        });
        return acc;
      }, [])
    : [];

  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  );
  const timeLeft = useQuizStore((state) => state.timeLeft);
  const selectedAnswers = useQuizStore((state) => state.selectedAnswers);

  const setCurrentQuestionIndex = useQuizStore(
    (state) => state.setCurrentQuestionIndex
  );
  const setSelectedAnswers = useQuizStore((state) => state.setSelectedAnswers);
  const setTimeLeft = useQuizStore((state) => state.setTimeLeft);

  useEffect(() => {
    if (loaderData.success) {
      setQuizzes(reformattedData);
    } else {
      setError(loaderData);
    }
  }, [loaderData, reformattedData]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        const time = timeLeft > 0 ? timeLeft - 1 : 0;
        setTimeLeft(time);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleOptionSelect = (option) => {
    if (timeLeft === 0) {
      return;
    }
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResetExam = () => {
    setTimeLeft(600);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
  };

  const totalQuestions = quizzes.length;
  const answeredQuestions = selectedAnswers.filter(
    (answer) => answer !== undefined && answer !== null
  ).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const isEvaluateEnabled = answeredQuestions >= 1;

  const evaluateResults = () => {
    const correctAnswers = quizzes.map((quiz) => quiz.answer);
    let score = 0;

    selectedAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });

    alert(`You scored ${score} out of ${totalQuestions}`);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="bg-gray-900 text-white p-4 min-h-screen">
      {error ? (
        <p className="text-red-500 mt-4">Error: {error.message}</p>
      ) : (
        <>
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Quiz:</h1>
          </header>

          {timeLeft === 0 && (
            <div className="text-center text-2xl font-bold text-red-500">
              Time is completed!
            </div>
          )}

          <div className="flex items-center mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="mr-4 p-2 bg-blue-500 rounded disabled:bg-gray-500 w-[50px] text-[12px] lg:text-[16px]"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === quizzes.length - 1}
              className="ml-4 p-2 bg-blue-500 rounded disabled:bg-gray-500 w-[50px] text-[12px] lg:text-[16px]"
            >
              &#8594;
            </button>
            <div className="flex-grow text-center">
              <span className="font-semibold text-[12px] lg:text-[16px]">
                {currentQuestionIndex + 1}/{quizzes.length}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[12px] lg:text-[16px]">
                Time Left: {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-lg h-[10px] my-4">
            <div
              className="h-full bg-blue-600 rounded-lg transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-[12px] md:text-[16px]">
              {quizzes[currentQuestionIndex]?.title || "Loading question..."}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {quizzes[currentQuestionIndex]?.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`cursor-pointer flex items-center justify-center text-center p-4 rounded-lg border transition duration-200 ${
                    selectedAnswers[currentQuestionIndex] === option
                      ? "bg-blue-500 border-blue-600"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleResetExam}
              className="p-2 bg-red-500 rounded text-white"
            >
              Reset Exam
            </button>
          </div>

          {isEvaluateEnabled && (
            <div className="mt-4 text-center">
              <button
                onClick={evaluateResults}
                className="p-2 bg-green-500 rounded text-white"
              >
                Evaluate Results
              </button>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">All Questions</h3>
            <div className="grid grid-cols-5 md:grid-cols-5 gap-4">
              {quizzes.map((quiz, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`p-4 rounded-full ${
                    selectedAnswers[index] !== undefined &&
                    selectedAnswers[index] !== null
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
