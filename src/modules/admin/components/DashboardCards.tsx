"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/lib/services"; // asegurarse que apunte a services.ts
import styles from "../styles/DashboardCards.module.css";

export default function DashboardCards() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBooks: 0,
    newUsersToday: 0,
    booksThisWeek: 0,
    activeUsers: 0,
    unreadNotifications: 0, // agregado para coincidir con services.ts
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();

    // Actualizar estadísticas cada 30 segundos
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const fetchedStats = await getDashboardStats();
      setStats(fetchedStats);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Usuarios",
      value: stats.totalUsers,
      icon: "👥",
      color: "#27ae60",
      trend: `${stats.activeUsers} activos`,
      trendPositive: true,
    },
    {
      title: "Total Libros",
      value: stats.totalBooks,
      icon: "📚",
      color: "#2ecc71",
      trend: `+${stats.booksThisWeek} esta semana`,
      trendPositive: true,
    },
    {
      title: "Usuarios Nuevos Hoy",
      value: stats.newUsersToday,
      icon: "✨",
      color: "#58d68d",
      trend: stats.newUsersToday > 0 ? "↑ Creciendo" : "Sin cambios",
      trendPositive: stats.newUsersToday > 0,
    },
    {
      title: "Libros Esta Semana",
      value: stats.booksThisWeek,
      icon: "📖",
      color: "#1e8449",
      trend: stats.booksThisWeek > 0 ? "↑ Activo" : "Sin actividad",
      trendPositive: stats.booksThisWeek > 0,
    },
    {
      title: "Notificaciones sin leer",
      value: stats.unreadNotifications,
      icon: "🔔",
      color: "#f39c12",
      trend: stats.unreadNotifications > 0 ? "Pendientes" : "Sin pendientes",
      trendPositive: stats.unreadNotifications > 0,
    },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className={styles.cardsGrid}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ borderTopColor: card.color }}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>{card.icon}</span>
            <span
              className={`${styles.cardTrend} ${
                card.trendPositive ? styles.trendPositive : styles.trendNeutral
              }`}
            >
              {card.trend}
            </span>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardValue}>
              {card.value.toLocaleString()}
            </h3>
            <p className={styles.cardTitle}>{card.title}</p>
          </div>
          <div className={styles.cardFooter}>
            <button
              className={styles.detailsBtn}
              onClick={() => console.log(`Ver detalles de ${card.title}`)}
            >
              Ver detalles →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
