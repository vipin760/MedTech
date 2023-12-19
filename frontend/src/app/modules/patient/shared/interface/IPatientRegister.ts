export interface IPatientRegister{
    name:string;
    email:string;
    password:string;
    phone:number;
}
export interface IPassword_reset{
    password:string;
    cpassword:string;
}
export interface IAvailableDoctor{
    message?:string;
    data?:{

    }
}
