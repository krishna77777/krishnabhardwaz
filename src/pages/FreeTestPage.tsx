import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Lock, CreditCard, Clock, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';

interface Question {
  id: string;
  category: string;
  subject: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

interface PaidTestPageProps {
  onBack: () => void;
}

type Subject = 'History' | 'Geography' | 'Lucent' | 'Ghatnachakra' | null;

export default function PaidTestPage({ onBack }: PaidTestPageProps) {
  const [subject, setSubject] = useState<Subject>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState<Record<number, string>>({});
  const [purchasedTests, setPurchasedTests] = useState<{ lucent: boolean; ghatnachakra: boolean }>({ lucent: false, ghatnachakra: false });
  const [loading, setLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaidTest, setSelectedPaidTest] = useState<'lucent' | 'ghatnachakra' | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [swipeState, setSwipeState] = useState({ startY: 0, currentY: 0, isSwiping: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkPurchases = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('paid_tests')
          .select('test_type')
          .eq('user_id', user.id);

        const tests = { lucent: false, ghatnachakra: false };
        data?.forEach((item) => {
          if (item.test_type === 'lucent') tests.lucent = true;
          if (item.test_type === 'ghatnachakra') tests.ghatnachakra = true;
        });
        setPurchasedTests(tests);
      } catch (error) {
        console.error('Error checking purchases:', error);
      } finally {
        setLoading(false);
      }
    };
    checkPurchases();
  }, [user]);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !quizStarted || showResults) return;

    const handleTouchStart = (e: TouchEvent) => {
      setSwipeState({
        startY: e.touches[0].clientY,
        currentY: e.touches[0].clientY,
        isSwiping: true,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swipeState.isSwiping) return;
      setSwipeState((prev) => ({ ...prev, currentY: e.touches[0].clientY }));
    };

    const handleTouchEnd = () => {
      if (!swipeState.isSwiping) return;
      const diff = swipeState.startY - swipeState.currentY;
      const threshold = 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentQ < questions.length - 1) {
          setCurrentQ(currentQ + 1);
        } else if (diff < 0 && currentQ > 0) {
          setCurrentQ(currentQ - 1);
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
  }, [swipeState, currentQ, questions.length, quizStarted, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const normalizeSubjectName = (subjectName: string): string => {
    if (subjectName.toLowerCase().includes('lucent')) return 'Lucent';
    if (subjectName.toLowerCase().includes('ghatnachakra')) return 'Ghatnachakra';
    return subjectName;
  };

  const loadQuestions = async (subjectName: string) => {
    const normalizedSubject = normalizeSubjectName(subjectName);
    setQuestionsLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('category', 'paid_test')
        .eq('subject', normalizedSubject);

      if (error) {
        console.error('Error loading questions:', error);
        setQuestions([]);
        return;
      }
      setQuestions(data && data.length > 0 ? data : []);
    } catch (error) {
      console.error('Exception in loadQuestions:', error);
      setQuestions([]);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const convertToOptions = (q: Question) => [q.option_a, q.option_b, q.option_c, q.option_d];

  // ✅ Allow changing answer freely before submit (no lock)
  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const answerLetter = String.fromCharCode(65 + answerIndex);
    setAnswered((prev) => ({ ...prev, [questionIndex]: answerLetter }));
  };

  const calculateScore = () => {
    return Object.keys(answered).reduce((acc, key) => {
      const qIndex = parseInt(key);
      return answered[qIndex] === questions[qIndex].correct_answer ? acc + 1 : acc;
    }, 0);
  };

  const handlePayment = async (testType: 'lucent' | 'ghatnachakra') => {
    if (!user) return;
    setPaymentLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const { error } = await supabase.from('paid_tests').insert({ user_id: user.id, test_type: testType });
      if (!error) {
        setPurchasedTests({ ...purchasedTests, [testType]: true });
        setShowPaymentModal(false);
        setSelectedPaidTest(null);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const startQuiz = async (subjectName: string) => {
    setCurrentQ(0);
    setAnswered({});
    setQuestions([]);
    setShowResults(false);
    await loadQuestions(subjectName);
    setQuizStarted(true);
    setTimeLeft(300);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleSubmit = () => setShowResults(true);

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-6 py-6">
          <h2 className="text-2xl font-bold">Complete Purchase</h2>
          <p className="text-blue-100 text-sm mt-1">Unlock full test series</p>
        </div>
        <div className="px-6 py-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 text-sm mb-3">You are purchasing:</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedPaidTest === 'lucent' ? 'Lucent Subject Wise Test Series' : 'Ghatnachakra Subject Wise Test Series'}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-red-600">59</span>
              <span className="text-lg text-gray-600">INR</span>
            </div>
            <p className="text-xs text-gray-500 mt-3">Valid for 365 days from purchase date</p>
          </div>
          <button
            onClick={() => handlePayment(selectedPaidTest!)}
            disabled={paymentLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl hover:from-red-700 hover:to-red-800 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            {paymentLoading ? 'Processing...' : 'Pay Now - Rs 59'}
          </button>
          <button
            onClick={() => { setShowPaymentModal(false); setSelectedPaidTest(null); }}
            className="w-full border-2 border-blue-950 border-opacity-20 text-blue-950 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors mt-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // ── Quiz Screen ──
  if (quizStarted && subject) {
    if (questionsLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500 mt-3">Loading questions...</p>
          </div>
        </div>
      );
    }

    if (!questionsLoading && questions.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-700 mb-2">No Questions Available</p>
            <p className="text-sm text-gray-500 mb-4">No questions found for {subject}</p>
            <button
              onClick={() => { setQuizStarted(false); setQuestions([]); }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    const currentQuestion = questions[currentQ];
    const userAnswer = answered[currentQ];
    const finalScore = calculateScore();
    const percentage = questions.length > 0 ? Math.round((finalScore / questions.length) * 100) : 0;

    return (
      <div className="min-h-screen bg-gray-50" ref={containerRef}>
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => {
                setQuizStarted(false);
                setShowResults(false);
                setAnswered({});
                setCurrentQ(0);
                setQuestions([]);
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
                Question {currentQ + 1} / {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-1.5 rounded-full transition-all ${
                      idx === currentQ
                        ? 'bg-yellow-400'
                        : answered[idx] !== undefined
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
              <div className="text-center mb-3 text-xs text-gray-500">
                Swipe UP/DOWN for next/previous • Tap to change answer before submitting
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 mb-5 relative">
                  <span className="absolute top-2 right-2 px-2 py-1 bg-blue-950 text-white text-xs font-bold rounded-lg">
                    Q{currentQ + 1}
                  </span>
                  <p className="text-base font-medium text-gray-900 leading-relaxed pr-12">
                    {currentQuestion.question}
                  </p>
                </div>

                <div className="space-y-3">
                  {convertToOptions(currentQuestion).map((option, idx) => {
                    const answerLetter = String.fromCharCode(65 + idx);
                    const isUserAnswer = userAnswer === answerLetter;
                    const isCorrect = currentQuestion.correct_answer === answerLetter;

                    // ✅ Only reveal correct/wrong AFTER submit
                    let optionStyle = 'border-2 border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50';
                    if (showResults) {
                      if (isCorrect) {
                        optionStyle = 'border-2 border-green-500 bg-green-50';
                      } else if (isUserAnswer && !isCorrect) {
                        optionStyle = 'border-2 border-red-500 bg-red-50';
                      }
                    } else if (isUserAnswer) {
                      optionStyle = 'border-2 border-blue-500 bg-blue-50';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(currentQ, idx)}
                        className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center gap-3 ${optionStyle}`}
                      >
                        {/* ✅ Circle badge: green/red only after submit */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          showResults
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : isUserAnswer && !isCorrect
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                            : isUserAnswer
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>

                        <span className="text-sm font-medium flex-1">{option}</span>

                        {/* ✅ CORRECT / WRONG labels only after submit */}
                        {showResults && isCorrect && (
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                            ✓ CORRECT
                          </span>
                        )}
                        {showResults && isUserAnswer && !isCorrect && (
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
                  disabled={currentQ === 0}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {currentQ === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-colors shadow-lg"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg"
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="mt-6 bg-white rounded-2xl shadow p-4">
                <p className="text-xs font-semibold text-gray-500 mb-3 text-center">Jump to Question</p>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQ(idx)}
                      className={`py-3 rounded-lg text-sm font-bold transition-all ${
                        idx === currentQ
                          ? 'bg-blue-600 text-white shadow-lg'
                          : answered[idx] !== undefined
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
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
            // ── Results Screen ──
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className={`w-28 h-28 rounded-full mx-auto mb-5 flex items-center justify-center ${
                  percentage >= 60 ? 'bg-green-100' : percentage >= 40 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <p className={`text-4xl font-bold ${
                    percentage >= 60 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>{percentage}%</p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                <p className="text-gray-600 mb-6">
                  You scored {finalScore} out of {questions.length} questions
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                    <p className="text-3xl font-bold text-green-600">{finalScore}</p>
                    <p className="text-xs font-medium text-green-700">Correct</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                    <p className="text-3xl font-bold text-red-600">{questions.length - finalScore}</p>
                    <p className="text-xs font-medium text-red-700">Wrong</p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentQ(0)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg"
                >
                  Review Answers
                </button>
              </div>

              {/* ── Per-question review ── */}
              <div className="space-y-4">
                {questions.map((q, qIdx) => {
                  const userAns = answered[qIdx];
                  return (
                    <div key={q.id} className="bg-white rounded-2xl shadow p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <span className="px-2 py-1 bg-blue-950 text-white text-xs font-bold rounded-lg shrink-0">
                          Q{qIdx + 1}
                        </span>
                        <p className="text-sm font-medium text-gray-900">{q.question}</p>
                      </div>
                      <div className="space-y-2">
                        {convertToOptions(q).map((opt, oIdx) => {
                          const letter = String.fromCharCode(65 + oIdx);
                          const isCorrectOpt = q.correct_answer === letter;
                          const isUserOpt = userAns === letter;
                          let style = 'border-2 border-gray-100 bg-gray-50';
                          if (isCorrectOpt) style = 'border-2 border-green-500 bg-green-50';
                          else if (isUserOpt && !isCorrectOpt) style = 'border-2 border-red-500 bg-red-50';
                          return (
                            <div key={oIdx} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${style}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                isCorrectOpt
                                  ? 'bg-green-500 text-white'
                                  : isUserOpt
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                {letter}
                              </div>
                              <span className="text-sm flex-1">{opt}</span>
                              {isCorrectOpt && <span className="text-xs font-bold text-green-600">✓</span>}
                              {isUserOpt && !isCorrectOpt && <span className="text-xs font-bold text-red-600">✗</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Subject detail screen ──
  if (subject) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={() => setSubject(null)} className="p-2 rounded-lg hover:bg-blue-800 transition-colors">
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="text-lg font-bold">{subject}</h1>
              <p className="text-[10px] text-yellow-300 font-semibold">Premium Test</p>
            </div>
          </div>
        </header>

        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow">
                {subject.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{subject} Test</h2>
                <p className="text-sm text-gray-500">Premium Practice Test</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-bold text-yellow-800 mb-2">📋 Instructions:</p>
              <ul className="space-y-1.5 text-xs text-yellow-700">
                <li>• Swipe UP/DOWN to navigate questions</li>
                <li>• Tap to select your answer (you can change it before submitting)</li>
                <li>• Correct/Wrong answers revealed only after submission</li>
                <li>• Timer starts automatically</li>
              </ul>
            </div>

            <button
              onClick={() => startQuiz(subject)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors shadow-lg"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Subject list screen ──
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-lg font-bold">Paid Test Series</h1>
            <p className="text-[10px] text-yellow-300 font-semibold">Premium Content</p>
          </div>
        </div>
      </header>

      {showPaymentModal && <PaymentModal />}

      <div className="p-4 pb-24 max-w-2xl mx-auto">
        <div className="space-y-4">
          <button
            onClick={() => setSubject('History')}
            className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-blue-200"
          >
            <div className="bg-blue-100 text-blue-700 p-3 rounded-xl flex-shrink-0">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">History</h4>
              <p className="text-xs text-gray-600 mt-1">Premium history test series</p>
            </div>
          </button>

          <button
            onClick={() => setSubject('Geography')}
            className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-teal-200"
          >
            <div className="bg-teal-100 text-teal-700 p-3 rounded-xl flex-shrink-0">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Geography</h4>
              <p className="text-xs text-gray-600 mt-1">Premium geography test series</p>
            </div>
          </button>

          <button
            onClick={() => {
              if (purchasedTests.lucent) {
                setSubject('Lucent');
              } else {
                setShowPaymentModal(true);
                setSelectedPaidTest('lucent');
              }
            }}
            className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-yellow-200"
          >
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-xl flex-shrink-0">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                Lucent Subject Wise
                {!purchasedTests.lucent && <Lock size={16} className="text-red-600" />}
              </h4>
              <p className="text-xs text-gray-600 mt-1">GK & Science - Comprehensive coverage</p>
              {purchasedTests.lucent && (
                <p className="text-xs text-green-600 font-semibold mt-2">Purchased - Valid for 365 days</p>
              )}
            </div>
            {!purchasedTests.lucent && (
              <span className="text-xl font-bold text-red-600">Rs 59</span>
            )}
          </button>

          <button
            onClick={() => {
              if (purchasedTests.ghatnachakra) {
                setSubject('Ghatnachakra');
              } else {
                setShowPaymentModal(true);
                setSelectedPaidTest('ghatnachakra');
              }
            }}
            className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-red-200"
          >
            <div className="bg-red-100 text-red-600 p-3 rounded-xl flex-shrink-0">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                Ghatnachakra Subject Wise
                {!purchasedTests.ghatnachakra && <Lock size={16} className="text-red-600" />}
              </h4>
              <p className="text-xs text-gray-600 mt-1">History & Geography - Event-based questions</p>
              {purchasedTests.ghatnachakra && (
                <p className="text-xs text-green-600 font-semibold mt-2">Purchased - Valid for 365 days</p>
              )}
            </div>
            {!purchasedTests.ghatnachakra && (
              <span className="text-xl font-bold text-red-600">Rs 59</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}