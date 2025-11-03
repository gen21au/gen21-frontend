'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/authSlice';
import { BASE_API_URL } from '@/utils/api_endpoints';
import { getMediaUrl } from '@/helper/media.helper';
import toast from 'react-hot-toast';

interface CallbackPageProps {
  params: Promise<{
    provider: string;
  }>;
}

export default function Callback({ params }: CallbackPageProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [provider, setProvider] = useState<string>('');

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProvider(resolvedParams.provider);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await fetch(`${BASE_API_URL}/social-login/${provider}?version=1`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              device_token: localStorage.getItem('device_token') || ''
            }),
          });

          const data = await response.json();

          if (data.success) {
            // Store user data and token
            dispatch(setCredentials({
              user: {
                id: data.data.id,
                name: data.data.name,
                email: data.data.email,
                role: data.data.roles && data.data.roles.length > 0 ? data.data.roles[0].name : 'user',
                avatarUrl: getMediaUrl(data.data, "avatar", "thumb", "/images/avatar.png"),
              },
              accessToken: data.data.api_token,
              isAuthenticated: true,
            }));

            toast.success('Login successful!');
            // Redirect to dashboard or home
            router.push('/dashboard');
          } else {
            toast.error(data.message || 'Social login failed');
            router.push('/login?error=social_login_failed');
          }
        } catch (error) {
          console.error('Social login failed:', error);
          toast.error('Social login failed. Please try again.');
          router.push('/login?error=social_login_failed');
        }
      } else {
        toast.error('Authorization code not found');
        router.push('/login?error=no_code');
      }
    };

    if (provider) {
      handleCallback();
    }
  }, [provider, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Processing Login...
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your {provider} login.
        </p>
      </div>
    </div>
  );
}
