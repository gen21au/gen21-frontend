'use client'

import { useState } from 'react';
import { useAppSelector } from '@/store/store';
import { useAddressService } from '@/services/addressService';
import { Address } from '@/types/address';
import toast from 'react-hot-toast';
import Spinner from '@/components/Common/Spinner';

export default function AddressesPage() {
  const { accessToken: token } = useAppSelector((state) => state.auth);
  const {
    addresses,
    isLoading,
    error,
    createAddress,
    updateAddress,
    deleteAddress,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAddressService(token || '');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const resetForm = () => {
    setFormData({ description: '', address: '', latitude: '', longitude: '' });
    setEditingAddress(null);
  };

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setFormData({
        description: address.description || '',
        address: address.address,
        latitude: address.latitude.toString(),
        longitude: address.longitude.toString(),
      });
      setEditingAddress(address.id);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    try {
      if (editingAddress) {
        await updateAddress(editingAddress, formData);
        toast.success('Address updated successfully!');
      } else {
        await createAddress(formData);
        toast.success('Address created successfully!');
      }
      handleCloseModal();
    } catch (error: unknown) {
      console.error('Failed to save address:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save address.';
      toast.error(errorMessage);
    }
  };

  const handleDeleteClick = (address: Address) => {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;

    try {
      await deleteAddress(addressToDelete.id);
      toast.success('Address deleted successfully!');
      setIsDeleteModalOpen(false);
      setAddressToDelete(null);
    } catch (error: unknown) {
      console.error('Failed to delete address:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete address.';
      toast.error(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading addresses.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No addresses found.</p>
          <p className="text-gray-400">Add your first address to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white p-6 rounded-lg shadow-md border">
              <div className="space-y-2">
                {address.description && (
                  <h3 className="font-semibold text-lg">{address.description}</h3>
                )}
                <p className="text-gray-600">{address.address}</p>
                <p className="text-sm text-gray-500">
                  Lat: {address.latitude.toFixed(6)}, Lng: {address.longitude.toFixed(6)}
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleOpenModal(address)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors cursor-pointer"
                  disabled={isUpdating}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(address)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors cursor-pointer"
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Home, Office"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address *
                </label>
                <textarea
                  name="address"
                  id="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                  required
                />
              </div>
              {editingAddress ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        id="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 23.8103"
                      />
                    </div>
                    <div>
                      <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        id="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 90.4125"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Coordinates will be automatically detected</span> when you create the address.
                  </p>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? 'Saving...' : (editingAddress ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && addressToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Address</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this address?
            </p>
            {addressToDelete.description && (
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <p className="font-semibold">{addressToDelete.description}</p>
                <p className="text-sm text-gray-600">{addressToDelete.address}</p>
              </div>
            )}
            {!addressToDelete.description && (
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <p className="text-sm text-gray-600">{addressToDelete.address}</p>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
