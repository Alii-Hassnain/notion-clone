
import { Button } from "@/components/ui/button"

import { ArrowLeftCircle } from "lucide-react";


export default function Home() {
  return (
    <div>
      <div className="flex flex-row gap-3 animate-pulse">
        <ArrowLeftCircle/> 
        <p>Click to create a new document</p>
      </div>
      <Button className="cursor-pointer">Click me</Button>
        <div className="flex justify-center p-4">
    </div>
    </div>
  );
}
