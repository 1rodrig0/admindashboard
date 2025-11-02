import React from 'react';
import HeroSection from './components/HeroSection';
import BookGallerySection from './components/BookGallerySection';
import BookShelvesSection from './components/BookShelvesSection';
import ComentSection from './components/comentSection';

const Landing: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BookGallerySection />
      <BookShelvesSection />
      <ComentSection />
    </>
  );
};

export default Landing;
