'use client';

import React, { useState, useEffect } from 'react';
import { useCreateAddressMutation } from '@/store/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CreateAddressRequest } from '@/types/address';
import toast from 'react-hot-toast';
import Spinner from '@/components/Common/Spinner';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressAdded?: () => void;
}

export default function AddAddressModal({ isOpen, onClose, onAddressAdded }: AddAddressModalProps) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const [formData, setFormData] = useState({
    address: '',
    latitude: '0',
    longitude: '0',
    description: '',
  });

  // Get current location when modal opens
  useEffect(() => {
    if (isOpen) {
      const getCurrentLocation = () => {
        if (!navigator.geolocation) {
          toast.error('Geolocation is not supported by this browser.');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData(prev => ({
              ...prev,
              latitude: latitude.toFixed(6),
              longitude: longitude.toFixed(6),
            }));
          },
          (error) => {
            console.error('Error getting location:', error);
            toast.error('Unable to get your current location. Coordinates will be set to 0.');
            // Keep default values of '0'
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          }
        );
      };

      getCurrentLocation();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.address.trim()) {
      toast.error('Please enter an address');
      return;
    }

    if (!accessToken) {
      toast.error('Please login to add address');
      return;
    }

    try {
      const addressData: CreateAddressRequest = {
        address: formData.address,
        latitude: formData.latitude ? parseFloat(formData.latitude) : 0,
        longitude: formData.longitude ? parseFloat(formData.longitude) : 0,
      };

      if (formData.latitude) {
        addressData.latitude = parseFloat(formData.latitude);
      }

      if (formData.longitude) {
        addressData.longitude = parseFloat(formData.longitude);
      }

      const result = await createAddress({
        data: addressData,
        token: accessToken,
      }).unwrap();

      toast.success('Address added successfully!');
      setFormData({
        address: '',
        latitude: '0',
        longitude: '0',
        description: '',
      });
      onAddressAdded?.();
      onClose();
    } catch (error) {
      toast.error('Failed to add address. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full address"
                rows={3}
              />
            </div>

            {/* Description (Optional) */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Apartment 5B, near the park"
              />
            </div>

            {/* Coordinates (Auto-filled, readonly) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="text"
                  value={formData.latitude}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  placeholder="Will be auto-filled"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  id="longitude"
                  name="longitude"
                  type="text"
                  value={formData.longitude}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  placeholder="Will be auto-filled"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                'Add Address'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
