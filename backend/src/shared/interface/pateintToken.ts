import { ObjectId } from "mongoose";

export interface PatientToken{
    email:string;
    token:string;
    isPatient:boolean;
}