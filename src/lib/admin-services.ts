import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config"; // Tu archivo existente

// ==================== TIPOS ====================

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  status: "published" | "draft" | "archived";
  cover?: string;
  publishedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  userId: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  newUsersToday: number;
  booksThisWeek: number;
  activeUsers: number;
}

// ==================== BÚSQUEDA DE USUARIOS ====================

export async function searchUsers(searchTerm: string): Promise<User[]> {
  if (!searchTerm.trim()) {
    return getAllUsers();
  }

  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const users = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }))
      .filter((user: any) => {
        const term = searchTerm.toLowerCase();
        return (
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
        );
      }) as User[];

    return users;
  } catch (error) {
    console.error("Error buscando usuarios:", error);
    return [];
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as User[];
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return [];
  }
}

export async function updateUser(
  userId: string,
  data: Partial<User>
): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return false;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    return true;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return false;
  }
}

// ==================== BÚSQUEDA DE LIBROS ====================

export async function searchBooks(searchTerm: string): Promise<Book[]> {
  if (!searchTerm.trim()) {
    return getAllBooks();
  }

  try {
    const booksRef = collection(db, "books");
    const snapshot = await getDocs(booksRef);

    const books = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        publishedDate: doc.data().publishedDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }))
      .filter((book: any) => {
        const term = searchTerm.toLowerCase();
        return (
          book.title?.toLowerCase().includes(term) ||
          book.author?.toLowerCase().includes(term)
        );
      }) as Book[];

    return books;
  } catch (error) {
    console.error("Error buscando libros:", error);
    return [];
  }
}

export async function getAllBooks(): Promise<Book[]> {
  try {
    const booksRef = collection(db, "books");
    const q = query(booksRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      publishedDate: doc.data().publishedDate?.toDate(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Book[];
  } catch (error) {
    console.error("Error obteniendo libros:", error);
    return [];
  }
}

export async function updateBook(
  bookId: string,
  data: Partial<Book>
): Promise<boolean> {
  try {
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error actualizando libro:", error);
    return false;
  }
}

export async function deleteBook(bookId: string): Promise<boolean> {
  try {
    const bookRef = doc(db, "books", bookId);
    await deleteDoc(bookRef);
    return true;
  } catch (error) {
    console.error("Error eliminando libro:", error);
    return false;
  }
}

// ==================== NOTIFICACIONES ====================

export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Notification[];
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    return [];
  }
}

export async function getUnreadNotificationsCount(
  userId: string
): Promise<number> {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      where("read", "==", false)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error("Error contando notificaciones:", error);
    return 0;
  }
}

export async function markNotificationAsRead(
  notificationId: string
): Promise<boolean> {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, { read: true });
    return true;
  } catch (error) {
    console.error("Error marcando notificación:", error);
    return false;
  }
}

export async function markAllNotificationsAsRead(
  userId: string
): Promise<boolean> {
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      where("read", "==", false)
    );
    const snapshot = await getDocs(q);

    const updatePromises = snapshot.docs.map((docSnap) =>
      updateDoc(docSnap.ref, { read: true })
    );
    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error("Error marcando todas las notificaciones:", error);
    return false;
  }
}

// Listener en tiempo real para notificaciones
export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
) {
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(20)
  );

  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Notification[];
    callback(notifications);
  });
}

// ==================== ESTADÍSTICAS DEL DASHBOARD ====================

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const usersRef = collection(db, "users");
    const booksRef = collection(db, "books");

    // Total usuarios
    const usersSnapshot = await getDocs(usersRef);
    const totalUsers = usersSnapshot.size;

    // Total libros
    const booksSnapshot = await getDocs(booksRef);
    const totalBooks = booksSnapshot.size;

    // Usuarios nuevos hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const newUsersQuery = query(
      usersRef,
      where("createdAt", ">=", todayTimestamp)
    );
    const newUsersSnapshot = await getDocs(newUsersQuery);
    const newUsersToday = newUsersSnapshot.size;

    // Libros esta semana
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekTimestamp = Timestamp.fromDate(oneWeekAgo);

    const weekBooksQuery = query(
      booksRef,
      where("createdAt", ">=", weekTimestamp)
    );
    const weekBooksSnapshot = await getDocs(weekBooksQuery);
    const booksThisWeek = weekBooksSnapshot.size;

    // Usuarios activos
    const activeUsersQuery = query(usersRef, where("status", "==", "active"));
    const activeUsersSnapshot = await getDocs(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.size;

    return {
      totalUsers,
      totalBooks,
      newUsersToday,
      booksThisWeek,
      activeUsers,
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return {
      totalUsers: 0,
      totalBooks: 0,
      newUsersToday: 0,
      booksThisWeek: 0,
      activeUsers: 0,
    };
  }
}

// ==================== BÚSQUEDA GLOBAL (usuarios y libros) ====================

export interface SearchResult {
  type: "user" | "book";
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
}

export async function globalSearch(
  searchTerm: string
): Promise<SearchResult[]> {
  if (!searchTerm.trim()) return [];

  try {
    const [users, books] = await Promise.all([
      searchUsers(searchTerm),
      searchBooks(searchTerm),
    ]);

    const userResults: SearchResult[] = users.slice(0, 5).map((user) => ({
      type: "user",
      id: user.id,
      title: user.name,
      subtitle: user.email,
      avatar: user.avatar,
    }));

    const bookResults: SearchResult[] = books.slice(0, 5).map((book) => ({
      type: "book",
      id: book.id,
      title: book.title,
      subtitle: book.author,
      avatar: book.cover,
    }));

    return [...userResults, ...bookResults];
  } catch (error) {
    console.error("Error en búsqueda global:", error);
    return [];
  }
}