"use server";
import { adminDb } from "@/Firebase-admin";
import { auth } from "@clerk/nextjs/server";
export async function createNewDocument() {
  
  const { sessionClaims } = await auth();
  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Document",
  });
  //.set funciton will overwrite
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set(
      {
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
      },
      {
        merge: true,
      }
    );
    return {
      docId:docRef.id
    }
}
