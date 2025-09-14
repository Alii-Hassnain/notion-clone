"use server";
import { supabaseServer } from "@/lib/supaBaseClient";

export async function getDocument(userId: string) {
  const { data, error, status } = await supabaseServer
    .from("documents")
    .select(
      `
      id,title,room_id,
      role:document_roles!inner(user_id,role)
    `
    )
    .eq("document_roles.user_id", userId);
  if (error) throw new Error(error.message);
  console.log(data);
  console.log(data[0]);
  const transformed = data?.map((doc) => ({
    id: doc.id,
    title: doc.title,
    roomId: doc.room_id,
    role: doc.role.map((doc) => ({
      role: doc.role,
    })),
  }));
  return {
    data: transformed,
    status,
  };
}
export async function getDocumnetTitle(docId: string) {
  const { data, error, status } = await supabaseServer
    .from("documents")
    .select("title")
    .eq("id", docId)
    .single();
  if (error) throw new Error(error.message);
  console.log("single document data = ", data.title);
  return {
    title: data.title,
  };
}
export async function setDocumentTitle(title: string, docId: string) {
  const { data, error } = await supabaseServer
    .from("documents")
    .update({ title })
    .eq("id", docId)
    .select("title")
    .single();
  if (error) throw new Error(error.message);
  return {
    title: data.title,
  };
}
export async function deletedocument(docId: string, userId: string) {
  const { data, error } = await supabaseServer
    .from("documents")
    .delete()
    .eq("id", docId)
    .eq("created_by", userId)
    .select("id")
    .maybeSingle();
  if (error) {
    return { ok: false, error: error.message };
  }
  if (!data) return { ok: false, reason: "YOU ARE NOT OWNER OF THE DOC" };
  return { ok: true };
}
