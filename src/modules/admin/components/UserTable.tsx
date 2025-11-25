"use client";

import { useEffect, useState } from "react";
import { Users, type User } from "@/lib/services";
import styles from "../styles/UserTable.module.css";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "moderator" | "user">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "suspended">("all");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await Users.getAll();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setLoading(true);
      const results = await Users.search(term);
      setUsers(results);
      setLoading(false);
    } else {
      loadUsers();
    }
  };

  const handleEdit = (userId: string) => {
    console.log("Editar usuario:", userId);
    // Aquí implementarías un modal o navegación a formulario de edición
  };

  const handleDelete = async (userId: string) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      const success = await Users.delete(userId);
      if (success) {
        setUsers(users.filter((user) => user.id !== userId));
        alert("Usuario eliminado correctamente");
      } else {
        alert("Error al eliminar usuario");
      }
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    const success = await Users.update(user.id, { status: newStatus });
    if (success) {
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, status: newStatus } : u
        )
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  const getRoleLabel = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "moderator":
        return "Moderador";
      case "user":
        return "Usuario";
    }
  };

  const getStatusLabel = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "Activo";
      case "inactive":
        return "Inactivo";
      case "suspended":
        return "Suspendido";
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Lista de Usuarios</h2>
        <div className={styles.headerActions}>
          <input
            type="search"
            placeholder="Buscar por nombre o email..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            className={styles.filterSelect}
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="moderator">Moderador</option>
            <option value="user">Usuario</option>
          </select>
          <select
            className={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="suspended">Suspendido</option>
          </select>
          <button className={styles.addBtn}>+ Nuevo Usuario</button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Cargando usuarios...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>👥</span>
            <p>No se encontraron usuarios</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} />
                        ) : (
                          user.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        user.role === "admin"
                          ? styles.badgeAdmin
                          : user.role === "moderator"
                          ? styles.badgeModerator
                          : styles.badgeUser
                      }`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles.status} ${
                        user.status === "active"
                          ? styles.statusActive
                          : user.status === "inactive"
                          ? styles.statusInactive
                          : styles.statusSuspended
                      }`}
                      onClick={() => handleToggleStatus(user)}
                      title="Click para cambiar estado"
                    >
                      {getStatusLabel(user.status)}
                    </button>
                  </td>
                  <td>
                    {user.createdAt
  ? user.createdAt.toDate().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  : "-"}

                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(user.id)}
                        title="Editar usuario"
                      >
                        ✏️
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(user.id)}
                        title="Eliminar usuario"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.tableFooter}>
        <span className={styles.totalCount}>
          Total: {filteredUsers.length} usuario{filteredUsers.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
