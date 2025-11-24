"use client";

import { useState } from "react";
import styles from "../styles/sidebar.module.css";

interface SidebarProps {
  currentView: "dashboard" | "users" | "books" | "settings";
  onViewChange: (view: "dashboard" | "users" | "books" | "settings") => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "users",
      label: "Usuarios",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "books",
      label: "Libros",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Configuración",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6" />
          <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24" />
          <path d="M1 12h6m6 0h6" />
          <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24" />
        </svg>
      ),
    },
  ] as const;

  const quickActions = [
    {
      label: "Nuevo Usuario",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      ),
      action: () => console.log("Nuevo usuario"),
    },
    {
      label: "Agregar Libro",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      action: () => console.log("Nuevo libro"),
    },
  ];

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <span>CL</span>
          </div>
          {!isCollapsed && (
            <div className={styles.logoInfo}>
              <h2 className={styles.logoTitle}>ComunidadLectora</h2>
              <span className={styles.logoSubtitle}>Panel Admin</span>
            </div>
          )}
        </div>
        <button
          className={styles.collapseBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expandir sidebar" : "Contraer sidebar"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navSection}>
          {!isCollapsed && <span className={styles.navLabel}>Menú Principal</span>}
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${currentView === item.id ? styles.active : ""}`}
              onClick={() => onViewChange(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!isCollapsed && <span className={styles.navText}>{item.label}</span>}
              {currentView === item.id && <span className={styles.activeIndicator}></span>}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className={styles.quickActions}>
            <span className={styles.navLabel}>Acciones Rápidas</span>
            {quickActions.map((action, index) => (
              <button key={index} className={styles.quickActionBtn} onClick={action.action}>
                <span className={styles.quickActionIcon}>{action.icon}</span>
                <span className={styles.quickActionText}>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Stats Card */}
      {!isCollapsed && (
        <div className={styles.statsCard}>
          <div className={styles.statsHeader}>
            <h3 className={styles.statsTitle}>Actividad Hoy</h3>
            <span className={styles.statsIcon}>📊</span>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>23</span>
              <span className={styles.statLabel}>Usuarios</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>45</span>
              <span className={styles.statLabel}>Libros</span>
            </div>
          </div>
          <div className={styles.statsProgress}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "68%" }}></div>
            </div>
            <span className={styles.progressText}>68% del objetivo</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        {!isCollapsed ? (
          <>
            <div className={styles.versionInfo}>
              <span className={styles.versionLabel}>Versión</span>
              <span className={styles.versionNumber}>1.0.0</span>
            </div>
            <div className={styles.footerLinks}>
              <button className={styles.footerLink}>Ayuda</button>
              <span className={styles.footerDot}>•</span>
              <button className={styles.footerLink}>Soporte</button>
            </div>
          </>
        ) : (
          <div className={styles.collapsedFooter}>
            <span className={styles.versionDot}>v1</span>
          </div>
        )}
      </div>
    </aside>
  );
} 