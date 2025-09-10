import { Liveblocks } from "@liveblocks/node";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const liveBlocksSecret = process.env.LIVE_BLOCK_KEY;

if(!liveBlocksSecret){
    throw new Error("Missing Live blocks secret key");
}
const liveblocks = new Liveblocks({
    secret : liveBlocksSecret
})


export async function POST(){
    const user = await currentUser(); // null if signed out
    const userId = user?.id ?? "guest";
    const name = user?.firstName ?? "Guest";
    // const rNum = Math.random().toString(36).slice(2);
    const r = Math.floor(Math.random() * 10);
    const avatar = user?.imageUrl ?? "https://i.pravatar.cc/98";
    const color = "#6ee7b7";
    const session = liveblocks.prepareSession(userId,{
        userInfo: {name , avatar , color},
    });
    session.allow("*", session.FULL_ACCESS);
    const {status , body} = await session.authorize();
    return new NextResponse(body , {status});

}