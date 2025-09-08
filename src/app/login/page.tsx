'use client';

import { Metadata } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/Auth/LoginForm';
import { AuthService } from '@/services/authService';


export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        router.replace('/'); // Redirect to home page if already authenticated
      }
    };
    checkAuth();
  }, [router]);

  return <LoginForm />;
}
