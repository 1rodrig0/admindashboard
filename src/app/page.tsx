"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Landing from "@/modules/landing/landing";
import { useAuth } from "@/context/AuthContext";
import Biblioteca from "@/modules/biblioteca/biblioteca";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Biblioteca />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
