import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
// import db from "../Firebase";
import Link from "next/link";

const SideBarContent = ({ docId , title }: { docId: number , title:string}) => {
    return (    
        <p>
          {title}
        </p>
    );
  
};

export default SideBarContent;
