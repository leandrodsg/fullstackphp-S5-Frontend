import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isCurrentRoute = (path) => location.pathname === path;

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Subscriptions', href: '/subscriptions', icon: SubscriptionsIcon },
    { name: 'Services', href: '/services', icon: ServicesIcon },
    { name: 'Reports', href: '/reports', icon: ReportsIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-rose-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-50 to-purple-100 shadow-lg border-r border-purple-200 lg:hidden transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <MobileSidebarContent 
          navigation={navigation} 
          isCurrentRoute={isCurrentRoute}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-50 to-purple-100 shadow-lg border-r border-purple-200 hidden lg:block">
        <DesktopSidebarContent 
          navigation={navigation} 
          isCurrentRoute={isCurrentRoute}
        />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top Bar for Mobile */}
        <div className="lg:hidden bg-white/70 backdrop-blur-sm border-b border-purple-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-purple-600 hover:bg-purple-100"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo_NoBg.svg" alt="TechSubs Logo" className="h-6" />
            </div>
            <div className="w-10"></div> {/* Spacer */}
          </div>
        </div>

        {/* Main content area */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

const DesktopSidebarContent = ({ navigation, isCurrentRoute }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to login
      navigate('/login');
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="flex items-center justify-center h-20 px-4 border-b border-purple-200">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo_NoBg.svg" alt="TechSubs" className="h-8" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 pb-20">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isCurrent = isCurrentRoute(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                isCurrent
                  ? 'bg-gradient-to-r from-purple-200 to-rose-100 text-purple-800 shadow-sm'
                  : 'text-purple-700 hover:bg-purple-100 hover:text-purple-800'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isCurrent ? 'text-purple-600' : 'text-purple-500 group-hover:text-purple-600'}`} />
              {item.name}
              {isCurrent && (
                <div className="ml-auto w-2 h-2 bg-rose-400 rounded-full"></div>
              )}
            </Link>
          );
        })}

      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-200 bg-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-purple-800 truncate">{user?.name || 'User'}</p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-purple-600">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
          {/* Settings Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-1 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors"
            >
              <MoreVerticalIcon className="w-5 h-5" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-lg border border-purple-200 py-2">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                >
                  <LogoutIcon className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const MobileSidebarContent = ({ navigation, isCurrentRoute, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to login
      navigate('/login');
    }
  };
  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-center h-20 px-4 border-b border-purple-200">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo_NoBg.svg" alt="TechSubs" className="h-8" />
        </Link>
        <button 
          onClick={onClose}
          className="absolute right-4 p-2 rounded-lg text-purple-600 hover:bg-purple-100"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <nav className="mt-6 px-3 pb-20">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isCurrent = isCurrentRoute(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`group flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                isCurrent
                  ? 'bg-gradient-to-r from-purple-200 to-rose-100 text-purple-800 shadow-sm'
                  : 'text-purple-700 hover:bg-purple-100 hover:text-purple-800'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isCurrent ? 'text-purple-600' : 'text-purple-500 group-hover:text-purple-600'}`} />
              {item.name}
              {isCurrent && (
                <div className="ml-auto w-2 h-2 bg-rose-400 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-200 bg-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-purple-800 truncate">{user?.name || 'User'}</p>
            <span className="text-xs text-purple-600">{user?.email || 'user@example.com'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <LogoutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

// Icon components
const DashboardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
  </svg>
);

const ServicesIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const SubscriptionsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ReportsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ProfileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MoreVerticalIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default AppLayout;