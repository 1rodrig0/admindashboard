import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Error404: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F8F0] to-white flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold text-[#165C1E] animate-bounce">
          404
        </h1>
        <p className="text-2xl font-semibold text-[#187A25]">
          Página no encontrada
        </p>
        <p className="text-[#3F875F] text-lg">
          La página que buscas se ha perdido entre las páginas de un libro...
        </p>

        {/* Bookshelf Scene with Enhanced Animations */}
        <div className="relative h-48 w-full bg-[#E8F5E8] rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-end h-full p-4 space-x-1 animate-bookshelf-load">
            {/* Books with individual animations */}
            <div className="w-8 h-20 bg-[#4CD23D] rounded-l-lg flex items-end justify-center p-1 book-animate book-1">
              <span className="text-xs text-white font-bold">HIST</span>
            </div>
            <div className="w-8 h-24 bg-[#187A25] flex items-end justify-center p-1 book-animate book-2">
              <span className="text-xs text-white font-bold">AVEN</span>
            </div>
            <div className="w-8 h-16 bg-[#165C1E] rounded-r-lg flex items-end justify-center p-1 book-animate book-3">
              <span className="text-xs text-white font-bold">TURA</span>
            </div>
            {/* Shelf */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2C8E2C] rounded-b-lg shelf-animate"></div>
            {/* Dust particles for effect */}
            <div className="absolute top-2 left-1/4 w-1 h-1 bg-[#3F875F]/50 rounded-full dust-1"></div>
            <div className="absolute top-4 right-1/4 w-1 h-1 bg-[#3F875F]/30 rounded-full dust-2"></div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#187A25] hover:bg-[#4CD23D] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>

      <style jsx>{`
        @keyframes bookshelf-load {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes book-fall-1 {
          0% {
            transform: translateY(-100px) rotate(-5deg);
            opacity: 0;
          }
          70% {
            transform: translateY(5px) rotate(2deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes book-fall-2 {
          0% {
            transform: translateY(-120px) rotate(3deg);
            opacity: 0;
          }
          70% {
            transform: translateY(3px) rotate(-1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes book-fall-3 {
          0% {
            transform: translateY(-80px) rotate(-2deg);
            opacity: 0;
          }
          70% {
            transform: translateY(2px) rotate(1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes shelf-slide {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }
        @keyframes dust-float {
          0% {
            transform: translateY(0) opacity: 1;
          }
          100% {
            transform: translateY(-10px) opacity: 0;
          }
        }
        .animate-bookshelf-load {
          animation: bookshelf-load 1.2s ease-out;
        }
        .book-animate.book-1 {
          animation: book-fall-1 1s ease-out 0.3s both;
        }
        .book-animate.book-2 {
          animation: book-fall-2 1s ease-out 0.5s both;
        }
        .book-animate.book-3 {
          animation: book-fall-3 1s ease-out 0.7s both;
        }
        .shelf-animate {
          animation: shelf-slide 0.8s ease-out 0.9s both;
        }
        .dust-1 {
          animation: dust-float 2s ease-out infinite 1.2s;
        }
        .dust-2 {
          animation: dust-float 2s ease-out infinite 1.4s reverse;
        }
        /* Continuous subtle wobble for books after load */
        @keyframes book-wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(0.5deg); }
          75% { transform: rotate(-0.5deg); }
        }
        .book-animate {
          animation: book-wobble 3s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default Error404;
