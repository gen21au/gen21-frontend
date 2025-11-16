'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAddressesQuery, useCreateBookingRequestMutation, useInitiatePaymentMutation } from '@/store/apiSlice';
import { BookingRequestPayload } from '@/services/bookingService';
import LoginModal from '@/components/Common/LoginModal';
import AddAddressModal from './AddAddressModal';
import toast from 'react-hot-toast';
import { ServiceType } from '@/types/services';
import { timeSlots } from '@/utils/constants';
import Link from 'next/link';

interface OrderServiceProps {
  service: ServiceType;
}

export default function OrderForm( { service }: OrderServiceProps) {
  const { isAuthenticated, accessToken, user } = useSelector((state: RootState) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    scheduleType: 'asap', // 'asap' or 'schedule'
    preferredDate: '',
    preferredTime: '',
    coupon_code: '',
    notes: ''
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Fetch addresses if authenticated
  const { data: addresses = [], isLoading: addressesLoading } = useGetAddressesQuery(accessToken || '', {
    skip: !isAuthenticated || !accessToken,
  });

  // Booking mutations
  const [createBookingRequest, { isLoading: isBookingLoading }] = useCreateBookingRequestMutation();
  const [initiatePayment, { isLoading: isPaymentLoading }] = useInitiatePaymentMutation();

  // Check authentication on mount
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setShowLoginModal(true);
  //   }
  // }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleTypeChange = (type: 'asap' | 'schedule') => {
    setFormData(prev => ({ ...prev, scheduleType: type }));
  };

  const applyCoupon = async () => {
    if (!formData.coupon_code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    if (!accessToken) {
      toast.error('Please login to apply coupon');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL || 'https://app.gen21.com.au/api'}/coupons?api_token=${accessToken}&version=2&code=${formData.coupon_code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setCouponApplied(true);
        setCouponDiscount(data.data.discount || 0);
        toast.success('Coupon applied successfully!');
      } else {
        toast.error(data.message || 'Invalid coupon code');
        setCouponApplied(false);
        setCouponDiscount(0);
      }
    } catch (error) {
      toast.error('Failed to apply coupon. Please try again.');
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the Terms & Conditions, Privacy Policy, and Return & Refund Policy');
      return;
    }

    if (!formData.address) {
      toast.error('Please select an address');
      return;
    }

    if (formData.scheduleType === 'schedule' && (!formData.preferredDate || !formData.preferredTime)) {
      toast.error('Please select preferred date and time');
      return;
    }

    if (!accessToken) {
      toast.error('Authentication token not found');
      return;
    }

    // Find selected address
    const selectedAddress = addresses.find(addr => addr.id.toString() === formData.address);
    if (!selectedAddress) {
      toast.error('Selected address not found');
      return;
    }

    // Prepare booking payload
    const bookingPayload: BookingRequestPayload = {
      coupon_code: couponApplied ? formData.coupon_code : undefined,
      note: formData.notes || undefined,
      address: {
        id: selectedAddress.id.toString(),
        description: selectedAddress.description || '',
        address: selectedAddress.address,
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
        default: false, // You can set this based on user preference
        user_id: selectedAddress.user_id.toString(),
      },
      service: [
        {
          id: null,
          service_type: 'service',
          service_name: service.title, // This should come from service details
          e_service_id: service.id.toString(),
          name: service.title, // This should come from service details
          image_url: service?.images?.[0] || '', // This should come from service details
          price: service?.price || 0, // This should come from service details
          minimum_unit: '1', //service?.minimum_unit,
          added_unit: '1',
          booking_at: new Date().toISOString(),
        }
      ]
    };

    try {
      // Step 1: Create booking request
      const bookingResult = await createBookingRequest({
        payload: bookingPayload,
        token: accessToken,
      }).unwrap();

      if (!bookingResult.success || !bookingResult.data?.booking_id) {
        toast.error(bookingResult.message || 'Failed to create booking request');
        return;
      }

      const bookingId = bookingResult.data.booking_id.toString();

      // Step 2: Initiate payment
      const paymentResult = await initiatePayment({
        bookingId,
        token: accessToken,
      }).unwrap();

      if (paymentResult.success && paymentResult.data?.GatewayPageURL) {
        // Redirect to SSLCommerz payment gateway
        window.location.href = paymentResult.data.GatewayPageURL;
      } else {
        toast.error(paymentResult.message || 'Failed to initiate payment');
      }
    } catch (error) {
      toast.error('Failed to process booking. Please try again.');
    }
  };


  if (!isAuthenticated) {
    return (
      <>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Book This Service</h2>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Please login to book this service</p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Login to Continue
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Book This Service</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Selection */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Select Address
            </label>
            <select
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={addressesLoading}
            >
              <option value="">
                {addressesLoading ? 'Loading addresses...' : 'Select an address'}
              </option>
              {addresses.map(address => (
                <option key={address.id} value={address.id}>
                  {address.address}
                </option>
              ))}
            </select>
            <div className="mt-1 text-right">
              <button
                type="button"
                onClick={() => setShowAddAddressModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                + Add new address
              </button>
            </div>
          </div>

          {/* Time Schedule Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Schedule</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="asap"
                  name="scheduleType"
                  value="asap"
                  checked={formData.scheduleType === 'asap'}
                  onChange={() => handleScheduleTypeChange('asap')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="asap" className="ml-2 block text-sm text-gray-700">
                  As Soon As Possible
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="schedule"
                  name="scheduleType"
                  value="schedule"
                  checked={formData.scheduleType === 'schedule'}
                  onChange={() => handleScheduleTypeChange('schedule')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="schedule" className="ml-2 block text-sm text-gray-700">
                  Schedule Order
                </label>
              </div>
            </div>
          </div>

          {/* Preferred Date & Time - Only show if Schedule Order is selected */}
          {formData.scheduleType === 'schedule' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required={formData.scheduleType === 'schedule'}
                />
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required={formData.scheduleType === 'schedule'}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Coupon Code */}
          <div>
            <label htmlFor="coupon_code" className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="coupon_code"
                name="coupon_code"
                value={formData.coupon_code}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter coupon code"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-sm text-green-600 mt-1">
                Coupon applied! {couponDiscount}% discount
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special instructions or requirements"
              rows={3}
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              required
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link href="/terms-conditions" className="text-blue-600 hover:text-blue-800 underline">
                Terms & Conditions
              </Link>
              ,{' '}
              <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
              , and{' '}
              <Link href="/return-refund-policy" className="text-blue-600 hover:text-blue-800 underline">
                Return & Refund Policy
              </Link>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isBookingLoading || isPaymentLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isBookingLoading || isPaymentLoading) ? 'Processing...' : 'Pay & Book Now'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            By booking, you agree to our terms and conditions.
          </p>
        </form>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <AddAddressModal
        isOpen={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onAddressAdded={() => {
          // Refetch addresses after adding new one
          // This will be handled by RTK Query cache invalidation
        }}
      />
    </>
  );
}
