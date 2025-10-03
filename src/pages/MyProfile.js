import React, { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MyProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [loading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [formErrors, setFormErrors] = useState({});

  // Update profile state when user changes
  useEffect(() => {
    if (user) {
      setProfile(user);
      setProfileForm({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage('');

    try {
      const response = await profileAPI.update(profileForm);
      setSuccessMessage('Profile updated successfully!');
      setIsEditingProfile(false);
      // Update profile state with new data
      setProfile(response.data?.data || response.data);
    } catch (err) {
      console.error('Error updating profile:', err);
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else {
        setError('Failed to update profile');
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage('');

    // Validate password confirmation
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setFormErrors({ confirm_password: ['Passwords do not match'] });
      return;
    }

    try {
      await profileAPI.changePassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
        new_password_confirmation: passwordForm.confirm_password
      });
      setSuccessMessage('Password changed successfully!');
      setIsEditingPassword(false);
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (err) {
      console.error('Error changing password:', err);
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else {
        setError('Failed to change password');
      }
    }
  };

  const formatMemberSince = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const words = name.split(' ');
    if (words.length >= 2) {
      return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-purple-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 border border-purple-100 text-center max-w-md">
          <h2 className="text-xl font-medium text-purple-800 mb-4">Error Loading Profile</h2>
          <p className="text-purple-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">My Profile</h1>
          <p className="text-purple-600">Manage your account information and settings</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 border border-orange-200">
              <div className="text-center">
                {/* Avatar */}
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">
                    {getInitials(profile?.name)}
                  </span>
                </div>
                
                {/* User Info */}
                <h2 className="text-xl font-medium text-purple-800 mb-1">
                  {profile?.name || 'User'}
                </h2>
                <p className="text-purple-600 text-sm mb-2">{profile?.email}</p>
                <p className="text-purple-500 text-xs">
                  Member since {formatMemberSince(profile?.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Information */}
            <div className="bg-white rounded-lg shadow p-6 border border-orange-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-purple-800">Account Information</h3>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  {isEditingProfile ? 'Cancelar' : 'Editar'}
                </button>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  {/* Name */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <label htmlFor="name" className="block text-sm font-semibold text-purple-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`w-full px-3 py-2 rounded-lg text-sm ${
                        !isEditingProfile ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'border-purple-200'
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name[0]}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <label htmlFor="email" className="block text-sm font-semibold text-purple-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className={`w-full px-3 py-2 rounded-lg text-sm ${
                        !isEditingProfile ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'border-purple-200'
                      } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email[0]}</p>
                    )}
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-lg shadow border border-orange-200">
              <div className="flex justify-between items-center p-6 pb-4">
                <h3 className="text-lg font-medium text-purple-800">Change Password</h3>
                <button
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  {isEditingPassword ? 'Cancel' : 'Change Password'}
                </button>
              </div>

              {isEditingPassword && (
                <div className="px-6 pb-6">
                  <form onSubmit={handlePasswordSubmit}>
                    {/* Current Password */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                      <label htmlFor="current_password" className="block text-sm font-semibold text-purple-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current_password"
                        value={passwordForm.current_password}
                        onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                        className={`w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.current_password ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      {formErrors.current_password && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.current_password[0]}</p>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                      <label htmlFor="new_password" className="block text-sm font-semibold text-purple-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new_password"
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                        className={`w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.new_password ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      {formErrors.new_password && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.new_password[0]}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
                      <label htmlFor="confirm_password" className="block text-sm font-semibold text-purple-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm_password"
                        value={passwordForm.confirm_password}
                        onChange={(e) => setPasswordForm({...passwordForm, confirm_password: e.target.value})}
                        className={`w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.confirm_password ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      {formErrors.confirm_password && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.confirm_password[0]}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium text-sm"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;