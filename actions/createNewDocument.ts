"use server";

import { adminDb } from "@/Firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { RoomDocument } from "../types/types";
const createNewDocument = async () => {
  // get the logged in user
  const { sessionClaims } = await auth();
  const email = sessionClaims?.email as string;
  if (!email) {
    throw new Error("User not authenticated");
  }
  // create a new document
  const docRef = await adminDb.collection("documents").add({
    title: "New Document",
    createdAt: Date.now(),
  });
  await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      roomId: docRef.id,
      role: "Owner",
      userId: email,
      createdAt: new Date(),
    } as RoomDocument);
  return docRef.id
};
export default createNewDocument;
