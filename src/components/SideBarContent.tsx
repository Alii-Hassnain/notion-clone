import React, { useState } from "react";
const SideBarContent = ({ docId , title }: { docId: number , title:string}) => {
    return (    
        <p>
          {title}
        </p>
    );
};

export default SideBarContent;
