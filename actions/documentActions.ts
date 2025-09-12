"use server";
import { supabaseServer } from "@/lib/supaBaseClient";

export async function getDocument(userId: string) {
  const { data, error, status } = await supabaseServer
  .from("documents")
  .select(`
      id,title,room_id,
      role:document_roles!right(user_id,role)
    `)
    .eq("created_by", userId);
  if (error) throw new Error(error.message);
   const transformed = data?.map((doc)=>({
    id:doc.id,
    title:doc.title,
    roomId:doc.room_id,
    role:doc.role?.[0]?.role ?? null,
   }));
   
  return {
    data:transformed,
    status,
  };
}

export async function getDocumnetTitle(docId:string){
  const {data , error , status } = await supabaseServer
  .from("documents")
  .select('title')
  .eq("id",docId)
  .single()
  if (error) throw new Error(error.message)
    console.log("single document data = " , data.title);
    return {
      title : data.title
    }
}

export async function setDocumentTitle(title:string , docId:string){
  const {data , error } = await supabaseServer
  .from("documents")
  .update({title})
  .eq("id",docId)
  .select("title")
  .single();

  if(error) throw new Error(error.message)  
    return {
      title : data.title
    }
}
