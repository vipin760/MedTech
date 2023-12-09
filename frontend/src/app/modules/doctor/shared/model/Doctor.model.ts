export class Doctor{
    id!:string;
    name!:string;
    email!:string;
    password!:string;
    token!:string;
    isDoctor!:boolean;
    isAdmin!:boolean;
    isPatient!:boolean;
}

// export class Doctor{
//     email!:string;
//     password!:string;
//     token!:string;
// }
///////////////////////////////////////////////////////////////////////////////
export interface EatingTime{
    mealTime: 'Moring' | 'Afternoon' | 'Evening' | 'Night';
    beforeFood:boolean ;
}

export interface IPrescription{
    medicineName:string;
    doctorId:string;
    patientId:string;
    quantity:number;
    eatingTimes:EatingTime[];
}

///////////////////////////////////////////////////////////////////////////////