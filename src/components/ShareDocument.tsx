"use client";

import React, { useRef } from "react";
import { FaSlideshare } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button} from "./ui/button";
import { Input } from "@/components/ui/input";
import { findUserByEmail } from "../../actions/userActions";
const ShareDocument = ({docId} : {docId:string}) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const handleAdd = async () =>{
        const email = emailRef?.current?.value;
        if(!email || !docId) throw new Error("email and docId is missing");
        const data = await findUserByEmail(email , docId);
        console.log("Inviting" , email);
        console.log(data);
    }
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-row gap-2 items-center cursor-pointer hover:text-shadow-md">
            <FaSlideshare />
            <p>Share Document</p>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 bg-white p-5 rounded-2xl">
            <h1>Find by Email</h1>
            <Input 
                type="email" 
                placeholder="Email" 
                className="border-0 border-b-2 border-b-amber-300"
                ref = {emailRef}
            />
            <Button 
                variant="outline" 
                className="cursor-pointer bg-transparent"
                onClick={handleAdd}    
            >ADD</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShareDocument;
