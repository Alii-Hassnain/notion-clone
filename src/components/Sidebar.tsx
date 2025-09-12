"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu} from "lucide-react";
import React from "react";
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
    <div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" variant="outline" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-amber-50">
            {menuOptions}
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block p-8">  
        {menuOptions}
      </div>
    </div>
  );
};

export default Sidebar;
