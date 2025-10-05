import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await register(
      formData.name, 
      formData.email, 
      formData.password, 
      formData.password_confirmation
    );
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors(result.errors || {});
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white/70 backdrop-blur-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo_NoBg.svg" alt="TechSubs Logo" className="h-8" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-purple-100">
            <div className="px-8 py-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-purple-800 mb-3">
                  Join TechSubs
                </h2>
                <p className="text-purple-600">
                  Create your account to get started
                </p>
              </div>

              {/* Errors */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 bg-red-100 border border-red-300 rounded-md py-2 px-3">
                  <div className="text-sm text-red-600 font-medium mb-2">Oops! Something went wrong:</div>
                  <ul className="text-sm text-red-600 list-disc list-inside">
                    {Object.values(errors).flat().map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-purple-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="block w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-purple-50/50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-purple-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="block w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-purple-50/50"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-purple-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="block w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-purple-50/50"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="password_confirmation" className="block text-sm font-semibold text-purple-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="block w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-purple-50/50"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                {/* Login Link */}
                <div className="text-center space-y-3">
                  <p className="text-sm text-purple-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 underline">
                      Sign in here
                    </Link>
                  </p>
                  <p className="text-sm text-purple-600">
                    <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500 underline">
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-purple-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-purple-700 mb-2 md:mb-0">
              © {new Date().getFullYear()} TechSubs. Secure authentication for developers.
            </p>
            <div className="flex space-x-4 text-sm text-purple-600">
              <button className="hover:text-purple-800 transition-colors">Privacy</button>
              <button className="hover:text-purple-800 transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;