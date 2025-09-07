import React, { use, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { RoomDocument } from "../../types/types";
import SideBarContent from "./SideBarContent";

// server actions
import { getDocument } from "../../actions/documentActions";

type Documents = {
  id: number;
  role: "owner" | "editor";
  roomId: number;
  title: string;
};

const SidebarOptions = () => {
  const [gData, setGdata] = useState<Documents[]>([]);
  const pathName = usePathname();
  const { user, isLoaded } = useUser(); // Add isLoaded to know when Clerk is ready
  // const email = user?.emailAddresses[0]?.emailAddress;
  const userId = user?.id;



  useEffect(()=>{
     if (!isLoaded || !userId) return;
    const fetchData = async () => {
      if (!userId) throw new Error("id required");
      const { data } = await getDocument(userId);
      if (!data) return;
      console.log(data);
      setGdata(data);
    };
    fetchData();

  },[userId,isLoaded])

  const ownerEditor = useMemo(()=>{
    if(!gData) return { owner:[], editor:[]};
    const groupedData = gData?.reduce<{
      owner:Documents[],
      editor:Documents[]
    }>((bag,item)=>{
      bag[item.role].push(item);
      return bag;
    },{
      owner:[],
      editor:[]
    })

    return groupedData
  },[gData])

  console.log(ownerEditor);
  

const DocList = ({docs}:{docs:Documents[]})=>{
  if(!docs) throw new Error("Document is empty");
    return(
      <ul className="flex flex-col gap-2">
        {docs.map((data) => {
          
          const isActive = pathName === `/doc/${data.roomId}`;
          console.log(pathName);
          return (
            <Link href={`/doc/${data.roomId}`} key={data.id}>
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
