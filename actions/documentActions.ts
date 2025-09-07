"use server";
import { supabaseServer } from "@/lib/supaBaseClient";

type Doc = {
  id:number;
  title: string;
  role:"owner" | "editor";
  room:number
}

export async function getDocument(userId: string) {

  const { data, error, status } = await supabaseServer
  .from("documents")
  .select(`
      id,title,room_id,
      role:document_roles(user_id,role)
    `)
    .eq("created_by", userId);
  if (error) throw new Error(error.message);

   console.log("this is the log",data);

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
