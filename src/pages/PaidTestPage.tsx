import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, RotateCcw, BookOpen, Lock, CreditCard } from 'lucide-react';
import { historyQuestions, geographyQuestions, lucentSubjectWiseQuestions, ghatnachakraQuestions } from '../data/questions';
import { useAuth, supabase } from '../contexts/AuthContext';

interface PaidTestPageProps {
  onBack: () => void;
}

type Subject = 'history' | 'geography' | 'lucent' | 'ghatnachakra' | null;
type LucentSubject = 'lucent-gk' | 'lucent-science';
type GhatnachakraSubject = 'ghatnachakra-history' | 'ghatnachakra-geography';

export default function PaidTestPage({ onBack }: PaidTestPageProps) {
  const [subject, setSubject] = useState<Subject>(null);
  const [lucentSubject, setLucentSubject] = useState<LucentSubject | null>(null);
  const [ghatnachakraSubject, setGhatnachakraSubject] = useState<GhatnachakraSubject | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [purchasedTests, setPurchasedTests] = useState<{ lucent: boolean; ghatnachakra: boolean }>({ lucent: false, ghatnachakra: false });
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaidTest, setSelectedPaidTest] = useState<'lucent' | 'ghatnachakra' | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useAuth();

  // Check purchased tests
  useEffect(() => {
    const checkPurchases = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from('paid_tests')
          .select('test_type')
          .eq('user_id', user.id);

        const tests: { lucent: boolean; ghatnachakra: boolean } = { lucent: false, ghatnachakra: false };
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

  // Get questions based on current subject
  const getQuestions = () => {
    if (subject === 'history') return historyQuestions;
    if (subject === 'geography') return geographyQuestions;
    if (subject === 'lucent' && lucentSubject) return lucentSubjectWiseQuestions[lucentSubject];
    if (subject === 'ghatnachakra' && ghatnachakraSubject) return ghatnachakraQuestions[ghatnachakraSubject];
    return [];
  };

  const questions = getQuestions();

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[currentQ].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  };

  const handlePayment = async (testType: 'lucent' | 'ghatnachakra') => {
    if (!user) return;
    setPaymentLoading(true);

    try {
      // Simulate payment success - in real app, integrate with payment gateway
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { error } = await supabase
        .from('paid_tests')
        .insert({
          user_id: user.id,
          test_type: testType,
        });

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

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-6 py-6">
          <h2 className="text-2xl font-bold">Complete Purchase</h2>
          <p className="text-blue-100 text-sm mt-1">Unlock full test series</p>
        </div>

        {/* Content */}
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

          {/* Payment Button */}
          <button
            onClick={() => handlePayment(selectedPaidTest!)}
            disabled={paymentLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl hover:from-red-700 hover:to-red-800 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            {paymentLoading ? 'Processing...' : 'Pay Now - ₹59'}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => {
              setShowPaymentModal(false);
              setSelectedPaidTest(null);
            }}
            className="w-full border-2 border-blue-950 border-opacity-20 text-blue-950 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors mt-3"
          >
            Cancel
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">Secure payment powered by Razorpay</p>
        </div>
      </div>
    </div>
  );

  // Free subjects view
  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors" aria-label="Go back">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-lg font-bold">Paid Test Series</h1>
          </div>
        </header>

        <div className="p-4 pb-24 max-w-2xl mx-auto">
          <div className="space-y-4">
            {/* Lucent Test */}
            <button
              onClick={() => {
                if (purchasedTests.lucent) {
                  setSubject('lucent');
                  setLucentSubject('lucent-gk');
                } else {
                  setShowPaymentModal(true);
                  setSelectedPaidTest('lucent');
                }
              }}
              className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-yellow-600 border-opacity-20"
            >
              <div className="bg-yellow-100 text-yellow-700 p-3 rounded-xl flex-shrink-0">
                <BookOpen size={24} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  Lucent Subject Wise Test Series
                  {!purchasedTests.lucent && <Lock size={16} className="text-red-600" />}
                </h4>
                <p className="text-xs text-gray-500 mt-1">GK & Science - Comprehensive coverage</p>
                {purchasedTests.lucent && (
                  <p className="text-xs text-green-600 font-semibold mt-2">Purchased - Valid for 365 days</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                {!purchasedTests.lucent && (
                  <>
                    <span className="text-xl font-bold text-red-600">₹59</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </>
                )}
              </div>
            </button>

            {/* Ghatnachakra Test */}
            <button
              onClick={() => {
                if (purchasedTests.ghatnachakra) {
                  setSubject('ghatnachakra');
                  setGhatnachakraSubject('ghatnachakra-history');
                } else {
                  setShowPaymentModal(true);
                  setSelectedPaidTest('ghatnachakra');
                }
              }}
              className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-red-600 border-opacity-20"
            >
              <div className="bg-red-100 text-red-600 p-3 rounded-xl flex-shrink-0">
                <BookOpen size={24} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  Ghatnachakra Subject Wise Test Series
                  {!purchasedTests.ghatnachakra && <Lock size={16} className="text-red-600" />}
                </h4>
                <p className="text-xs text-gray-500 mt-1">History & Geography - Event-based questions</p>
                {purchasedTests.ghatnachakra && (
                  <p className="text-xs text-green-600 font-semibold mt-2">Purchased - Valid for 365 days</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                {!purchasedTests.ghatnachakra && (
                  <>
                    <span className="text-xl font-bold text-red-600">₹59</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </>
                )}
              </div>
            </button>

            {/* Demo Free Tests */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Free Demo</h3>
              <button
                onClick={() => setSubject('history')}
                className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-red-600 border-opacity-20"
              >
                <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                  <BookOpen size={24} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">History (Sample)</h4>
                  <p className="text-xs text-gray-500">10 Questions</p>
                </div>
                <ChevronRight size={20} className="text-red-600" />
              </button>
              <button
                onClick={() => setSubject('geography')}
                className="w-full flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-yellow-600 border-opacity-20 mt-3"
              >
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-xl">
                  <BookOpen size={24} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Geography (Sample)</h4>
                  <p className="text-xs text-gray-500">10 Questions</p>
                </div>
                <ChevronRight size={20} className="text-yellow-700" />
              </button>
            </div>
          </div>
        </div>

        {showPaymentModal && <PaymentModal />}
      </div>
    );
  }

  // Lucent subjects selection
  if (subject === 'lucent' && !lucentSubject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={() => setSubject(null)}
              className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-lg font-bold">Lucent Test Series</h1>
          </div>
        </header>

        <div className="p-4 pb-24 max-w-2xl mx-auto space-y-4">
          <button
            onClick={() => setLucentSubject('lucent-gk')}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-yellow-600 border-opacity-20"
          >
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-xl">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">General Knowledge</h4>
              <p className="text-xs text-gray-500">10 Questions</p>
            </div>
            <ChevronRight size={20} className="text-yellow-700" />
          </button>
          <button
            onClick={() => setLucentSubject('lucent-science')}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-yellow-600 border-opacity-20"
          >
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-xl">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Science</h4>
              <p className="text-xs text-gray-500">10 Questions</p>
            </div>
            <ChevronRight size={20} className="text-yellow-700" />
          </button>
        </div>
      </div>
    );
  }

  // Ghatnachakra subjects selection
  if (subject === 'ghatnachakra' && !ghatnachakraSubject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={() => setSubject(null)}
              className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-lg font-bold">Ghatnachakra Test Series</h1>
          </div>
        </header>

        <div className="p-4 pb-24 max-w-2xl mx-auto space-y-4">
          <button
            onClick={() => setGhatnachakraSubject('ghatnachakra-history')}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-red-600 border-opacity-20"
          >
            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">History</h4>
              <p className="text-xs text-gray-500">10 Questions</p>
            </div>
            <ChevronRight size={20} className="text-red-600" />
          </button>
          <button
            onClick={() => setGhatnachakraSubject('ghatnachakra-geography')}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left border-2 border-red-600 border-opacity-20"
          >
            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
              <BookOpen size={24} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Geography</h4>
              <p className="text-xs text-gray-500">10 Questions</p>
            </div>
            <ChevronRight size={20} className="text-red-600" />
          </button>
        </div>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => {
              if (lucentSubject) {
                setLucentSubject(null);
              } else if (ghatnachakraSubject) {
                setGhatnachakraSubject(null);
              } else {
                setSubject(null);
              }
            }}
            className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold capitalize">{subject}</h1>
          <div className="ml-auto bg-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
            {currentQ + 1}/{questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-red-600 transition-all duration-300"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-4 pb-20 max-w-2xl mx-auto">
        {/* Score */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border-2 border-red-600 border-opacity-20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Score</span>
            <span className="text-lg font-bold text-red-600">{score}/{currentQ + (answered ? 1 : 0)}</span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 border-2 border-blue-950 border-opacity-10">
          <h3 className="font-semibold text-gray-900 text-base mb-4 leading-relaxed">
            {questions[currentQ].question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {questions[currentQ].options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = index === questions[currentQ].correct;
              let optionStyle = 'border-blue-950 border-opacity-20 text-gray-700 hover:border-opacity-100';
              let iconEl = null;

              if (answered) {
                if (isCorrect) {
                  optionStyle = 'bg-green-50 border-green-500 text-green-700';
                  iconEl = <CheckCircle size={18} className="text-green-600" />;
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-50 border-red-500 text-red-700';
                  iconEl = <XCircle size={18} className="text-red-600" />;
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={answered}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm transition-all ${optionStyle} ${
                    !answered ? 'hover:border-red-300 active:scale-[0.98]' : 'cursor-default'
                  }`}
                >
                  <span className="flex-1">{option}</span>
                  {iconEl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next / Restart Button */}
        {answered && (
          <div className="flex justify-center">
            {currentQ === questions.length - 1 ? (
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-red-700 active:scale-[0.97] transition-all shadow-sm"
              >
                <RotateCcw size={16} />
                Play Again
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-red-700 active:scale-[0.97] transition-all shadow-sm"
              >
                Next Question
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
