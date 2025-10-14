'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Plus } from 'lucide-react';
import { createOptions } from '../data';
import styles from '../styles/header.module.css';

const CreateMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={`${styles.menuButton} ${styles.menuText}`}>
        Crear una historia nueva
        <ChevronDown className={`${styles.chevronIcon} ${isOpen ? styles.chevronIconOpen : ''}`} />
      </button>
      {isOpen && (
        <div className={styles.createDropdownContainer}>
          <div className={styles.dropdownHeader}>
            <h3 className={styles.dropdownTitle}>Opciones de Creación</h3>
          </div>
          <div className={styles.createDropdownList}>
            {createOptions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={styles.createDropdownLink}
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
