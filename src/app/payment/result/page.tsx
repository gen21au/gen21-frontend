'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetPaymentStatusQuery } from '@/store/apiSlice';
import toast from 'react-hot-toast';

export default function PaymentResultPage() {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [bookingId, setBookingId] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Get payment status
  const { data: paymentStatus, isLoading } = useGetPaymentStatusQuery(
    { bookingId, token: accessToken || '' },
    { skip: !bookingId || !accessToken }
  );

  useEffect(() => {
    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookingIdParam = urlParams.get('booking_id');
    const statusParam = urlParams.get('status');

    if (bookingIdParam) {
      setBookingId(bookingIdParam);
    }

    if (statusParam) {
      setStatus(statusParam);
    }

    // Show initial message based on status
    if (statusParam === 'success') {
      toast.success('Payment initiated successfully! Verifying payment status...');
    } else if (statusParam === 'failed') {
      toast.error('Payment failed. Please try again.');
    }
  }, []);

  useEffect(() => {
    // Handle payment status verification
    if (paymentStatus) {
      if (paymentStatus.success && paymentStatus.data) {
        const actualStatus = paymentStatus.data.status;

        if (actualStatus === 'completed') {
          toast.success('Payment completed successfully!');
          // Redirect to dashboard or booking details
          setTimeout(() => {
            router.push('/dashboard/orders');
          }, 2000);
        } else if (actualStatus === 'pending') {
          toast.loading('Payment is being processed. Please wait...');
        } else if (actualStatus === 'failed') {
          toast.error('Payment verification failed. Please contact support.');
        } else {
          toast.error('Unknown payment status. Please contact support.');
        }
      } else {
        toast.error('Failed to verify payment status. Please contact support.');
      }
    }
  }, [paymentStatus, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'success' ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful</h2>
              <p className="text-gray-600 mb-4">Your booking has been confirmed successfully!</p>
            </>
          ) : status === 'failed' ? (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Failed</h2>
              <p className="text-gray-600 mb-4">Your payment could not be processed. Please try again.</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Unknown Status</h2>
              <p className="text-gray-600 mb-4">Unable to determine payment status. Please contact support.</p>
            </>
          )}

          <div className="space-y-3">
            {bookingId && (
              <div className="text-sm text-gray-500">
                <strong>Booking ID:</strong> {bookingId}
              </div>
            )}

            {paymentStatus?.data && (
              <div className="text-sm text-gray-500">
                <strong>Transaction ID:</strong> {paymentStatus.data.tran_id}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard/orders')}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                View Orders
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
