import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiBarChart3, FiDollarSign, FiShield } = FiIcons;

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    window.location.href = '#/dashboard';
  };

  // For development purposes, we'll bypass authentication
  // This makes it easier to test the app
  const isSignedIn = false;

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-white">
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SafeIcon icon={FiTrendingUp} className="text-4xl mr-4" />
            <h1 className="text-4xl font-bold">FinanceFlow</h1>
          </motion.div>
          <motion.h2
            className="text-3xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Professional Financial Analysis Platform
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Streamline your financial evaluations with powerful analytics and comprehensive reporting tools.
          </motion.p>
          <div className="space-y-6">
            {[
              { icon: FiBarChart3, title: 'Advanced Analytics', desc: 'Comprehensive financial modeling and forecasting' },
              { icon: FiDollarSign, title: 'Revenue Optimization', desc: 'Identify opportunities for growth and efficiency' },
              { icon: FiShield, title: 'Secure & Compliant', desc: 'Bank-level security with regulatory compliance' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <SafeIcon icon={feature.icon} className="text-2xl text-blue-200 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-blue-100">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Authentication */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="lg:hidden flex items-center justify-center mb-6">
              <SafeIcon icon={FiTrendingUp} className="text-3xl text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">FinanceFlow</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isSignUp ? 'Join thousands of financial professionals' : 'Sign in to your account'}
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;