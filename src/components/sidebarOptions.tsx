import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
// server actions
import { getDocument } from "../../actions/documentActions";
import { useQuery } from "@tanstack/react-query";
type Role = "owner" | "editor"

type Documents = {
  id: number;
  role: Array<{role:Role}>;
  roomId: number;
  title: string;
};
const SidebarOptions = () => {
  const pathName = usePathname();
  const { user, isLoaded } = useUser(); 
  const userId = user?.id;
  if (!isLoaded || !userId) return;
  if (!userId) throw new Error("id required");
  const {data : gData} = useQuery<Documents[]>({
    queryKey: ["documents"],
    queryFn: async () =>{
      const res = await getDocument(userId);
      return res.data; 
    }, 
    enabled:isLoaded && !!userId,
  }) 
  const ownerEditor = useMemo(()=>{
    if(!gData) return { owner:[], editor:[]};
    const groupedData = gData?.reduce<{
      owner:Documents[],
      editor:Documents[]
    }>((bag,item)=>{
      item.role.forEach((r)=>{
        bag[r.role].push(item);
      })
      return bag;
    },{
      owner:[],
      editor:[]
    })
    console.log(groupedData);
    return groupedData
  },[gData])
console.log(ownerEditor);
const DocList = ({docs}:{docs:Documents[]})=>{
  if(!docs) throw new Error("Document is empty");
    return(
      <ul className="flex flex-col gap-2">
        {docs.map((data) => {      
          const isActive = pathName === `/doc/${data.id}`;
          console.log(pathName);
          return (
            <Link href={`/doc/${data.id}`} key={data.id}>
              <li
                className={`p-2 hover:bg-gray-100 rounded cursor-pointer  ${
                  isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                <p>{data.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    )
}
  return(
    <>
      <DocList docs={ownerEditor.owner}/>
        <h1 className="text-gray-500">Shared with me</h1>
      <DocList docs={ownerEditor.editor}/>
    </>
  )
};

export default SidebarOptions;
