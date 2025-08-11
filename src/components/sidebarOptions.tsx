import React, { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Link from "next/link";
import db from "../Firebase";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { RoomDocument } from "../../types/types";
import SideBarContent from "./SideBarContent";
const SidebarOptions = () => {
  const [ownerEditor, setOwnerEditor] = useState<{
    Owner: RoomDocument[];
    Editor: RoomDocument[];
  }>({
    Owner: [],
    Editor: [],
  });
  const [docId, setDocId] = useState("");
  const pathName = usePathname();
  const { user } = useUser(); // Add isLoaded to know when Clerk is ready
  const email = user?.emailAddresses[0]?.emailAddress;
  const [snapshot, loading, error] = useCollection(
    email ? query(collection(db, "users", email, "rooms")) : null
  );
  useEffect(() => {
    if (!snapshot) return;
    const gData = snapshot?.docs.map((doc) => doc.data());
    const groupedData = gData?.reduce<{
      Owner: RoomDocument[];
      Editor: RoomDocument[];
    }>(
      (acc, item) => {
        acc[item.role].push(item);
        return acc;
      },
      {
        Owner: [],
        Editor: [],
      }
    );
    setOwnerEditor(groupedData);
    console.log(groupedData);
  }, [snapshot]);
  useEffect(() => {
    const idFromPath = pathName.split("/doc/")[1];
    if (idFromPath) setDocId(idFromPath);
  }, [pathName]);
  const [activeSnapshot, activeLoading, activeError] = useDocument(
    docId ? doc(db, "documents", docId) : null
  );
  if (activeLoading) return <h1>loading..</h1>;
  const activeTitle = activeSnapshot?.data()?.title;

  // just for the test..........................

  // if (snapshot) {
  //   return (
  //     <div>
  //       {snapshot?.docs.map((doc) => {
  //         const { roomId } = doc.data();
  //         return (
  //           <ul className="flex flex-col gap-2">
  //             <li className={`p-2 hover:bg-gray-100 rounded cursor-pointer`}>

  //             </li>
  //           </ul>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  if (ownerEditor.Owner.length > 0) {
    return (
      <ul className="flex flex-col gap-2">
        {ownerEditor.Owner?.map((doc) => {
          const data = doc;
          const roomId = data.roomId;
          console.log(roomId);

          const isActive = pathName === `/doc/${data.roomId}`;
          console.log(pathName);
          return (
            <Link href={`/doc/${data.roomId}`} key={data.roomId}>
              <li
                className={`p-2 hover:bg-gray-100 rounded cursor-pointer  ${
                  isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                <SideBarContent docId={roomId} />
              </li>
            </Link>
          );
        })}
      </ul>
    );
  }
  if (ownerEditor.Editor.length > 0) {
    return (
      <ul className="flex flex-col gap-2">
        {ownerEditor.Editor?.map((doc) => {
          const data = doc;
          const roomId = data.roomId;
          const isActive = pathName === `/doc/${data.roomId}`;
          console.log(pathName);
          return (
            <Link href={`/doc/${data.roomId}`} key={data.roomId}>
              <li
                className={`p-2 hover:bg-gray-100 rounded cursor-pointer  ${
                  isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                <SideBarContent docId={roomId} />
              </li>
            </Link>
          );
        })}
      </ul>
    );
  }

  // if (ownerEditor.Owner.length > 0) {
  //   return (
  //     <ul className="flex flex-col gap-2">
  //       {ownerEditor.Owner?.map((doc) => {
  //         const data = doc;
  //         const isActive = pathName === `/doc/${data.roomId}`;
  //         console.log(pathName);
  //         return (
  //           <Link href={`/doc/${data.roomId}`} key={data.roomId}>
  //             <li
  //               className={`p-2 hover:bg-gray-100 rounded cursor-pointer  ${
  //                 isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
  //               }`}
  //             >
  //               {/* <h1>New Document</h1> */}
  //               <h1>{activeTitle}</h1>
  //             </li>
  //           </Link>
  //         );
  //       })}
  //     </ul>
  //   );
  // }
};

export default SidebarOptions;
