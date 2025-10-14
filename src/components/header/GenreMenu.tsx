'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const genres = [
  { title: 'Romance', href: '/genres/romance' },
  { title: 'Fantasía', href: '/genres/fantasia' },
  { title: 'Literatura Boliviana', href: '/genres/literatura-boliviana' },
  { title: 'Novela Juvenil', href: '/genres/novela-juvenil' },
  { title: 'Ciencia Ficción', href: '/genres/ciencia-ficcion' },
  { title: 'Terror', href: '/genres/terror' },
  { title: 'Poesía', href: '/genres/poesia' },
  { title: 'Clásicos', href: '/genres/clasicos' },
];

const GenreMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="text-[#187A25] hover:text-[#4CD23D] bg-transparent px-3 py-2 rounded-md transition-colors flex items-center gap-1"
      >
        Explora
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-0 w-[550px] bg-white border border-[#165C1E] shadow-lg z-50 rounded-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-[#187A25]">Explora por Género</h3>
          </div>
          <div className="p-4 grid grid-cols-3 gap-4 min-h-[200px]">
            {genres.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block py-3 px-2 text-[#187A25] hover:bg-[#4CD23D]/10 hover:text-[#4CD23D] rounded transition-colors text-sm font-medium text-center leading-relaxed break-words max-w-full"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreMenu;
