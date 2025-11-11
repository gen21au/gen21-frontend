'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { useUpdateProfileMutation, useValidateTokenQuery } from '@/store/apiSlice';
import { User } from '@/types/auth';
import toast from 'react-hot-toast';
import Spinner from '@/components/Common/Spinner';
import { getMediaUrl } from '@/helper/media.helper';

export default function ProfilePage() {
  const { accessToken: token, user } = useAppSelector((state) => state.auth);
  const { data: currentUser, isLoading: isUserLoading, error: userError } = useValidateTokenQuery({ api_token: token || '' });

  const [updateProfile, { isLoading: isUpdating, isSuccess, isError, error: updateError }] = useUpdateProfileMutation();

  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    bio: '', // Added bio field
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
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
        address: currentUser?.custom_fields?.address?.value || '',
        bio: currentUser?.custom_fields?.bio?.value || '', // Set bio from currentUser
      });
    }
  }, [currentUser]);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully!');
      setPasswordFormData({ password: '', password_confirmation: '' }); // Clear password fields on success
      setAvatarFile(null); // Clear avatar file on success
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(null);
      }
    }
    if (isError) {
      console.error('Failed to update profile:', updateError);
      toast.error('Failed to update profile.');
    }
  }, [isSuccess, isError, updateError, avatarPreview]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !token) {
      toast.error('User not authenticated.');
      return;
    }

    const combinedData: Partial<User> & { password?: string; password_confirmation?: string } = { ...profileFormData };

    if (passwordFormData.password) {
      if (passwordFormData.password !== passwordFormData.password_confirmation) {
        toast.error('Passwords do not match.');
        return;
      }
      combinedData.password = passwordFormData.password;
      combinedData.password_confirmation = passwordFormData.password_confirmation;
    }

    if (avatarFile) {
      // Send profile data first
      const formData = new FormData();
      formData.append('name', profileFormData.name);
      formData.append('email', profileFormData.email);
      formData.append('phone_number', profileFormData.phone_number);
      formData.append('address', profileFormData.address);
      formData.append('bio', profileFormData.bio);

      if (passwordFormData.password) {
        formData.append('password', passwordFormData.password);
        formData.append('password_confirmation', passwordFormData.password_confirmation);
      }

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      await updateProfile({ id: user.id, data: formData, token });
    } else {
      await updateProfile({ id: user.id, data: combinedData, token });
    }
  };

  if (isUserLoading) {
    return <Spinner />;
  }

  if (userError) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading profile.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Profile Information Fields */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={profileFormData.name}
            onChange={handleProfileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            id="bio"
            rows={3}
            value={profileFormData.bio}
            onChange={handleProfileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Avatar Update Field */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Update Avatar</h2>
            <div className="mb-4">
              <img src={avatarPreview || getMediaUrl(currentUser, "avatar", "thumb", "/images/avatar.png")} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
            </div>
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

        {/* Password Update Fields */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Update Password</h2>
          <p className="text-sm text-gray-600 mb-4">Leave the password fields blank if you do not wish to change your current password.</p>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={passwordFormData.password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
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
  );
}
