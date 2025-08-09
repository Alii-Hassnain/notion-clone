"use client"

import React, { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BreadCrumbs from "@/components/breadCrumbs";
import { Button } from "@/components/ui/button";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../../Firebase"
import { doc } from "firebase/firestore";


const documents =  ({ params }: { params:Promise<{ id: string }> }) => {
    const {id} = use(params);
  const [title , setTitle ] = useState("")
    const [snapshot , loading , error] = useDocument(doc(db,"documents",id))
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(snapshot);
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <BreadCrumbs id = {id} />
        </div>
        <div className="flex  flex-col gap-2 max-w-screen-md mx-auto">
          <Label htmlFor="title">Change Title ?</Label>
          <div className="flex flex-row gap-5">
            <Input id="title" type="text" />
            <Button className="cursor-pointer bg-blue-300 active:scale-95 transition-transform duration-150">
                Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default documents;
