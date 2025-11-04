'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import LoginShell from './components/LoginShell';
import LoginCard from './components/LoginCard';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';


export default function Login() {
  const params = useSearchParams();
  const redirectParam = params.get('redirect') || '/';

  return (
    <div>
      <LoginShell>
        <LoginCard>
          <LoginHeader />
          <LoginForm redirectParam={redirectParam} />
        </LoginCard>
      </LoginShell>
    </div>
  );
}
