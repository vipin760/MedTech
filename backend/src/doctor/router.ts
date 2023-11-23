import { Router } from "express";
import jwt from 'jsonwebtoken'
import { sample_users } from "../data";
import { IDoctorLogin } from "../shared/interface/doctor.interface";
import { Admin } from "../shared/model/admin.model";
import { DoctorLogin } from "../shared/model/doctor.model";
const router = Router()

///////////////////////////////////////////////////////////
router.post("/login",(req,res)=>{
    console.log("working");
    
    const {email, password} = req.body
    const doctorData = sample_users.find(doctor => email ===doctor.email && password===doctor.password)
    if(doctorData){
        res.status(200).send(generateToken(doctorData))
    }else{
        res.status(404).send({message:"notfound"})
    }
})

const generateToken=(doctorData:IDoctorLogin)=>{
    const token = jwt.sign({email:doctorData.email, isDoctor:doctorData.isDoctor},"randomkey",{expiresIn:"30d"})
    doctorData.token=token
    return doctorData
}



///////////////////////////////////////////////////////////







export default router