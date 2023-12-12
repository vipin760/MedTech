import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { DoctorModel } from "../doctor/model";



async function DoctorMiddleware(req:Request, res:Response, next:NextFunction){
     const token = req.header('x-auth-token');
     console.log(token)
     if(token){
        next()
     }else{
        res.status(401).send({message:"invalid token"})
     } 
 }
export default DoctorMiddleware