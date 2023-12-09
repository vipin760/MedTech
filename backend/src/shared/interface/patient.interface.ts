export interface IPatient{
    name:string;
    email:string;
    password: string;
    address?:string;
    phone:string;
    isAdmin:boolean;
    isPatient:boolean;
    isDoctor:boolean;
    token?:string;
    verified:Boolean;
    isBlocked:Boolean;
    isDeleted:Boolean;
}

export interface Patient_Register{
    name:string;
    email:string;
    password:string;
    phone:number;
    isPatient:boolean;
}

export interface IPatientToken{
    _id:object;
    name:string;
    email:string;
    isPatient:boolean;
    token?:string;
}