// firebaseAdmin.ts (backend file)
import { initializeApp, getApps, getApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceKey from "./service-key.json";

let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}
const adminDb = getFirestore(app);
export { app as adminApp, adminDb};