export interface IListPatient{
    _id?:string;
    name:string;
    email:string;
    phone:string;
    address:string;
    isBlocked?:boolean;
    data?:{

    }
}


export interface IUpdatePatientResponse{
    data?:string;
    message:string;
}