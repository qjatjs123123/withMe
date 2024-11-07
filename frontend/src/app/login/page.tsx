'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // This ensures that the code is run only on the client side
    router.replace('/');
  }, [router]);

  return <></>;
}
