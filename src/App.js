import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyServices from './pages/MyServices';
import CreateService from './pages/CreateService';
import ServiceDetails from './pages/ServiceDetails';
import EditService from './pages/EditService';
import MySubscriptions from './pages/MySubscriptions';
import CreateSubscription from './pages/CreateSubscription';
import SubscriptionDetails from './pages/SubscriptionDetails';
import EditSubscription from './pages/EditSubscription';
import Reports from './pages/Reports';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }}
      >
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Placeholder routes for development */}
          <Route path="/services" element={
            <ProtectedRoute>
              <AppLayout>
                <MyServices />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/services/create" element={
            <ProtectedRoute>
              <AppLayout>
                <CreateService />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/services/:id" element={
            <ProtectedRoute>
              <AppLayout>
                <ServiceDetails />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/services/:id/edit" element={
            <ProtectedRoute>
              <AppLayout>
                <EditService />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscriptions" element={
            <ProtectedRoute>
              <AppLayout>
                <MySubscriptions />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscriptions/create" element={
            <ProtectedRoute>
              <AppLayout>
                <CreateSubscription />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscriptions/:id" element={
            <ProtectedRoute>
              <AppLayout>
                <SubscriptionDetails />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/subscriptions/:id/edit" element={
            <ProtectedRoute>
              <AppLayout>
                <EditSubscription />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <AppLayout>
                <Reports />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <AppLayout>
                <MyProfile />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Redirect unknown routes to 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
