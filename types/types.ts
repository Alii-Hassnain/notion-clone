import { DocumentData } from "firebase/firestore";
export type User = {
    fullName:string,
    email:string,
    image:string
}
export interface RoomDocument{
    createdAt:Date;
    role:"Owner"| "Editor";
    roomId:string;
    userId:string;
}