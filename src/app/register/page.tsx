'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/Auth/RegisterForm';
// import { AuthService } from '@/services/authService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      // const isAuthenticated = await AuthService.isAuthenticated();
      
      if (isAuthenticated) {
        router.replace('/');
        return; // Prevent further execution
      }
    };
    checkAuth();
  }, [router]);

  return <RegisterForm />;
}
