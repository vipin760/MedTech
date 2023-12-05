export interface IListDoctors{
    _id?:string;
    name:string;
    email:string;
    address:string;
    isBlocked:boolean;
    phone:number;
    data?:{
        
    }
}

export interface IListDoctorsResponse{
    data:IListDoctors[],
    message:string;
}