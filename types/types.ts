import { DocumentData } from "firebase/firestore";
export type User = {
    fullName:string,
    email:string,
    image:string
}
export interface RoomDocument extends DocumentData{
    createdAt:Date;
    role:"Owner"| "Editor";
    roomId:string;
    userId:string;
}