import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, ChevronUp, ChevronDown } from 'lucide-react';

interface FreeTestPageProps {
  onBack: () => void;
}

const freeTestSubjects = [
  {
    id: 'reasoning',
    title: 'Reasoning',
    icon: '🧠',
    tests: 15,
    questions: 20,
    duration: 20,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'mathematics',
    title: 'Mathematics',
    icon: '🔢',
    tests: 12,
    questions: 20,
    duration: 25,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'english',
    title: 'English',
    icon: '📖',
    tests: 10,
    questions: 15,
    duration: 15,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    icon: '🌍',
    tests: 8,
    questions: 25,
    duration: 20,
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'science',
    title: 'Science',
    icon: '🔬',
    tests: 10,
    questions: 20,
    duration: 20,
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function FreeTestPage({ onBack }: FreeTestPageProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [swipeState, setSwipeState] = useState({ startY: 0, currentY: 0, isSwiping: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      id: 1,
      question: 'If A is the father of B, and B is the sister of C, how is A related to C?',
      options: ['Father', 'Uncle', 'Brother', 'Grandfather'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'Complete the series: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '44', '38'],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: 'If COMPUTER is coded as RFUVQNPC, how is MEDICINE coded?',
      options: ['MEDICINE', 'ENICIDEM', 'MFDIJDNE', 'ENICJDME'],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: 'Find the odd one out: 8, 27, 64, 100, 125',
      options: ['8', '27', '64', '100'],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: 'A train 200m long crosses a pole in 8 seconds. What is its speed?',
      options: ['25 km/h', '90 km/h', '72 km/h', '54 km/h'],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResults]);

  // Swipe handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !showQuiz || showResults || !quizStarted) return;

    const handleTouchStart = (e: TouchEvent) => {
      setSwipeState({
        startY: e.touches[0].clientY,
        currentY: e.touches[0].clientY,
        isSwiping: true,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swipeState.isSwiping) return;
      setSwipeState((prev) => ({
        ...prev,
        currentY: e.touches[0].clientY,
      }));
    };

    const handleTouchEnd = () => {
      if (!swipeState.isSwiping) return;

      const diff = swipeState.startY - swipeState.currentY;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else if (diff < 0 && currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
        }
      }

      setSwipeState({ startY: 0, currentY: 0, isSwiping: false });
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swipeState, currentQuestion, questions.length, showQuiz, showResults, quizStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(300);
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    if (selectedAnswers[questionIndex] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (showQuiz) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const currentQ = questions[currentQuestion];
    const userAnswer = selectedAnswers[currentQuestion];

    return (
      <div className="min-h-screen bg-gray-50" ref={containerRef}>
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => {
                setShowQuiz(false);
                setShowResults(false);
                setQuizStarted(false);
                setSelectedAnswers({});
                setCurrentQuestion(0);
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-semibold">Exit</span>
            </button>
            <div className="flex items-center gap-2">
              <Clock size={18} className={timeLeft < 60 ? 'text-red-300 animate-pulse' : ''} />
              <span className={`font-bold tabular-nums ${timeLeft < 60 ? 'text-red-300' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <div className="px-4 pb-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-200">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-1.5 rounded-full transition-all ${
                      idx === currentQuestion
                        ? 'bg-yellow-400'
                        : selectedAnswers[idx] !== undefined
                        ? 'bg-green-400'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-4">
          {!showResults ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-3 text-xs text-gray-500">
                <ChevronUp size={16} />
                <span>Swipe up/down for next/previous question</span>
                <ChevronDown size={16} />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 mb-5 relative">
                  <span className="absolute top-2 right-2 px-2 py-1 bg-blue-950 text-white text-xs font-bold rounded-lg">
                    Q{currentQuestion + 1}
                  </span>
                  <p className="text-base font-medium text-gray-900 leading-relaxed pr-12">
                    {currentQ.question}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isUserAnswer = userAnswer === idx;
                    const isCorrect = currentQ.correctAnswer === idx;
                    let optionStyle = 'border-2 border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50';

                    if (userAnswer !== undefined) {
                      if (isCorrect) {
                        optionStyle = 'border-2 border-green-500 bg-green-50';
                      } else if (isUserAnswer && !isCorrect) {
                        optionStyle = 'border-2 border-red-500 bg-red-50';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(currentQuestion, idx)}
                        className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center gap-3 ${optionStyle}`}
                        disabled={userAnswer !== undefined}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          userAnswer !== undefined
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : isUserAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm font-medium flex-1">{option}</span>
                        {userAnswer !== undefined && isCorrect && (
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                            ✓ CORRECT
                          </span>
                        )}
                        {userAnswer !== undefined && isUserAnswer && !isCorrect && (
                          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                            ✗ WRONG
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <ChevronUp size={18} className="rotate-[-90deg]" />
                  Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-colors shadow-lg"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    Next
                    <ChevronDown size={18} className="rotate-[-90deg]" />
                  </button>
                )}
              </div>

              <div className="mt-6 bg-white rounded-2xl shadow p-4">
                <p className="text-xs font-semibold text-gray-500 mb-3 text-center">
                  Jump to Question
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestion(idx)}
                      className={`py-3 rounded-lg text-sm font-bold transition-all ${
                        idx === currentQuestion
                          ? 'bg-blue-600 text-white shadow-lg'
                          : selectedAnswers[idx] !== undefined
                          ? 'bg-green-100 text-green-700 border-2 border-green-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className={`w-28 h-28 rounded-full mx-auto mb-5 flex items-center justify-center ${
                percentage >= 60 ? 'bg-green-100' : percentage >= 40 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <div className="text-center">
                  <p className={`text-4xl font-bold ${
                    percentage >= 60 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>{percentage}%</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 mb-6">
                You scored {score} out of {questions.length} questions
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <p className="text-3xl font-bold text-green-600">{score}</p>
                  <p className="text-xs font-medium text-green-700">Correct</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                  <p className="text-3xl font-bold text-red-600">{questions.length - score}</p>
                  <p className="text-xs font-medium text-red-700">Wrong</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setTimeLeft(300);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg"
              >
                Review Answers
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-lg font-bold">Free Test Series</h1>
            <p className="text-[10px] text-yellow-300 font-semibold">Practice & Improve</p>
          </div>
        </div>
      </header>

      {selectedSubject ? (
        <div className="p-4">
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Subjects
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow">
                {freeTestSubjects.find(s => s.id === selectedSubject)?.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {freeTestSubjects.find(s => s.id === selectedSubject)?.title}
                </h2>
                <p className="text-sm text-gray-500">Demo Practice Test</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-950">5</p>
                <p className="text-xs text-gray-500">Questions</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-950">5 min</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-950">5</p>
                <p className="text-xs text-gray-500">Marks</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-bold text-yellow-800 mb-2">
                📋 Instructions:
              </p>
              <ul className="space-y-1.5 text-xs text-yellow-700">
                <li>• Swipe UP/DOWN to navigate questions</li>
                <li>• Tap to select your answer</li>
                <li>• Green = Correct, Red = Wrong (auto shown)</li>
                <li>• Timer will start automatically</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowQuiz(true);
                startQuiz();
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg text-base"
            >
              Start Practice Test
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Select Subject</h3>
            <div className="grid gap-3">
              {freeTestSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white text-3xl shadow`}>
                    {subject.icon}
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{subject.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {subject.tests} tests • {subject.questions} questions • {subject.duration} min
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
