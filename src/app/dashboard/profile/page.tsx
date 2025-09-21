'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { useUpdateProfileMutation, useValidateTokenQuery, useUpdateAvatarMutation, useUpdatePasswordMutation } from '@/store/apiSlice';
// import { User } from '@/types/auth';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { accessToken: token, user } = useAppSelector((state) => state.auth);
  const { data: currentUser, isLoading: isUserLoading, error: userError } = useValidateTokenQuery(undefined, {
    skip: !token,
  });

  const [updateProfile, { isLoading: isUpdating, isSuccess: isProfileUpdateSuccess, isError: isProfileUpdateError, error: profileUpdateError }] = useUpdateProfileMutation();
  const [updateAvatar, { isLoading: isAvatarUpdating, isSuccess: isAvatarUpdateSuccess, isError: isAvatarUpdateError, error: avatarUpdateError }] = useUpdateAvatarMutation();
  const [updatePassword, { isLoading: isPasswordUpdating, isSuccess: isPasswordUpdateSuccess, isError: isPasswordUpdateError, error: passwordUpdateError }] = useUpdatePasswordMutation();

  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [passwordFormData, setPasswordFormData] = useState({
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (currentUser) {
      setProfileFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone_number: currentUser.phone_number || '',
        address: currentUser.address || '',
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (isProfileUpdateSuccess) {
      toast.success('Profile updated successfully!');
    }
    if (isProfileUpdateError) {
      console.error('Failed to update profile:', profileUpdateError);
      toast.error('Failed to update profile.');
    }
  }, [isProfileUpdateSuccess, isProfileUpdateError, profileUpdateError]);

  useEffect(() => {
    if (isAvatarUpdateSuccess) {
      toast.success('Avatar updated successfully!');
    }
    if (isAvatarUpdateError) {
      console.error('Failed to update avatar:', avatarUpdateError);
      toast.error('Failed to update avatar.');
    }
  }, [isAvatarUpdateSuccess, isAvatarUpdateError, avatarUpdateError]);

  useEffect(() => {
    if (isPasswordUpdateSuccess) {
      toast.success('Password updated successfully!');
      setPasswordFormData({ password: '', password_confirmation: '' });
    }
    if (isPasswordUpdateError) {
      console.error('Failed to update password:', passwordUpdateError);
      toast.error('Failed to update password.');
    }
  }, [isPasswordUpdateSuccess, isPasswordUpdateError, passwordUpdateError]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id && token) {
      await updateProfile({ id: user.id, data: profileFormData, token });
    }
  };

  const handleAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id && token && avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      await updateAvatar({ id: user.id, formData, token });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id && token) {
      if (passwordFormData.password !== passwordFormData.password_confirmation) {
        toast.error('Passwords do not match.');
        return;
      }
      await updatePassword({ id: user.id, data: passwordFormData, token });
    }
  };

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-64">Loading profile...</div>;
  }

  if (userError) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading profile.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      {/* Profile Information Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={profileFormData.name}
              onChange={handleProfileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={profileFormData.email}
              onChange={handleProfileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              disabled
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              value={profileFormData.phone_number}
              onChange={handleProfileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={profileFormData.address}
              onChange={handleProfileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Avatar Update Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Update Avatar</h2>
        <form onSubmit={handleAvatarSubmit} className="space-y-4">
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isAvatarUpdating}
          >
            {isAvatarUpdating ? 'Uploading...' : 'Upload Avatar'}
          </button>
        </form>
      </div>

      {/* Password Update Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={passwordFormData.password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={passwordFormData.password_confirmation}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isPasswordUpdating}
          >
            {isPasswordUpdating ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
