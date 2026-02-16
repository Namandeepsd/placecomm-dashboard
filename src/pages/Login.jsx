import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (login(username, password)) {
        navigate('/');
      } else {
        setError('Invalid username or password');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Bell size={28} className="text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">PlaceComm</h1>
            <p className="text-blue-100 text-center text-sm mt-2">Placement Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 ml-2">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-semibold text-slate-900 mb-2">
                Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs font-semibold text-slate-600 mb-2">Demo Credentials:</p>
              <p className="text-xs text-slate-600">
                <span className="font-mono bg-white px-2 py-1 rounded border border-blue-200">admin</span>
                <span className="mx-2 text-slate-400">/</span>
                <span className="font-mono bg-white px-2 py-1 rounded border border-blue-200">admin123</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Session expires in 1 week
              </p>
            </div>

          </form>
        </div>

        {/* Footer Info */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Secure placement tracking system
        </p>
      </div>
    </div>
  );
};

export default Login;
