import Image from "next/image";
import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div>
      <h1>My name is Ali</h1>
      <Button className="cursor-pointer">Click me</Button>
    </div>
  );
}
