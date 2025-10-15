import React from 'react';
import HeroSection from './components/HeroSection';
import BookGallerySection from './components/BookGallerySection';

const Landing: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BookGallerySection />
    </>
  );
};

export default Landing;
