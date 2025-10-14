import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '@/modules/landing/styles/animations.css'; // Import custom animations

const Landing: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F0F8F0] to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-[#165C1E] leading-tight fade-in-up">
            <span className="block">Ven por la historia.</span>
            <span className="block text-[#187A25] fade-in-up delay-1">Quédate por la conexión.</span>
          </h1>
          <p className="text-xl text-[#3F875F] max-w-3xl mx-auto leading-relaxed slide-in-left delay-2">
            Historias mayores que el streaming. Chat de grupos para conectar con lectores y autores bolivianos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center bounce-in delay-3">
            <Link
              href="/register"
              className="bg-[#187A25] hover:bg-[#4CD23D] text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors pulse-glow"
            >
              Únete ahora
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/explore"
              className="border-2 border-[#187A25] hover:bg-[#187A25] text-[#187A25] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors pulse-glow"
            >
              Explora historias
            </Link>
          </div>
        </div>
        {/* Placeholder for illustrations - replace with actual images/SVGs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto opacity-60">
          <div className="flex justify-center bounce-in delay-1">
            <div className="w-24 h-24 bg-[#4CD23D]/20 rounded-full flex items-center justify-center pulse-glow">
              <span className="text-[#187A25] font-semibold">📖</span>
            </div>
          </div>
          <div className="flex justify-center bounce-in delay-2">
            <div className="w-24 h-24 bg-[#4CD23D]/20 rounded-full flex items-center justify-center pulse-glow">
              <span className="text-[#187A25] font-semibold">💬</span>
            </div>
          </div>
          <div className="flex justify-center bounce-in delay-3">
            <div className="w-24 h-24 bg-[#4CD23D]/20 rounded-full flex items-center justify-center pulse-glow">
              <span className="text-[#187A25] font-semibold">👥</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
