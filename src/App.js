import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Mock data for dashboard testing
const mockDashboardData = {
  monthlyTotalEUR: 247.00,
  monthlyTotalUSD: 267.42,
  activeSubscriptions: 12,
  totalServices: 18,
  recentSubscriptions: [
    {
      id: 1,
      service: { name: 'GitHub', category: 'Development' },
      plan: 'Pro',
      price: 4.00,
      status: 'active'
    },
    {
      id: 2,
      service: { name: 'ChatGPT', category: 'AI Tools' },
      plan: 'Plus',
      price: 20.00,
      status: 'active'
    },
    {
      id: 3,
      service: { name: 'Vercel', category: 'Hosting' },
      plan: 'Pro',
      price: 20.00,
      status: 'paused'
    }
  ],
  recentServices: [
    {
      id: 1,
      name: 'Vercel',
      category: 'Hosting',
      website: 'vercel.com'
    },
    {
      id: 2,
      name: 'Netlify',
      category: 'Hosting',
      website: 'netlify.com'
    }
  ]
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard data={mockDashboardData} />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Placeholder routes for development */}
          <Route path="/services" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900">Services (Coming Soon)</h1>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscriptions" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900">Subscriptions (Coming Soon)</h1>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900">Reports (Coming Soon)</h1>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <AppLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900">Profile (Coming Soon)</h1>
                </div>
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Redirect unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
