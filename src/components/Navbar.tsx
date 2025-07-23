"use client";

import React from "react";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="w-full h-14 bg-white border-b shadow-sm px-4 flex items-center justify-between relative">
      {user ? (
        <h1 className="font-semibold">
          {user?.firstName}
          {`'s`} Space
        </h1>
      ) : (
        <div className="w-1/2" />
      )}
      <h1 className="absolute left-1/2 text-xl font-semibold">Notion clone</h1>

      {/* BreadCrumbs */}

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="flex items-center gap-2 cursor-pointer">
              <User className="w-5 h-5" />
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </nav>
  );
};
export default Navbar;
