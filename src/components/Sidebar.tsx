"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, File, PlusCircle } from "lucide-react";
import React from 'react'
import NewDocumentButton from "./NewDocumentButton";

const Sidebar = () => {

  const menuOptions = (
   <>
     <NewDocumentButton/>
     {/* my documents */}

     {/* list */}

     {/* Share with me */}

     {/* List */}
   </>
   
  
   
  )
  return (
    <div className="md:w-64 w-full">
      {/* Mobile Button */}
      <div className="md:hidden p-2 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            {menuOptions}
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop button */}
      <div className="hidden md:block p-4">
        {menuOptions}
      </div>
    </div>
  )
}

// function SidebarContent() {
//   return (
//     <div className="space-y-4">
//       <NewDocumentButton/>
//       <ul className="space-y-2">
//         <li className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
//           <File className="w-4 h-4" /> Page 1
//         </li>
//         <li className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
//           <File className="w-4 h-4" /> Page 2
//         </li>
//       </ul>
//       <Button variant="outline" className="w-full flex items-center gap-2">
//         <PlusCircle className="w-4 h-4" /> New Page
//       </Button>
//     </div>
//   );
// }

export default Sidebar