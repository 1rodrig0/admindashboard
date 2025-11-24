"use client";

import { useEffect, useState } from "react";
import styles from "../styles/BookTable.module.css";

interface Book {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft" | "archived";
  cover?: string;
  publishedDate?: string;
}

export default function BookTable() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Datos de ejemplo
    setBooks([
      {
        id: "1",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        status: "published",
        publishedDate: "2024-01-15",
      },
      {
        id: "2",
        title: "El amor en los tiempos del cólera",
        author: "Gabriel García Márquez",
        status: "published",
        publishedDate: "2024-02-20",
      },
      {
        id: "3",
        title: "1984",
        author: "George Orwell",
        status: "draft",
      },
      {
        id: "4",
        title: "Rayuela",
        author: "Julio Cortázar",
        status: "published",
        publishedDate: "2024-03-10",
      },
      {
        id: "5",
        title: "La sombra del viento",
        author: "Carlos Ruiz Zafón",
        status: "archived",
      },
    ]);
  }, []);

  const handleEdit = (bookId: string) => {
    console.log("Editar libro:", bookId);
  };

  const handleDelete = (bookId: string) => {
    if (confirm("¿Estás seguro de eliminar este libro?")) {
      setBooks(books.filter((book) => book.id !== bookId));
    }
  };

  const getStatusLabel = (status: Book["status"]) => {
    switch (status) {
      case "published":
        return "Publicado";
      case "draft":
        return "Borrador";
      case "archived":
        return "Archivado";
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Lista de Libros</h2>
        <button className={styles.addBtn}>+ Nuevo Libro</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Libro</th>
              <th>Autor</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <div className={styles.bookCell}>
                    <div className={styles.cover}>
                      {book.title.charAt(0).toUpperCase()}
                    </div>
                    <span>{book.title}</span>
                  </div>
                </td>
                <td>{book.author}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      book.status === "published"
                        ? styles.statusPublished
                        : book.status === "draft"
                        ? styles.statusDraft
                        : styles.statusArchived
                    }`}
                  >
                    {getStatusLabel(book.status)}
                  </span>
                </td>
                <td>
                  {book.publishedDate
                    ? new Date(book.publishedDate).toLocaleDateString("es-ES")
                    : "-"}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(book.id)}
                    >
                      ✏️
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(book.id)}
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
