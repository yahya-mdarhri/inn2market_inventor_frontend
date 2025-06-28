import React, { useState } from 'react';
import { useAuth } from '@context/UserContext';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {

  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    login({ email, password })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        setError(err.response?.data?.detail || 'Login failed');
      });

  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#332D56] to-[#4E6688] p-4 w-screen overflow-hidden">
      <div className="bg-[#4E6688]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Inventor Login' : 'Inventor Signup'}
        </h1>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            />
          </div>
          {!isLogin && (
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-[#3b82f6]/30 rounded-lg bg-[#1e3a8a]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-gray-300 mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleForm}
            className="text-indigo-300 hover:text-indigo-200 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;