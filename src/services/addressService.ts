import { useGetAddressesQuery, useCreateAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } from '@/store/apiSlice';
import { CreateAddressRequest, UpdateAddressRequest } from '@/types/address';

export const useAddressService = (token: string) => {
  const { data: addresses, isLoading, error, refetch } = useGetAddressesQuery(token);
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();

  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Error getting location: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  };

  const createAddressWithLocation = async (data: Omit<CreateAddressRequest, 'latitude' | 'longitude'>) => {
    try {
      const location = await getCurrentLocation();
      const addressData: CreateAddressRequest = {
        ...data,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      return await createAddress({ data: addressData, token }).unwrap();
    } catch (error) {
      throw error;
    }
  };

  const updateAddressWithLocation = async (id: number, data: Omit<UpdateAddressRequest, 'latitude' | 'longitude'>) => {
    try {
      const location = await getCurrentLocation();
      const addressData: UpdateAddressRequest = {
        ...data,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      return await updateAddress({ id, data: addressData, token }).unwrap();
    } catch (error) {
      throw error;
    }
  };

  return {
    addresses: addresses || [],
    isLoading,
    error,
    refetch,
    createAddress: createAddressWithLocation,
    updateAddress: updateAddressWithLocation,
    deleteAddress: async (id: number) => await deleteAddress({ id, token }).unwrap(),
    isCreating,
    isUpdating,
    isDeleting,
    getCurrentLocation,
  };
};
