'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import { AuthService } from '@/services/authService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
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

  return <ResetPasswordForm token={params.token} />;
}
