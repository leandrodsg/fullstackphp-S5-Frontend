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
      const storedToken = localStorage.getItem('auth_token');
      
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

      try {
        const response = await api.get('/profile');
        setUser(response.data.data);
      } catch (error) {
        console.error('Token validation failed:', error);
        
        // Clear invalid token
        localStorage.removeItem('auth_token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const response = await api.post('/login', { email, password });
      
      const { token: authToken, user } = response.data.data;

      // Store token and set user
      localStorage.setItem('auth_token', authToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setToken(authToken);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login failed:', error);
      
      // Clear any existing token
      localStorage.removeItem('auth_token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      setToken(null);
      
      // Return error details
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation
      });

      // API response structure: { success, message, data: { user, token } }
      if (response.data && response.data.success && response.data.data) {
        const { token, user } = response.data.data;

        // Store token
        localStorage.setItem('auth_token', token);
        
        // Set token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setToken(token);
        setUser(user);

        return { success: true, user };
      }

      // If response doesn't have expected structure
      return {
        success: false,
        message: response.data?.message || 'Registration failed. Invalid response from server.'
      };
    } catch (error) {
      console.error('Registration failed:', error);
      
      // Handle validation errors (422)
      if (error.response?.status === 422) {
        return {
          success: false,
          errors: error.response.data?.data || error.response.data?.errors || {},
          message: error.response.data?.message || 'Validation failed'
        };
      }

      // Generic error handling
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Registration failed. Please try again.'
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