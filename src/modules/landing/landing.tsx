import React from 'react';
import HeroSection from './components/HeroSection';
import BookGallerySection from './components/BookGallerySection';
import BookShelvesSection from './components/BookShelvesSection';

const Landing: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BookGallerySection />
      <BookShelvesSection />
    </>
  );
};

export default Landing;
