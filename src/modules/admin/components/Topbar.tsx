"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  globalSearch as searchAllData,
  Notifications as NotificationsService,
  type User,
  type Book,
  type Notification,
} from "@/lib/services";
import Notifications from "./Notifications";
import styles from "../styles/Topbar.module.css";
function getDisplayName(res: any): string {
  if ("name" in res && res.name) return res.name;
  if ("title" in res && res.title) return res.title;
  if ("message" in res && res.message) return res.message;
  return "N";
}

function getAvatar(res: any): string | undefined {
  if ("avatar" in res && res.avatar) return res.avatar;
  return undefined;
}


export default function Topbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<(User | Book | Notification)[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // ID del usuario admin (obtenlo de tu auth)
  const adminId = "admin-id-placeholder"; // Reemplazar con el ID real

  useEffect(() => {
    const fetchUnread = async () => {
      const count = await NotificationsService.getUnreadCount(adminId);
      setUnreadCount(count);
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [adminId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchAllData(value);
      // Unir resultados en un array plano
      const combinedResults = [
        ...results.users,
        ...results.books,
        ...results.notifications,
      ];
      setSearchResults(combinedResults);
      setSearchOpen(combinedResults.length > 0);
    }, 300);
  };

  const handleSearchResultClick = (result: User | Book | Notification) => {
    if ("email" in result) {
      router.push(`/admin?view=users&id=${result.id}`);
    } else if ("author" in result) {
      router.push(`/admin?view=books&id=${result.id}`);
    } else if ("type" in result) {
      router.push(`/admin?view=notifications&id=${result.id}`);
    }
    setSearchOpen(false);
    setSearchTerm("");
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.push("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setMenuOpen(false);
  };

  return (
    <header className={styles.topbar}>
      {/* Logo */}
      <div className={styles.brand}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>CL</span>
          <span className={styles.logoText}>ComunidadLectora</span>
        </div>
        <span className={styles.adminBadge}>Admin</span>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer} ref={searchRef}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Buscar usuarios, libros..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchOpen && (
          <div className={styles.searchResults}>
            {searchResults.map((res) => (
              <button
                key={res.id}
                className={styles.searchResultItem}
                onClick={() => handleSearchResultClick(res)}
              >
                <div className={styles.resultAvatar}>
                  {getAvatar(res) ? (
  <img src={getAvatar(res)} alt={getDisplayName(res)} />
) : (
  <span>{getDisplayName(res).charAt(0).toUpperCase()}</span>
)}

                </div>
                <div className={styles.resultInfo}>
                  <span className={styles.resultTitle}>
                    {getDisplayName(res)}
                  </span>
                  <span className={styles.resultSubtitle}>
                    {"email" in res ? res.email : "author" in res ? res.author : ""}
                  </span>
                </div>
                <span className={styles.resultType}>
                  {"email" in res ? "👤" : "author" in res ? "📚" : "🔔"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Section */}
      <div className={styles.userSection}>
        <button className={styles.notificationBtn} aria-label="Notificaciones" onClick={toggleNotifications}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <>
              <span className={styles.notificationDot}></span>
              <span className={styles.notificationCount}>{unreadCount}</span>
            </>
          )}
        </button>

        <div className={styles.divider}></div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>Admin Principal</span>
          <span className={styles.userRole}>Administrador</span>
        </div>

        <div className={styles.avatar}>
          <span>AP</span>
        </div>

        <button className={styles.menuToggle} onClick={toggleMenu} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.menuItem} onClick={() => router.push("/perfil_usuario")}>
            Mi Perfil
          </button>
          <button className={styles.menuItem}>Configuración</button>
          <div className={styles.menuDivider}></div>
          <button className={styles.menuItem} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Notifications Panel */}
      {notificationsOpen && (
        <Notifications userId={adminId} onClose={() => setNotificationsOpen(false)} />
      )}
    </header>
  );
}
