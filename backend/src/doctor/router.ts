import { Router } from "express";
import jwt from 'jsonwebtoken'
import { sample_users } from "../data";
import { IDoctorLogin } from "../shared/interface/doctor.interface";
import { Admin } from "../shared/model/admin.model";
import { DoctorLogin } from "../shared/model/doctor.model";
import asyncHandler from "express-async-handler";
import { DoctorModel } from "./model";
import bcrypt from 'bcryptjs'
const router = Router()

////////////////////////////////////////////////////////////
router.post("/login",asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const doctorData = await DoctorModel.findOne({email:email})
    if(doctorData && await bcrypt.compare(password, doctorData.password)){
        if(doctorData.verified){
            res.status(200).send(generateToken(doctorData))
        }else{
            res.status(401).send({data:null,message:"please verify your mail after you can join here...!"})
        }
    }else{
        res.status(403).send({data:null, message:"invalid email or password"})
    }
}))

const generateToken=(doctorData:IDoctorLogin)=>{
    const token = jwt.sign({email:doctorData.email, isDoctor:doctorData.isDoctor},process.env.JWT_SECRET!,{expiresIn:"30d"})
    doctorData.token=token
    return doctorData
}

///////////////////////////////////////////////////////////







export default router