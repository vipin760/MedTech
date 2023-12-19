export interface IDoctor{
    email:string;
    password:string;
}
export interface IPassword_reset{
    password:string;
    cpassword:string;
}
export interface ISlotData{
    date:string;
    time:string;
}
export interface ISlotData_Res{
    message?:string
}

export interface IFetchAppoinmentResponse {
    data: IAppointment[];
    message?: string;
  }
  

  export interface IAppointment {
    doctorId: string;
    slot: ISlot[]; 
  }
  
  export interface ISlot {
    date: string;
    time: string;
    booked: boolean;
    patientId?: string; 
    prescritionId?: string; 
  }

  export interface IDatetime{
    date:string;
    time:string;
  }