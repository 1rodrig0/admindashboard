"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardCards from "./components/DashboardCards";
import UserTable from "./components/UserTable";
import BookTable from "./components/BookTable";
import styles from "./styles/admin.module.css";

type AdminView = "dashboard" | "users" | "books" | "settings";

export default function AdminPanel() {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            <h1 className={styles.title}>Dashboard</h1>
            <DashboardCards />
          </>
        );
      case "users":
        return (
          <>
            <h1 className={styles.title}>Gestión de Usuarios</h1>
            <UserTable />
          </>
        );
      case "books":
        return (
          <>
            <h1 className={styles.title}>Gestión de Libros</h1>
            <BookTable />
          </>
        );
      case "settings":
        return (
          <>
            <h1 className={styles.title}>Configuración</h1>
            <div className={styles.settingsPlaceholder}>
              <p>Panel de configuración en desarrollo...</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.adminContainer}>
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <div className={styles.mainContent}>
          <Topbar />
          <div className={styles.contentArea}>{renderView()}</div>
        </div>
      </div>
    </div>
  );
}