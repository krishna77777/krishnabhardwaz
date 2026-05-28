import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const { error } = await login(email, password);
    setLoading(false);

    if (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">MENTORA</h1>
          <p className="text-yellow-300 font-semibold tracking-wider">TEXT BOOK</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6">
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <p className="text-red-100 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950 text-opacity-40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 border-2 border-blue-950 border-opacity-20 rounded-xl focus:outline-none focus:border-opacity-100 focus:ring-0 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950 text-opacity-40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 border-2 border-blue-950 border-opacity-20 rounded-xl focus:outline-none focus:border-opacity-100 focus:ring-0 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-950 text-opacity-40 hover:text-opacity-60 transition-colors"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-xl hover:from-red-700 hover:to-red-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-blue-950 border-opacity-10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">New user?</span>
              </div>
            </div>

            {/* Register Link */}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="w-full border-2 border-blue-950 border-opacity-20 text-blue-950 font-bold py-3 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 text-xs mt-6">
          Start your exam preparation journey today
        </p>
      </div>
    </div>
  );
}
