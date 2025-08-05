export type User = {
    fullName:string,
    email:string,
    image:string
}


export interface RoomDocument{
    createdAt:Date;
    role:"Owner"| "editor";
    roomId:string;
    userId:string;
}