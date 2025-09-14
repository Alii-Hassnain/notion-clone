"use server";

import { supabaseServer } from "@/lib/supaBaseClient";
import { auth, currentUser, EmailAddress } from "@clerk/nextjs/server";

export async function createNewDocumentAction() {
  const { userId } = await auth();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const { status: uStatus, error: uErr } = await supabaseServer
    .from("users")
    .upsert({ id: userId, email }, { onConflict: "id" });
    
  if (uErr) throw new Error(uErr.message);
  const {
    data: room,
    error: rErr,
  } = await supabaseServer
    .from("rooms")
    .upsert({ owner_user_id: userId }, { onConflict: "owner_user_id" })
    .select("id")
    .single();
  if (rErr) throw new Error(rErr.message);

  const roomId = room?.id;

  const {
    data: document,
    error: dErr,
  } = await supabaseServer
    .from("documents")
    .insert({ room_id: roomId, title: "New Document", created_by: userId })
    .select("id")
    .single();

  if (dErr) throw new Error(dErr.message);


  const docId = document?.id;

  const {status:roleStatus,error:roleError} = await supabaseServer
  .from("document_roles")
  .insert({doc_id:docId,user_id:userId,role:"owner"})

  if(roleError) throw new Error("Not a doc")
  
  return {
    docId,
  };
}
