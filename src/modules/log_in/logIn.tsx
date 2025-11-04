'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, googleProvider, setAuthPersistence } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './styles/login.css';

type Status = 'idle' | 'loading' | 'error';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectParam = params.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  // -------- THEME (opcional) --------
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') ||
      (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  // -----------------------------------

  const canSubmit =
    EMAIL_REGEX.test(email) && password.length >= 6 && status !== 'loading';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('loading');
    setError(null);
    try {
      await setAuthPersistence(remember); // local/session según "remember"
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace(redirectParam); // vuelve a la ruta solicitada
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? 'auth/error';
      setError(mapFirebaseError(code));
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  }

  async function onGoogle() {
    if (status === 'loading') return;
    setStatus('loading');
    setError(null);
    try {
      await setAuthPersistence(remember);
      await signInWithPopup(auth, googleProvider);
      router.replace(redirectParam);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? 'auth/error';
      setError(mapFirebaseError(code));
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="blob" />

        <div className="theme-switch">
          <button onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>

        <header className="login-header">
          <h1 className="login-title">Bienvenid@ a KOLLA</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>
        </header>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="email" className="label">
              Correo
            </label>
            <input
              id="email"
              className="input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@emi.edu.bo"
              aria-invalid={status === 'error' && !EMAIL_REGEX.test(email)}
              required
            />
          </div>

          <div className="field password-wrap">
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              className="input"
              type={showPass ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowPass((s) => !s)}
            >
              {showPass ? 'Ocultar' : 'Ver'}
            </button>
          </div>

          <div className="row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Recordarme
            </label>
            <a
              href="/reset"
              style={{
                fontSize: 13,
                color: 'var(--primary)',
                textDecoration: 'none',
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!canSubmit}
          >
            {status === 'loading' ? 'Entrando…' : 'Entrar'}
          </button>

          <div className="divider">o</div>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={onGoogle}
            disabled={status === 'loading'}
          >
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  );
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Credenciales incorrectas.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde.';
    case 'auth/popup-closed-by-user':
      return 'Se cerró el popup de Google.';
    case 'auth/network-request-failed':
      return 'Problema de red. Verifica tu conexión.';
    default:
      return 'No se pudo iniciar sesión. Intenta nuevamente.';
  }
}
