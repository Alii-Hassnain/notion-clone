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
import {useQuery , useMutation , useQueryClient} from "@tanstack/react-query";





const Documents = ({ params }: { params: Promise<{ id: string }> }) => {

  const queryClient = useQueryClient();
  const { id } = use(params);
  const [localTitle, setTitle] = useState("");

  const {data:title} = useQuery<string>({
    queryKey:["documentTitle"],
    queryFn:async () =>{
      const {title} = await getDocumnetTitle(id);
      return title
    }
  })

  const {mutate} = useMutation({
    mutationFn:async(newTitle:string) =>{
      const data = await setDocumentTitle(newTitle, id);
      return data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["documents"]});
      queryClient.invalidateQueries({queryKey:["documentTitle",id]});
    },
  });


  // const {data:title,mutate} = useMutation({
  //   mutationFn:async ()=>{
  //     const {title} = await getDocumnetTitle(id);
  //     return title;
  //   },
  //   onSuccess:()=>{
  //     queryClient.invalidateQueries({queryKey:["documents"]})
  //   },
    
  // })

  // useEffect(() => {
  //   if (!id) return;
  //   const fetch = async () => {
  //     const { title } = await getDocumnetTitle(id);
  //     setTitle(title);
  //   };
  //   fetch();
  // }, [id]);
  // console.log("This is the title = ", title);
  // async function handleUpdate() {
  //   if (!title.trim()) return; // prevent empty update
  //   const data = await setDocumentTitle(title, id);
  //   setTitle(data.title); // clear input after update
  // }
  // const others = useOthers();
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
              onBlur={()=> {
                if (!localTitle.trim()) return;
                mutate(localTitle)
              }}
              placeholder={title}
            />
            <Button
              // onClick={handleUpdate}
              className="cursor-pointer bg-blue-300 active:scale-95 transition-transform duration-150"
            >
              Edit
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
