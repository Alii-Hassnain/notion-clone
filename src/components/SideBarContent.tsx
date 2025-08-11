import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../Firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
const SideBarContent = ({ docId }: { docId: string }) => {
  const [snapshot, loading, error] = useDocument(
    doc(db, "documents", docId) // db = Firestore instance
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading document</p>;
  if (snapshot && snapshot.exists()) {
    return (
      
        <p>
          {snapshot?.data().title}
        </p>
      
    );
  }
};

export default SideBarContent;
