'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Plus } from 'lucide-react';
import { createOptions } from './data';

const CreateMenu: React.FC = () => {
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
        Crear una historia nueva
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-[#165C1E] shadow-lg z-50 rounded-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-[#187A25]">Opciones de Creación</h3>
          </div>
          <div className="p-4 space-y-1">
            {createOptions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block py-2 px-3 text-[#187A25] hover:bg-[#4CD23D]/10 hover:text-[#4CD23D] rounded transition-colors text-sm font-medium text-left"
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

export default CreateMenu;
