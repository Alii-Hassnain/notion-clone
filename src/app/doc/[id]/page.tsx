"use client";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import BreadCrumbs from "@/components/breadCrumbs";
import { Button } from "@/components/ui/button";
import {
  deletedocument,
  getDocumnetTitle,
  setDocumentTitle,
} from "../../../../actions/documentActions";
import { Room } from "@/app/room";
import { Editor } from "@/components/LiveBlocksComponent/Editor";
import {useQuery , useMutation , useQueryClient} from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"



const Documents = ({ params }: { params: Promise<{ id: string }> }) => {
  const queryClient = useQueryClient();
  const { id } = use(params);
  const [localTitle, setTitle] = useState<string>("");
  const { user, isLoaded } = useUser();
  const userId = String(user?.id);
  const {data:title} = useQuery<string>({
    queryKey:["documentTitle"],
    queryFn:async () =>{
      const {title} = await getDocumnetTitle(id);
      return title
    },
  })
  const {mutate:mutateNewTitle} = useMutation({
    mutationFn:async(newTitle:string) =>{
      const data = await setDocumentTitle(newTitle, id);
      return data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["documentTitle"]});
      queryClient.invalidateQueries({queryKey:["documents"]});
    },
  });
  const {mutate:mutateDelDoc} = useMutation({
    mutationFn:async({docId,userId}:{docId:string,userId:string}) =>{
      const data = await deletedocument(docId, userId);
      return data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["documents"]});
    },
  });
  const handleUpdate = () =>{
    if(!localTitle.trim()) return;
    mutateNewTitle(localTitle);
  }
  const handleDelete = async () =>{
    if(!isLoaded){
      return
    }
    mutateDelDoc({docId:String(id),userId:String(user?.id)});
    const status = await deletedocument(id,String(user?.id))
    console.log(status);

    if(status.ok == false){
      toast("⚠️ can't delete you are not the Owner", {
            description: Date.now(),
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
    }

    

  }

  return (
    <Room id = {id}>
    <div className="my-5">
        <div className="flex justify-center">
          <BreadCrumbs id={id} />
        </div>
        <div className="flex flex-col gap-2 max-w-screen-md mx-auto">
          <div className="flex flex-row gap-5">
            <Input
              type="text"
              value={localTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={title}
            />
            <Button
              onClick={handleUpdate}
              className="cursor-pointer bg-blue-300 active:scale-95 transition-transform duration-150"
            >
              Update
            </Button>
            <Button
              onClick={handleDelete}
              className="cursor-pointer bg-red-400 active:scale-95 transition-transform duration-150"
            >
              Delete
            </Button>
            {/* <div>Online (not you): {others.length}</div>; */}
          </div>
        </div>
      </div>
      <Editor />
    </Room>
  );
};

export default Documents;
