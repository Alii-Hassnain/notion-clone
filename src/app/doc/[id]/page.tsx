"use client";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import BreadCrumbs from "@/components/breadCrumbs";
import { Button } from "@/components/ui/button";
import {
  getDocumnetTitle,
  setDocumentTitle,
} from "../../../../actions/documentActions";
import { Room } from "@/app/room";
import { Editor } from "@/components/LiveBlocksComponent/Editor";
// import { RoomProvider } from "@liveblocks/react";

const Documents = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { title } = await getDocumnetTitle(id);
      setTitle(title);
    };
    fetch();
  }, [id]);
  console.log("This is the title = ", title);
  async function handleUpdate() {
    if (!title.trim()) return; // prevent empty update
    const data = await setDocumentTitle(title, id);
    setTitle(data.title); // clear input after update
  }

  
  return (
    <Room id = {id}>
      <div>
        <div className="flex justify-center">
          <BreadCrumbs id={id} />
        </div>
        <div className="flex flex-col gap-2 max-w-screen-md mx-auto">
          <div className="flex flex-row gap-5">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={title}
            />
            <Button
              onClick={handleUpdate}
              className="cursor-pointer bg-blue-300 active:scale-95 transition-transform duration-150"
            >
              Edit
            </Button>

          </div>
        </div>
      </div>

      <Editor />
    </Room>
  );
};

export default Documents;
