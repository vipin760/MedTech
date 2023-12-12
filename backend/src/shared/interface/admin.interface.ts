export interface IAdmin{
    id?:string;
    name:string;
    email:string;
    phone:number;
    token:string;
    password:string;
    address:string;
    verified:boolean;
    isAdmin:boolean;
    isPatient:boolean;
    isDoctor:boolean;
    isBlocked:boolean;
    isDeleted:boolean;
   }
   export interface IAdmin_token{
    id?:object;
    name:string;
    email:string;
    phone:number;
    token:string;
    password:string;
    address:string;
    verified:boolean;
    isAdmin:boolean;
    isPatient:boolean;
    isDoctor:boolean;
    isBlocked:boolean;
    isDeleted:boolean;
   }

export interface IAdminLogin{
    _id?:object;
    name:string;
    email:string;
    isAdmin:boolean;
    token?:string;
   }