
// src/modules/registro/registro.tsx
"use client";

import React, { useState } from "react";
import RegisterHeader from "./components/RegisterHeader";
import RegisterForm from "./components/RegisterForm";
import styles from "./styles/registro.module.css";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';


  return (
    <main className={styles.container} aria-busy={loading || oauthLoading}>
      <Header />
      {/* Decoración animada */}
      <div className={styles.bgGlow} aria-hidden />
      <div className={styles.bgOrbs} aria-hidden>
        <span />
        <span />
        <span />
        <Footer />
      </div>
  )
}
      <section className={styles.card} role="region" aria-label="Formulario de registro">
        <RegisterHeader />
        <RegisterForm loading={loading} oauthLoading={oauthLoading} setLoading={setLoading} setOauthLoading={setOauthLoading} />
      </section>
    </main>
  );
}
