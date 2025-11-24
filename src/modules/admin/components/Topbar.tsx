"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/Topbar.module.css";

export default function Topbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.push("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.topbar}>
      {/* Logo/Brand */}
      <div className={styles.brand}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>CL</span>
          <span className={styles.logoText}>ComunidadLectora</span>
        </div>
        <span className={styles.adminBadge}>Admin</span>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Buscar usuarios, libros..."
          className={styles.searchInput}
        />
      </div>

      {/* User Section */}
      <div className={styles.userSection}>
        <button className={styles.notificationBtn} aria-label="Notificaciones">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={styles.notificationDot}></span>
        </button>

        <div className={styles.divider}></div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>Admin Principal</span>
          <span className={styles.userRole}>Administrador</span>
        </div>

        <div className={styles.avatar}>
          <span>AP</span>
        </div>

        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.menuItem} onClick={() => router.push("/perfil_usuario")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Mi Perfil
          </button>
          <button className={styles.menuItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6" />
              <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24" />
              <path d="M1 12h6m6 0h6" />
              <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24" />
            </svg>
            Configuración
          </button>
          <div className={styles.menuDivider}></div>
          <button className={styles.menuItem} onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
}