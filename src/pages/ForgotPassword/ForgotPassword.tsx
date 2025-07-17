import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from '@dr.pogodin/react-helmet';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await axios.post('/api/accounts/reset-password/', { email });
      setSuccess('Password reset email sent! Please check your inbox.');
    } catch (err: any) {
      setError(
        err.response?.data?.email ||
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        'Failed to send reset email.'
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Inventor Portal</title>
      </Helmet>
      <div className="fixed top-0 left-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#332D56] to-[#4E6688] p-4 w-screen overflow-hidden">
        <div className="bg-[#4E6688]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h1>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm mb-4 text-center">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword; 