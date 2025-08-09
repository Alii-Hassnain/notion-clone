"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, File, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import NewDocumentButton from "./NewDocumentButton";
import SidebarOptions from "./sidebarOptions";

const Sidebar = () => {
  const menuOptions = (
    <div className="flex justify-center items-center flex-col gap-5">
      {/* my documents */}
      <NewDocumentButton />
      {/* list */}
      <SidebarOptions/>
      {/* Share with me */}
      {/* List */}  
    </div>
  );
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
      <div className="hidden md:block p-4">{menuOptions}</div>
    </div>
  );
};

export default Sidebar;
