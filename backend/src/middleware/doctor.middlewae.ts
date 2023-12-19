import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { DoctorModel } from "../doctor/model";
import { IDoctor } from "../shared/interface/doctor.interface";



async function DoctorMiddleware(req:Request, res:Response, next:NextFunction){
   try {
      console.log("working middleware")
     const token = req.header('x-auth-doctor-token') as string
     const decode:any = jwt.verify(token,process.env.JWT_SECRET!)
     console.log(decode)
     const id = decode?decode.id:''
     const doctorData = await DoctorModel.findOne({_id:id})
     if(doctorData?.isDoctor){
      if(doctorData?.verified){
         if(doctorData?.isApproved){
            if(!doctorData?.isBlocked){ 
               next()
            }else{
               res.status(401).send({status:false, message:"Admin blocked this account please contact Admin"})
            }

         }else{
            res.status(401).send({status:false,message:"please wait your approval"})
            
         }

      }else{
         res.status(401).send({status:false, message:"please verify your email is then you can login"})
         
      }
     }else{
      res.status(401).send({status:false,message:"only verified doctor can access this filed please contact admin"})
     }
   } catch (error) {
      console.log(error)
      res.status(500).send({message:"internal server down"})
   }
   
 }
export default DoctorMiddleware
//isDoctor verified isBlocked 