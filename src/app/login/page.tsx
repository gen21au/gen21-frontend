import { Metadata } from 'next';
import LoginForm from '@/components/Auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - GEN21',
  description: 'Sign in to your GEN21 account to access premium services',
};

export default function LoginPage() {
  return <LoginForm />;
}
