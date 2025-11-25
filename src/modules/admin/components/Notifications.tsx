"use client";

import { useEffect, useState } from "react";
import {
  Notifications as NotificationService,
  type Notification,
} from "@/lib/services";
import { Timestamp } from "firebase/firestore";
import styles from "../styles/Notifications.module.css";

interface NotificationsProps {
  userId: string;
  onClose: () => void;
}

export default function Notifications({ userId, onClose }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribirse a notificaciones en tiempo real
    const unsubscribe = NotificationService.subscribe(userId, (newNotifications) => {
      // Guardamos Timestamps directamente en el estado, sin convertir a Date
      setNotifications(newNotifications);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleMarkAsRead = async (notificationId: string) => {
    await NotificationService.markAsRead(notificationId);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true, readAt: Timestamp.now() } : n
      )
    );
  };

  const handleMarkAllAsRead = async () => {
    await NotificationService.markAllAsRead(userId);
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true, readAt: Timestamp.now() }))
    );
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getTimeAgo = (timestamp: Timestamp) => {
    const date = timestamp.toDate(); // Convertimos solo al mostrar
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Hace unos segundos";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `Hace ${days} d`;
  };

  return (
    <div className={styles.notificationsPanel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notificaciones</h3>
        <div className={styles.headerActions}>
          {notifications.length > 0 && (
            <button className={styles.markAllBtn} onClick={handleMarkAllAsRead}>
              Marcar todas
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      <div className={styles.notificationsList}>
        {loading ? (
          <div className={styles.loading}>Cargando...</div>
        ) : notifications.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔔</span>
            <p>No tienes notificaciones</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${
                !notification.read ? styles.unread : ""
              }`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <span className={styles.typeIcon}>{getIcon(notification.type)}</span>
              <div className={styles.content}>
                <h4 className={styles.notificationTitle}>{notification.title}</h4>
                <p className={styles.notificationMessage}>{notification.message}</p>
                <span className={styles.time}>{getTimeAgo(notification.createdAt)}</span>
              </div>
              {!notification.read && <span className={styles.unreadDot}></span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
