"use client";

import { useEffect, useState } from "react";
import { Books, type Book } from "../../../lib/services";
import styles from "../styles/BookTable.module.css";

export default function BookTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "archived">("all");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const fetchedBooks = await Books.getAll();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error cargando libros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setLoading(true);
      const results = await Books.search(term);
      setBooks(results);
      setLoading(false);
    } else {
      loadBooks();
    }
  };

  const handleEdit = (bookId: string) => {
    console.log("Editar libro:", bookId);
  };

  const handleDelete = async (bookId: string) => {
    if (confirm("¿Estás seguro de eliminar este libro?")) {
      const success = await Books.delete(bookId);
      if (success) {
        setBooks(books.filter((book) => book.id !== bookId));
        alert("Libro eliminado correctamente");
      } else {
        alert("Error al eliminar libro");
      }
    }
  };

  const handleChangeStatus = async (book: Book, newStatus: Book["status"]) => {
    const success = await Books.update(book.id, { status: newStatus });
    if (success) {
      setBooks(
        books.map((b) =>
          b.id === book.id ? { ...b, status: newStatus } : b
        )
      );
    }
  };

  const filteredBooks = books.filter((book) => {
    return filterStatus === "all" || book.status === filterStatus;
  });

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
        <div className={styles.headerActions}>
          <input
            type="search"
            placeholder="Buscar por título o autor..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            className={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">Todos los estados</option>
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
            <option value="archived">Archivado</option>
          </select>
          <button className={styles.addBtn}>+ Nuevo Libro</button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Cargando libros...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📚</span>
            <p>No se encontraron libros</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Libro</th>
                <th>Autor</th>
                <th>Estado</th>
                <th>Fecha Publicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div className={styles.bookCell}>
                      <div className={styles.cover}>
                        {book.cover ? (
                          <img src={book.cover} alt={book.title} />
                        ) : (
                          book.title.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className={styles.bookInfo}>
                        <span className={styles.bookTitle}>{book.title}</span>
                        {book.description && (
                          <span className={styles.bookDescription}>
                            {book.description.substring(0, 50)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <select
                      className={`${styles.statusSelect} ${
                        book.status === "published"
                          ? styles.statusPublished
                          : book.status === "draft"
                          ? styles.statusDraft
                          : styles.statusArchived
                      }`}
                      value={book.status}
                      onChange={(e) =>
                        handleChangeStatus(book, e.target.value as Book["status"])
                      }
                    >
                      <option value="published">Publicado</option>
                      <option value="draft">Borrador</option>
                      <option value="archarchived">Archivado</option>
                    </select>
                  </td>
                  <td>
                    {book.publishedDate
  ? new Date(
      typeof (book.publishedDate as any)?.toDate === "function"
        ? (book.publishedDate as any).toDate()
        : book.publishedDate
    ).toLocaleDateString("es-ES", {
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
                        onClick={() => handleEdit(book.id)}
                        title="Editar libro"
                      >
                        ✏️
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(book.id)}
                        title="Eliminar libro"
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
          Total: {filteredBooks.length} libro{filteredBooks.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
