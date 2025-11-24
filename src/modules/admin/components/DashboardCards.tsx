"use client";

import { useEffect, useState } from "react";
import styles from "../styles/DashboardCards.module.css";

interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  newUsersToday: number;
  booksThisWeek: number;
}

export default function DashboardCards() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBooks: 0,
    newUsersToday: 0,
    booksThisWeek: 0,
  });

  useEffect(() => {
    // Aquí conectarías con tu API/BD
    // Por ahora, datos de ejemplo:
    setStats({
      totalUsers: 1248,
      totalBooks: 3567,
      newUsersToday: 23,
      booksThisWeek: 45,
    });
  }, []);

  const cards = [
    {
      title: "Total Usuarios",
      value: stats.totalUsers,
      icon: "👥",
      color: "#3498db",
      trend: "+12%",
    },
    {
      title: "Total Libros",
      value: stats.totalBooks,
      icon: "📚",
      color: "#2ecc71",
      trend: "+8%",
    },
    {
      title: "Usuarios Nuevos Hoy",
      value: stats.newUsersToday,
      icon: "✨",
      color: "#9b59b6",
      trend: "+5",
    },
    {
      title: "Libros Esta Semana",
      value: stats.booksThisWeek,
      icon: "📖",
      color: "#e67e22",
      trend: "+18",
    },
  ];

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
            <span className={styles.cardTrend}>{card.trend}</span>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardValue}>{card.value.toLocaleString()}</h3>
            <p className={styles.cardTitle}>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}