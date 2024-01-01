export interface IAdmin{
    email:string;
    password:string;
}
export interface IPassword_reset{
    password:string;
    cpassword:string;
}
export interface MenuItem{
    icon: string;
    label:string;
    route:string
  }