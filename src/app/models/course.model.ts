import { FileHandle } from "./file-handle.model";

export interface Course{
    id:string,
    name:string;
    price:number;
    courseImages:FileHandle[]
}