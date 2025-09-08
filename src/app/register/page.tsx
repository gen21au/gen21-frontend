'use client';

import { Metadata } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/Auth/RegisterForm';
import { AuthService } from '@/services/authService';


export default function RegisterPage() {
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

  return <RegisterForm />;
}
