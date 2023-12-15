import { Router, Request,Response } from "express";
import jwt from 'jsonwebtoken'
import { IDoctorLogin } from "../shared/interface/doctor.interface";
import asyncHandler from "express-async-handler";
import { DoctorModel, PrescriptionModel } from "./model";
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { PatientModel } from "../patients/model";
const router = Router()

////////////////////////////////////////////////////////////
router.post("/login",asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const doctorData = await DoctorModel.findOne({email:email})
    if(doctorData && await bcrypt.compare(password, doctorData.password)){
        if(doctorData.verified){
            if(doctorData.isBlocked){
                res
                .status(401)
                .send({ data: null, message: "in these account blocked please contact admin immediately" });
              }else{
                res.status(200).send(generateToken(doctorData))
              }
        }else{
            res.status(401).send({data:null,message:"please verify your mail after you can join here...!"})
        }
    }else{
        res.status(403).send({data:null, message:"invalid email or password"})
    }
}))

const generateToken=(doctorData:IDoctorLogin)=>{
    const token = jwt.sign({id:doctorData._id,email:doctorData.email},process.env.JWT_SECRET!,{expiresIn:"30d"})
    const doctorDetails={
       _id:doctorData._id,
       email:doctorData.email,
       name:doctorData.name,
       token:token,
       isDoctor:doctorData.isDoctor
    }
    return doctorDetails
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/list-patients", asyncHandler (async(req,res)=>{
    try {
        const patientsData = await PatientModel.find()
        if(patientsData){
            res.status(200).send({data:patientsData, message:"data fetch successfully"})
        }else{
            res.status(401).send({data:null, message:"oops something went wrong....!"})
        }
        
    } catch (error) {
        res.status(500).send({data:null, message:"internal server down"})
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.patch("/block-patient/:id", asyncHandler (async(req,res)=>{
    try{
        await PatientModel.updateOne({_id:req.params.id},{$set:{isBlocked:true}}).then(data=>{
            if(data.modifiedCount===1){
                res.status(200).send({data:null,message:"patients blocked success"})
            }else{
                res.status(401).send({data:null, message:"oops something went wrong...!!!"})
            }
        }).catch(error=>{
            res.status(403).send({data:null, message:"please try after some times"})
        })

    }catch(error){
        res.status(500).send({data:null,message:"internal server down"})
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.patch("/unblock-patient/:id", asyncHandler (async(req,res)=>{
    try{
        await PatientModel.updateOne({_id:req.params.id},{$set:{isBlocked:false}}).then(data=>{
            if(data.modifiedCount===1){
                res.status(200).send({data:null,message:"patients unblocked success"})
            }else{
                res.status(401).send({data:null, message:"oops something went wrong...!!!"})
            }
        }).catch(error=>{
            res.status(403).send({data:null, message:"please try after some times"})
        })

    }catch(error){
        res.status(500).send({data:null,message:"internal server down"})
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/fetch-patients/:id", asyncHandler (async(req,res)=>{
    try {
        const patientData = await PatientModel.findOne({_id:req.params.id}) 
        if(patientData){
            res.status(200).send({data:patientData, message:"patient data fetch successfully"})
        }else{
            res.status(401).send({data:null, message:"oops something went wrong...!!!"})
        }
    } catch (error) {
        res.status(500).send({data:null, message:"internal server down"})
    }
}))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"vipinm500@gmail.com",
        pass:"ugyh ilhh gsnl xiro"
    },
    tls:{
        rejectUnauthorized:false
    }
  })

router.post("/add-prescription",asyncHandler( async(req,res)=>{
    try {
        const { medicineName, quantity, eatingTimes } = req.body
        const prescriptionSave ={ medicineName, doctorId:req.query.patientId,patientId:req.query.doctorId, quantity, eatingTimes}
        await PrescriptionModel.create(prescriptionSave).then((data)=>{
            res.status(200).send({data:null, message:"new prescription created successfully"})
        }).catch((error)=>{
            console.log(error)
            res.status(401).send({data:null, message:"could not be added precscription try after sometime....!"})
        })
    } catch (error) { 
        res.status(500).send("internal server down")
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/forget-password", asyncHandler( async(req:Request,res:Response)=>{
    try {
      console.log("doctor forget password success 2")
      const doctorData = await DoctorModel.findOne({email:req.body.email})
      const token = jwt.sign({id:doctorData?.id,email:doctorData?.email},"thisrandom",{expiresIn:"30min"})
      if(doctorData&&token){
        console.log("forget password success 2")
        var mailOption = {
          from:` "Reset password" <vipinm500@gmail.com> `,
          to:doctorData.email,
          subject:"hello please Reset Password",
          html:`<h2> ${doctorData.name} reset your password make strong</h2>
              <h4>please reset password and continue</h4>
              <a href="http://localhost:4200/doctor/reset-password/${token}">reset password</a>`
      }
      transporter.sendMail(mailOption, function(err,info){
          if(err){ 
              console.log(err)  
              res.status(400).json("Oops some happened wrong please try after some times")
          }else{
              console.log("verification email send to your account doctor")
              res.status(200).json("reset password send in your providing email please reset now valid only 30 minutes");
          }
      })
  
      }else{
        res.status(404).json("the request resource associated with the provided email address could not be find")
      }
      
    } catch (error) {
      res.status(500).json("internal server down")
    }
  }))
  ////////////////////////////////////////////////////////////////////////////////////////////
  router.patch("/reset-password/:id",asyncHandler (async(req:Request,res:Response)=>{
    try {
        console.log("working doctor")
      const token = req.params.id
      const {password,cpassword} = req.body
      const decodeToken:any = jwt.verify(token,"thisrandom")
      console.log(decodeToken)
      const doctorData = await DoctorModel.findOne({_id:decodeToken.id})
      console.log(doctorData)
      if(doctorData){
        const passwordHash = await bcrypt.hash(password,10)
        await DoctorModel.updateOne({email:doctorData.email},{$set:{password:passwordHash}}).then(data=>{
          if(data.modifiedCount===1){
            res.status(200).json("password reset successfully")
          }else{
            res.status(404).json("password cannot reset please try after sometimes")
          }
        })
      }else{
        res.status(404).json("token expired")
      }
      
    } catch (error) {
      res.status(500).json("token expired")
    }
  }))
  

export default router