import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await register(name, email, password);
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
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
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-700 text-sm mt-1">Join us to start learning</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Success Alert */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-2xl flex gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-700">Account created!</p>
                  <p className="text-xs text-green-600">Redirecting to login...</p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950 text-opacity-40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={success}
                    className="w-full pl-11 pr-4 py-3 border-2 border-blue-950 border-opacity-20 rounded-xl focus:outline-none focus:border-opacity-100 focus:ring-0 text-sm disabled:bg-gray-50"
                  />
                </div>
              </div>

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
                    disabled={success}
                    className="w-full pl-11 pr-4 py-3 border-2 border-blue-950 border-opacity-20 rounded-xl focus:outline-none focus:border-opacity-100 focus:ring-0 text-sm disabled:bg-gray-50"
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
                    disabled={success}
                    className="w-full pl-11 pr-11 py-3 border-2 border-blue-950 border-opacity-20 rounded-xl focus:outline-none focus:border-opacity-100 focus:ring-0 text-sm disabled:bg-gray-50"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-950 text-opacity-40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={success}
                    className="w-full pl-11 pr-11 py-3 border-2 border-blue-950 border-opacity-20 rounded-xl focus:outline-none focus:border-opacity-100 focus:ring-0 text-sm disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-950 text-opacity-40 hover:text-opacity-60 transition-colors"
                    aria-label="Toggle password"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-blue-950 border-opacity-10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Already have account?</span>
              </div>
            </div>

            {/* Login Link */}
            <button
              type="button"
              onClick={onSwitchToLogin}
              disabled={success}
              className="w-full border-2 border-blue-950 border-opacity-20 text-blue-950 font-bold py-3 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 text-xs mt-6">
          Your journey to exam success starts here
        </p>
      </div>
    </div>
  );
}
