import { Suspense } from 'react';
import LoginClient from '@/components/LoginClient';

export const metadata = {
  title: 'DocAppoint — Login',
  description: 'Sign in to your DocAppoint account to manage your doctor appointments.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
