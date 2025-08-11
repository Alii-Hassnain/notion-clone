"use client";
import React, { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BreadCrumbs from "@/components/breadCrumbs";
import { Button } from "@/components/ui/button";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../../Firebase";
import { doc, updateDoc } from "firebase/firestore";

const Documents = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [snapshot, loading, error] = useDocument(doc(db, "documents", id));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;  
  const documentData = snapshot?.data();
  async function handleUpdate() {
    if (!title.trim()) return; // prevent empty update
    const docRef = doc(db, "documents", id);
    await updateDoc(docRef, { title });
    setTitle(""); // clear input after update
  }
  return (
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
            placeholder={documentData?.title}
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
  );
};

export default Documents;
