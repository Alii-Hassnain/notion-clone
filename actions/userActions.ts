"use server"    

import { supabaseServer } from "@/lib/supaBaseClient"; 

export async function findUserByEmail(email: string , docId : string) {
  if (!email) return null;
  const { data:user, error:userErr } = await supabaseServer
    .from("users")           // 👈 your table name (adjust if different)
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .single();
    if(userErr || !user) throw new Error(userErr?.message || "User not found")
    const userId = user?.id;
    const {data:roleRows , error:roleErr}  = await supabaseServer
    .from("document_roles")
    .upsert(
        {doc_id:docId, user_id:userId ,role:"editor"},
        {ignoreDuplicates:true}
    )
    .select();
    if(roleErr) throw new Error(roleErr.message);
  return {
    user,
    role:roleRows?.[0] ?? null,
  }; // will be the user object or null
}


