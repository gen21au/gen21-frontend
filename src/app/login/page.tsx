'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/Auth/LoginForm';
import { AuthService } from '@/services/authService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const checkAuth = async () => {
      // const isAuthenticated = await AuthService.isAuthenticated();
      console.log({isAuthenticated});
      
      if (isAuthenticated) {
        router.replace('/');
        return; // Prevent further execution
      }
    };
    checkAuth();
  }, [router]);

  return <LoginForm />;
}
