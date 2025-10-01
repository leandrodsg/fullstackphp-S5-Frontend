import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      if (savedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          
          const response = await api.get('/profile');
          setUser(response.data.user);
          setToken(savedToken);
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('auth_token');
          delete api.defaults.headers.common['Authorization'];
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password, remember = false) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
        remember
      });

      const { token: access_token } = response.data.data;

      // Store token
      localStorage.setItem('auth_token', access_token);
      
      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setToken(access_token);
      
      const profileResponse = await api.get('/profile');
      const userData = profileResponse.data.data.user;
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      
      if (error.response?.status === 422) {
        return {
          success: false,
          errors: error.response.data.errors || {},
          message: error.response.data.message || 'Validation failed'
        };
      }
      
      // Handle authentication errors
      if (error.response?.status === 401) {
        return {
          success: false,
          message: 'Invalid credentials. Please check your email and password.'
        };
      }

      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

      const { token: access_token } = response.data.data;

      // Store token
      localStorage.setItem('auth_token', access_token);
      
      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setToken(access_token);
      
      const profileResponse = await api.get('/profile');
      const userData = profileResponse.data.data.user;
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Registration failed:', error);
      
      if (error.response?.status === 422) {
        return {
          success: false,
          errors: error.response.data.errors || {},
          message: error.response.data.message || 'Validation failed'
        };
      }

      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      setToken(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };