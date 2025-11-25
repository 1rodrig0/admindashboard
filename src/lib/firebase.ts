import { initializeApp, getApps } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, setPersistence,
  browserLocalPersistence, browserSessionPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDgBLknDH7Ypf6TplzFv6OWRK55wXXdrtg",
    authDomain: "kolla-dev-36e79.firebaseapp.com",
    projectId: "kolla-dev-36e79",
    storageBucket: "kolla-dev-36e79.firebasestorage.app",
    messagingSenderId: "899719271929",
    appId: "1:899719271929:web:41e3e6629437b1dd0a9928"
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
/** Configura persistencia según "remember me" */
export async function setAuthPersistence(remember: boolean) {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}
