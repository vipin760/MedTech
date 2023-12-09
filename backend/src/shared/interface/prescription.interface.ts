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