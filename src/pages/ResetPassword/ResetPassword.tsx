import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';

const ResetPassword: React.FC = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`/api/accounts/reset-password-confirm/${uidb64}/${token}/`, { new_password: newPassword });
      setSuccess('Password reset successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.new_password ||
        err.response?.data?.detail ||
        'Failed to reset password.'
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Inventor Portal</title>
      </Helmet>
      <div className="fixed top-0 left-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#332D56] to-[#4E6688] p-4 w-screen overflow-hidden">
        <div className="bg-[#4E6688]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h1>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm mb-4 text-center">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                required
                autoFocus
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword; 