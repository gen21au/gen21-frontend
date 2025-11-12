'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import { AuthService } from '@/services/authService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        router.replace('/');
        return;
      }
    };
    checkAuth();
  }, [router, isAuthenticated]);

  return <ForgotPasswordForm />;
}
