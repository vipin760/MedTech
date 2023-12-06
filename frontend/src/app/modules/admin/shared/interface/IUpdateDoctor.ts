export interface IUpdateDoctor{
    name:string;
    email:string;
    phone:string;
    address:string;
}

export interface IUpdateDoctorResponse{
    data?:string;
    message:string;
}