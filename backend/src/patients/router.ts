import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken'
import { User, UserModel } from './model';
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from '../constant.ts/http_status';
import { IUser } from '../shared/interface/user.interface';
import  bcrypt  from 'bcryptjs';

const router = Router()
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/login',(req,res)=>{
    const {email, password} = req.body
    const user = sample_users.find(user=> user.email === email && user.password === password)
    if(user){

       res.status(200).send(generateToken(user))
    }else{
       res.status(404).send("invalid user") 
    }
}) 

const generateToken = (user:any)=>{
   const token = jwt.sign({email:user.email, is_admin: user.is_patient },"randomkey",{expiresIn:"30d"})
   user.token = token
   return user

}

////////////////////////////////////////////////////////////////////////////////////////////

router.get("/seed", asyncHandler(
   async(req,res)=>{
 
     const userCount = await UserModel.countDocuments()    
 
     
     if(userCount>0){
       res.send("seed is already done")
       return
     }
     await UserModel.create(sample_users)
     res.send("Seed is done")
   }
 ))
////////////////////////////////////////////////////////////////////////////////////////////
router.post("/register", asyncHandler(
   async(req,res)=>{
      const {name, email, password, address} = req.body
      const isEmail = await UserModel.findOne({email:email})
      if(!isEmail){
         const passwordHash = await bcrypt.hash(password, 10)
         const newPatient:IUser={
            name,
            email:email.toLowerCase(),
            password:passwordHash,
            address:address,
            isPatient:true
         }

         const patientSave = await UserModel.create(newPatient)
         res.status(200).send(generateTokenResponse(patientSave))
      }else{
         res.status(HTTP_BAD_REQUEST).send({data:null,message:"email is alreay registered"})
         return
      }
   }
))

////////////////////////////////////////////////////////////////////////////////////////////

const generateTokenResponse = (user:any)=>{
   const token = jwt.sign({
     id:user.id,
     email: user.email, isAdmin:user.isAdmin 
   },process.env.JWT_SECRET!,{
     expiresIn:"30d"
   })

   const userWithToken = {
     ...user.toObject(), // Convert the Mongoose document to a plain JavaScript object
     token: token,
 };
   // user.token = token
   return userWithToken
 }
////////////////////////////////////////////////////////////////////////////////////////////

export default router


