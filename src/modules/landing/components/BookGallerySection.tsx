import React from 'react';
import DomeGallery from '../../../components/DomeGallery.jsx';
import '@/modules/landing/styles/BookGallerySection.css'; // Import custom styles

import libro from '../assets/libro-de-educacion.png';
import LIBRO1 from '../assets/LIBRO1.jpeg';
import LIBRO2 from '../assets/LIBRO2.jpg';

const BookGallerySection: React.FC = () => {
  const bookImages = [
    { src: libro.src, alt: 'Libro de educación' },
    { src: LIBRO1.src, alt: 'Libro 1' },
    { src: LIBRO2.src, alt: 'Libro 2' },
    { src: libro.src, alt: 'Libro de educación' },
    { src: LIBRO1.src, alt: 'Libro 1' },
    { src: LIBRO2.src, alt: 'Libro 2' },
    { src: libro.src, alt: 'Libro de educación' }
  ];

  return (
    <section className="book-gallery-section">
      <div className="book-gallery-container">
        <h2 className="book-gallery-title">Galería de Libros</h2>
        <div style={{ filter: 'sepia(0.4) hue-rotate(90deg) saturate(1.3) brightness(1.1)' }}>
          <DomeGallery
            images={bookImages}
            grayscale={false}
            imageBorderRadius="20px"
            openedImageBorderRadius="30px"
            overlayBlurColor="#F0F8F0"
          />
        </div>
      </div>
    </section>
  );
};

export default BookGallerySection;
