import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";
import db from "../Firebase";
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { RoomDocument } from "../../types/types";

const SidebarOptions = () => {
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
    console.log(groupedData);
  }, [snapshot]);

  return (
    <ul className="flex flex-col gap-2">
      {snapshot?.docs.map((doc) => {
        const data = doc.data();
        const isActive = pathName === `/doc/${data.roomId}`;
        return (
          <Link href={`/doc/${data.roomId}`} key={data.roomId}>
            <li
              className={`p-2 hover:bg-gray-100 rounded cursor-pointer  ${
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              <h1>New document</h1>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default SidebarOptions;
