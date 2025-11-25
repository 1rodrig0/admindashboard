import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  Timestamp,
  Query,
  DocumentData,
} from "firebase/firestore";

// ============ TYPE DEFINITIONS ============
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  status: "published" | "draft" | "archived";
  cover?: string;
  publishedDate?: string | Date | { seconds: number; nanoseconds: number; toDate(): Date };
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Timestamp;
  readAt?: Timestamp;
}

export interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  newUsersToday: number;
  booksThisWeek: number;
  activeUsers: number;
  unreadNotifications: number;
}

// ============ GENERIC CRUD HELPERS ============
interface CRUDConfig<T> {
  collectionName: string;
  searchFields?: (keyof T)[];
  timestamps?: boolean;
}

async function getAll<T extends { id: string }>(
  config: CRUDConfig<T>
): Promise<T[]> {
  try {
    const snapshot = await getDocs(collection(db, config.collectionName));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as T));
  } catch (error) {
    console.error(`Error fetching all from ${config.collectionName}:`, error);
    return [];
  }
}

async function getById<T extends { id: string }>(
  config: CRUDConfig<T>,
  id: string
): Promise<T | null> {
  try {
    const docSnap = await getDoc(doc(db, config.collectionName, id));
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${config.collectionName} by ID:`, error);
    return null;
  }
}

async function search<T extends { id: string }>(
  config: CRUDConfig<T>,
  searchTerm: string
): Promise<T[]> {
  try {
    if (!searchTerm.trim()) {
      return getAll(config);
    }

    if (!config.searchFields || config.searchFields.length === 0) {
      return getAll(config);
    }

    const results: T[] = [];
    const allItems = await getAll(config);

    for (const item of allItems) {
      const matches = config.searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
      if (matches) results.push(item);
    }

    return results;
  } catch (error) {
    console.error(`Error searching ${config.collectionName}:`, error);
    return [];
  }
}

async function update<T extends { id: string }>(
  config: CRUDConfig<T>,
  id: string,
  data: Partial<Omit<T, "id">>
): Promise<boolean> {
  try {
    const updateData: any = { ...data };
    if (config.timestamps) {
      updateData.updatedAt = Timestamp.now();
    }
    await updateDoc(doc(db, config.collectionName, id), updateData);
    return true;
  } catch (error) {
    console.error(`Error updating ${config.collectionName}:`, error);
    return false;
  }
}

async function deleteItem<T extends { id: string }>(
  config: CRUDConfig<T>,
  id: string
): Promise<boolean> {
  try {
    await deleteDoc(doc(db, config.collectionName, id));
    return true;
  } catch (error) {
    console.error(`Error deleting from ${config.collectionName}:`, error);
    return false;
  }
}

async function create<T extends { id: string }>(
  config: CRUDConfig<T>,
  data: Omit<T, "id">
): Promise<string | null> {
  try {
    const createData: any = { ...data };
    if (config.timestamps) {
      createData.createdAt = Timestamp.now();
    }
    const docRef = await addDoc(collection(db, config.collectionName), createData);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating ${config.collectionName}:`, error);
    return null;
  }
}

function subscribe<T extends { id: string }>(
  config: CRUDConfig<T>,
  callback: (items: T[]) => void
): () => void {
  try {
    return onSnapshot(collection(db, config.collectionName), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as T));
      callback(items);
    });
  } catch (error) {
    console.error(`Error subscribing to ${config.collectionName}:`, error);
    return () => {};
  }
}

// ============ USERS CRUD ============
const userConfig: CRUDConfig<User> = {
  collectionName: "users",
  searchFields: ["name", "email"],
  timestamps: true,
};

export const Users = {
  getAll: () => getAll(userConfig),
  getById: (id: string) => getById(userConfig, id),
  search: (term: string) => search(userConfig, term),
  update: (id: string, data: Partial<User>) => update(userConfig, id, data),
  delete: (id: string) => deleteItem(userConfig, id),
  create: (data: Omit<User, "id">) => create(userConfig, data),
  subscribe: (callback: (users: User[]) => void) => subscribe(userConfig, callback),

  async getByStatus(status: string): Promise<User[]> {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("status", "==", status));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
    } catch (error) {
      console.error("Error fetching users by status:", error);
      return [];
    }
  },

  async getActiveUsers(): Promise<User[]> {
    return this.getByStatus("active");
  },
};

// ============ BOOKS CRUD ============
const bookConfig: CRUDConfig<Book> = {
  collectionName: "books",
  searchFields: ["title", "author", "description"],
  timestamps: true,
};

export const Books = {
  getAll: () => getAll(bookConfig),
  getById: (id: string) => getById(bookConfig, id),
  search: (term: string) => search(bookConfig, term),
  update: (id: string, data: Partial<Book>) => update(bookConfig, id, data),
  delete: (id: string) => deleteItem(bookConfig, id),
  create: (data: Omit<Book, "id">) => create(bookConfig, data),
  subscribe: (callback: (books: Book[]) => void) => subscribe(bookConfig, callback),

  async getByStatus(status: string): Promise<Book[]> {
    try {
      const booksRef = collection(db, "books");
      const q = query(booksRef, where("status", "==", status));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Book));
    } catch (error) {
      console.error("Error fetching books by status:", error);
      return [];
    }
  },

  async getPublishedBooks(): Promise<Book[]> {
    return this.getByStatus("published");
  },

  async getDraftBooks(): Promise<Book[]> {
    return this.getByStatus("draft");
  },
};

// ============ NOTIFICATIONS CRUD ============
const notificationConfig: CRUDConfig<Notification> = {
  collectionName: "notifications",
  searchFields: ["title", "message"],
  timestamps: true,
};

export const Notifications = {
  create: (data: Omit<Notification, "id">) => create(notificationConfig, data),
  delete: (id: string) => deleteItem(notificationConfig, id),

  async getByUserId(userId: string): Promise<Notification[]> {
    try {
      const notificationsRef = collection(db, "notifications");
      const q = query(notificationsRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notification));
    } catch (error) {
      console.error("Error fetching notifications by user:", error);
      return [];
    }
  },

  async getUnreadByUserId(userId: string): Promise<Notification[]> {
    try {
      const notificationsRef = collection(db, "notifications");
      const q = query(
        notificationsRef,
        where("userId", "==", userId),
        where("read", "==", false)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Notification));
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      return [];
    }
  },

  async getUnreadCount(userId: string): Promise<number> {
    const unread = await this.getUnreadByUserId(userId);
    return unread.length;
  },

  async markAsRead(notificationId: string): Promise<boolean> {
    return update(notificationConfig, notificationId, {
      read: true,
      readAt: Timestamp.now(),
    } as Partial<Notification>);
  },

  async markAllAsRead(userId: string): Promise<void> {
    try {
      const unreadNotifications = await this.getUnreadByUserId(userId);
      for (const notif of unreadNotifications) {
        await this.markAsRead(notif.id);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  },

  subscribe: (userId: string, callback: (notifications: Notification[]) => void) => {
    try {
      const notificationsRef = collection(db, "notifications");
      const q = query(notificationsRef, where("userId", "==", userId));
      return onSnapshot(q, (snapshot) => {
        const notifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Notification));
        callback(notifications);
      });
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
      return () => {};
    }
  },
};

// ============ DASHBOARD STATISTICS ============
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [users, books, activeUsers] = await Promise.all([
      Users.getAll(),
      Books.getAll(),
      Users.getActiveUsers(),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const newUsersToday = users.filter((u) => {
      const userDate = u.createdAt instanceof Timestamp
        ? u.createdAt.toDate()
        : new Date(u.createdAt);
      return userDate >= today;
    }).length;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekTimestamp = Timestamp.fromDate(oneWeekAgo);

    const booksThisWeek = books.filter((b) => {
      const bookDate = b.createdAt instanceof Timestamp
        ? b.createdAt.toDate()
        : new Date(b.createdAt);
      return bookDate >= oneWeekAgo;
    }).length;

    return {
      totalUsers: users.length,
      totalBooks: books.length,
      newUsersToday,
      booksThisWeek,
      activeUsers: activeUsers.length,
      unreadNotifications: 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalUsers: 0,
      totalBooks: 0,
      newUsersToday: 0,
      booksThisWeek: 0,
      activeUsers: 0,
      unreadNotifications: 0,
    };
  }
}

export function subscribeToDashboardStats(
  callback: (stats: DashboardStats) => void
): () => void {
  try {
    const unsubscribeUsers = Users.subscribe(() => {
      getDashboardStats().then(callback);
    });

    const unsubscribeBooks = Books.subscribe(() => {
      getDashboardStats().then(callback);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeBooks();
    };
  } catch (error) {
    console.error("Error subscribing to dashboard stats:", error);
    return () => {};
  }
}

// ============ GLOBAL SEARCH ============
export async function globalSearch(searchTerm: string): Promise<{
  users: User[];
  books: Book[];
  notifications: Notification[];
}> {
  try {
    const [users, books, notifications] = await Promise.all([
      Users.search(searchTerm),
      Books.search(searchTerm),
      search(notificationConfig, searchTerm),
    ]);

    return { users, books, notifications };
  } catch (error) {
    console.error("Error in global search:", error);
    return { users: [], books: [], notifications: [] };
  }
}