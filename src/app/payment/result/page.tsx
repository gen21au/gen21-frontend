'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetPaymentStatusQuery, useSendRequestMutation } from '@/store/apiSlice';
import toast from 'react-hot-toast';

export default function PaymentResultPage() {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [bookingId, setBookingId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const initialToastShownRef = useRef<boolean>(false);
  const sendRequestCalledRef = useRef<boolean>(false);

  // Get payment status
  const { data: paymentStatus, isLoading } = useGetPaymentStatusQuery(
    { bookingId, token: accessToken || '' },
    { skip: !bookingId || !accessToken }
  );

  // Send request mutation
  const [sendRequest, { isLoading: isSendingRequest }] = useSendRequestMutation();

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
    if (statusParam === 'success' && !initialToastShownRef.current) {
      toast.success('Payment initiated successfully! Verifying payment status...');
      initialToastShownRef.current = true;
    } else if (statusParam === 'failed' && !initialToastShownRef.current) {
      toast.error('Payment failed. Please try again.');
      initialToastShownRef.current = true;
    }
  }, []);

  useEffect(() => {
    // Handle payment status verification
    if (paymentStatus) {
      if (paymentStatus.success && paymentStatus.data) {
        const actualStatus = paymentStatus.data.status;
        const isRequested = paymentStatus.data.is_requested;
        const orderId = paymentStatus.data.order_id;

        if (actualStatus === 'completed') {
          toast.success('Payment completed successfully!');

          // Check if status is completed and is_requested is 0, then call send-request API
          if (isRequested === 0 && orderId && !sendRequestCalledRef.current) {
            sendRequestCalledRef.current = true; // Prevent multiple calls
            sendRequest({
              orderId: orderId.toString(),
              token: accessToken || ''
            })
              .unwrap()
              .then((result) => {
                if (result.success) {
                  toast.success('Service request sent successfully!');
                } else {
                  toast.error('Failed to send service request. Please contact support.');
                }
              })
              .catch((error) => {
                console.error('Send request error:', error);
                toast.error('Failed to send service request. Please contact support.');
              });
          }

          // Redirect to dashboard or booking details
          // setTimeout(() => {
          //   router.push('/dashboard/orders');
          // }, 2000);
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
  }, [paymentStatus, router, sendRequest, accessToken]);

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

            {paymentStatus?.data?.amount && paymentStatus?.data?.currency && (
              <div className="text-sm text-gray-500">
                <strong>Amount:</strong> {paymentStatus.data.currency} {paymentStatus.data.amount}
              </div>
            )}

            {status === 'success' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-lg font-semibold text-blue-900">Download Gen21 App</span>
                </div>
                <p className="text-blue-800 text-center mb-4">
                  Please open the Gen21 app or download it to process the next steps and track your order.
                </p>
                <div className="flex space-x-2 justify-center">
                  {process.env.NEXT_PUBLIC_USER_APP_IOS_URL && (
                    <a
                      href={process.env.NEXT_PUBLIC_USER_APP_IOS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
                    >
                      Download for iOS
                    </a>
                  )}
                  {process.env.NEXT_PUBLIC_USER_APP_ANDROID_URL && (
                    <a
                      href={process.env.NEXT_PUBLIC_USER_APP_ANDROID_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      Download for Android
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard/orders')}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              >
                View Orders
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors cursor-pointer"
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
