'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetAddressesQuery } from '@/store/apiSlice';
import LoginModal from '@/components/Common/LoginModal';
import toast from 'react-hot-toast';

export default function OrderForm() {
  const { isAuthenticated, accessToken, user } = useSelector((state: RootState) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    selectedAddress: '',
    scheduleType: 'asap', // 'asap' or 'schedule'
    preferredDate: '',
    preferredTime: '',
    couponCode: '',
    notes: ''
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Fetch addresses if authenticated
  const { data: addresses = [], isLoading: addressesLoading } = useGetAddressesQuery(accessToken || '', {
    skip: !isAuthenticated || !accessToken,
  });

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
    if (!formData.couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    if (!accessToken) {
      toast.error('Please login to apply coupon');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL || 'https://app.gen21.com.au/api'}/coupons?api_token=${accessToken}&version=2&code=${formData.couponCode}`, {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!formData.selectedAddress) {
      toast.error('Please select an address');
      return;
    }

    if (formData.scheduleType === 'schedule' && (!formData.preferredDate || !formData.preferredTime)) {
      toast.error('Please select preferred date and time');
      return;
    }

    // Here you would submit the order data to your backend
    console.log('Submitting order with data:', {
      ...formData,
      userId: user?.id,
      token: accessToken,
      couponApplied,
      couponDiscount
    });

    toast.success('Order placed successfully!');
    // Reset form or redirect
  };

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
    '09:00 PM', '10:00 PM',
  ];

  if (!isAuthenticated) {
    return (
      <>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Book This Service</h2>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Please login to book this service</p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
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
            <label htmlFor="selectedAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Select Address
            </label>
            <select
              id="selectedAddress"
              name="selectedAddress"
              value={formData.selectedAddress}
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
            <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="couponCode"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter coupon code"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Pay & Book Now
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
    </>
  );
}
