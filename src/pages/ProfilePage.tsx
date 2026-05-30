import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail, Phone, ShoppingBag, Calendar, Award, BookOpen, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';

interface ProfilePageProps {
  onBack: () => void;
}

interface PurchasedTest {
  id: string;
  test_type: string;
  created_at: string;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();
  const [purchasedTests, setPurchasedTests] = useState<PurchasedTest[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('paid_tests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setPurchasedTests(data);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const getTestName = (testType: string) => {
    if (testType === 'lucent') return 'Lucent Subject Wise Test Series';
    if (testType === 'ghatnachakra') return 'Ghatnachakra Subject Wise Test Series';
    return testType;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getExpiryDate = (purchaseDate: string) => {
    const date = new Date(purchaseDate);
    date.setDate(date.getDate() + 365);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-800 transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-lg font-bold">My Profile</h1>
            <p className="text-[10px] text-yellow-300 font-semibold">Account Details</p>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-blue-950 font-bold text-3xl shadow-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-blue-200 text-sm flex items-center gap-1 mt-1">
                  <User size={14} />
                  Student
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{userEmail}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {user?.user_metadata?.phone || 'Not added'}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0">
                <Calendar size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Member Since</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Tests */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={20} className="text-blue-950" />
            <h3 className="text-base font-bold text-gray-900">Purchased Test Series</h3>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-500 mt-3">Loading purchases...</p>
            </div>
          ) : purchasedTests.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <ShoppingBag size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No test series purchased yet</p>
              <p className="text-xs text-gray-400 mt-1">Purchase test series to unlock premium content</p>
            </div>
          ) : (
            <div className="space-y-3">
              {purchasedTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                      <CheckCircle size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900">
                        {getTestName(test.test_type)}
                      </h4>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Purchased: {formatDate(test.created_at)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-green-600 font-medium">
                        <Award size={12} />
                        Valid till: {getExpiryDate(test.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      Active
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      365 Days Validity
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {purchasedTests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-5 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-yellow-600" />
              <h3 className="text-base font-bold text-gray-900">Your Stats</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <BookOpen size={24} className="mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-blue-950">{purchasedTests.length}</p>
                <p className="text-xs text-gray-600 mt-1">Test Series</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <CheckCircle size={24} className="mx-auto text-yellow-600 mb-2" />
                <p className="text-2xl font-bold text-yellow-700">Active</p>
                <p className="text-xs text-gray-600 mt-1">Status</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
