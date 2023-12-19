export interface IDoctorLogin{
 _id:object;
 name:string;
 email:string;
 isDoctor:boolean;
 token?:string;
}

export interface IDoctor{
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
    isApproved:boolean;
    emailToken:string;
}

export interface ISlot{
    date:string
    time:string;
    booked:boolean;
    patientId?:object;
    prescritionId?:object;
}

export interface IAppointment{
    doctorId:object;
    slot:[ISlot]
}
