"use client";

import { useEffect, useState } from "react";
import styles from "../styles/UserTable.module.css";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Aquí conectarías con tu API/BD
    // Datos de ejemplo:
    setUsers([
      {
        id: "1",
        name: "María González",
        email: "maria@example.com",
        role: "Usuario",
        status: "active",
      },
      {
        id: "2",
        name: "Carlos Rodríguez",
        email: "carlos@example.com",
        role: "Moderador",
        status: "active",
      },
      {
        id: "3",
        name: "Ana Martínez",
        email: "ana@example.com",
        role: "Usuario",
        status: "inactive",
      },
      {
        id: "4",
        name: "Luis Fernández",
        email: "luis@example.com",
        role: "Usuario",
        status: "active",
      },
      {
        id: "5",
        name: "Sofia López",
        email: "sofia@example.com",
        role: "Moderador",
        status: "active",
      },
    ]);
  }, []);

  const handleEdit = (userId: string) => {
    console.log("Editar usuario:", userId);
    // Aquí iría la lógica de edición
  };

  const handleDelete = (userId: string) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      console.log("Eliminar usuario:", userId);
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Lista de Usuarios</h2>
        <button className={styles.addBtn}>+ Nuevo Usuario</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      user.role === "Moderador"
                        ? styles.badgeModerator
                        : styles.badgeUser
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      user.status === "active"
                        ? styles.statusActive
                        : styles.statusInactive
                    }`}
                  >
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(user.id)}
                    >
                      ✏️
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}