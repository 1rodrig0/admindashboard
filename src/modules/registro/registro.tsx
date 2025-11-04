import React from 'react'
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

function registro() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Contenido del registro aquí */}
      </main>
      <Footer />
    </div>
  )
}

export default registro
