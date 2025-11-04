import React from 'react';
import '../styles/LoginShell.css';

interface LoginShellProps {
  children: React.ReactNode;
}

export default function LoginShell({ children }: LoginShellProps) {
  return (
    <div className="login-shell">
      {children}
    </div>
  );
}
