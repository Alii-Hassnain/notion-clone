"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/media-query.css";
import "@liveblocks/react-tiptap/styles.css";
import { useOthers } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { resolveUsersSA, searchUsersSA } from "../../actions/userDirectory";
import { text } from "stream/consumers";
import ShareDocument from "@/components/ShareDocument";



function Who() {
  const others = useOthers();
  return <div>Online (not you): {others.length}</div>;
}

export function Room({id ,  children }: {id:string; children: ReactNode }) {
 
  return (
    // <LiveblocksProvider publicApiKey={"pk_dev_qD8od_v2TP-I-96KHxcy7p77SWjboojBzZpreI9q5v7_Gns_X1d0onPn1MR9Dpy-"}>
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({userIds}) =>{
        console.log("UserIds liveblocks =",userIds);
        
        return await resolveUsersSA(userIds)

      }
    }
      resolveMentionSuggestions={async({text}) => {
        console.log(text);
        
       return await searchUsersSA(text ?? "")
      }
      }
    >
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<div>Keep patience ...</div>}>
          <div className="flex justify-between">
            <Who /> 
            <ShareDocument docId = {id}/>
          </div>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}