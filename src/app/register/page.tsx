import { Metadata } from 'next';
import RegisterForm from '@/components/Auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - GEN21',
  description: 'Create your GEN21 account and start accessing premium services',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
