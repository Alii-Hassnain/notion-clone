import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyANz_T9h1VWv-5iVq-iTvNF5r_fhCFAeb0",
  authDomain: "my-notion-cl.firebaseapp.com",
  projectId: "my-notion-cl",
  storageBucket: "my-notion-cl.firebasestorage.app",
  messagingSenderId: "977158388500",
  appId: "1:977158388500:web:216b3a757ae2157fb02001",
  measurementId: "G-4KN0YEVYE9"
};
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApps();
const db =  getFirestore(app)
export { db };
export default app;