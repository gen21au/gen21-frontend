'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/authSlice';
import { TokenManager } from '@/utils/tokenManager';
import { TokenValidation } from '@/utils/tokenValidation';
import { getMediaUrl } from '@/helper/media.helper';
import Spinner from '@/components/Common/Spinner';
import { TokenValidationResult } from '@/types/auth';

export default function SocialLoginPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Please wait while we verify your login...');

  useEffect(() => {
    const validateToken = async () => {
      const token = params.token as string;

      if (!token) {
        setMessage('Invalid token provided');
        setTimeout(() => {
          router.push('/login?error=invalid_token');
        }, 2000);
        return;
      }

      try {
        // Validate the token using the API
        const validationResult = await TokenValidation.validateToken(token);

        if (validationResult.isValid && validationResult.data) {
          const userData = validationResult.data; // Type assertion needed due to API response structure

          dispatch(setCredentials({
            user: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.roles && Array.isArray(userData.roles) && userData.roles.length > 0 ? userData.roles[0].name : 'user',
              avatarUrl: getMediaUrl(userData, "avatar", "thumb", "/images/avatar.png"),
            },
            accessToken: userData.api_token as string,
            isAuthenticated: true,
          }));

          // Store tokens in localStorage
          TokenManager.setTokens(userData.api_token as string, {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.roles && Array.isArray(userData.roles) && userData.roles.length > 0 ? userData.roles[0].name : 'user',
            avatarUrl: getMediaUrl(userData, "avatar", "thumb", "/images/avatar.png"),
          });

          setMessage('Login successful! Redirecting to dashboard...');
          setTimeout(() => {
            router.push('/dashboard?success=social_login');
          }, 1500);
        } else {
          // Token validation failed
          setMessage('Login verification failed. Redirecting to login page...');
          setTimeout(() => {
            router.push('/login?error=token_validation_failed');
          }, 2000);
        }
      } catch (error) {
        console.error('Social login validation error:', error);
        setMessage('Network error occurred. Redirecting to login page...');
        setTimeout(() => {
          router.push('/login?error=network_error');
        }, 2000);
      }
    };

    validateToken();
  }, [params.token, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <Spinner size="lg" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Social Login
        </h2>
        <p className="text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}
