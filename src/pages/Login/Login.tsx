import React, { useState, useEffect } from 'react';
import { useAuth } from '@context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import LoadingButton from '@/components/ui/LoadinButton/LoadingButton';

const Auth: React.FC = () => {

  const { login, user } = useAuth();
  const [isLogin, _setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    if (!email || !password) {
      setError('Please fill in all fields');
      setSubmitting(false);
      return;
    }
    login({ email, password })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        setError(err.response?.data?.detail || 'Login failed');
      })
      .finally(() => setSubmitting(false));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
  };

  // const toggleForm = () => {
  //   setIsLogin(!isLogin);
  //   setEmail('');
  //   setPassword('');
  //   setConfirmPassword('');
  //   setError('');
  // };

  return (
    <>
      <Helmet>
        <title>Login | Inventor Portal</title>
        <meta property="og:title" content="Login | Inventor Portal" />
        <meta name="description" content="Login or sign up to access your inventor portal and manage your patents and tickets." />
        <meta property="og:description" content="Login or sign up to access your inventor portal and manage your patents and tickets." />
      </Helmet>
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
            {isLogin && (
              <div className="mb-4 text-right">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-medium focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
            )}
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
            <LoadingButton
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold"
              loading={submitting}
              loadingText={isLogin ? 'Logging in...' : 'Signing up...'}
              disabled={submitting || !email || !password || (!isLogin && !confirmPassword)}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </LoadingButton>
          </form>
          <p className="text-sm text-gray-300 mt-4 text-center">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <a href='https://forms.office.com/Pages/ResponsePage.aspx?id=hirXO-qopkSomfPMy-3wJ7DyQY263ttEtDBgnhjOXoNUNlI0UFVTV1BWTDNTQTlFN0dWMVEyNUlBTS4u' className="text-indigo-300 hover:text-indigo-200 font-medium">
              {isLogin ? 'Sign Up' : 'Login'}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;