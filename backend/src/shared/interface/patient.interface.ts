export interface IPatient{
    name:string;
    email:string;
    password: string;
    address:string;
    isAdmin:boolean;
    isPatient:boolean;
    isDoctor:boolean;
    token?:string;
    verified:Boolean;
    isBlocked:Boolean;
    isDeleted:Boolean;
}