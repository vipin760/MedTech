export interface IPostDoctor{
    name:string;
    email:string;
    phone:string;
    address:string;
    password:string;
    verified?:boolean;
    isAdmin:boolean; 
    isDoctor:boolean;
    isPatient:boolean;
    isBlocked?:boolean;
    isDeleted?:boolean;
    emailToken?:string;
}