import { Router, Request,Response } from "express";
import jwt from 'jsonwebtoken'
import { IDoctorLogin, ISlot } from "../shared/interface/doctor.interface";
import asyncHandler from "express-async-handler";
import { AppointmentModel, DoctorModel } from "./model";
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { PatientModel } from "../patients/model";
import crypto from "crypto";
import DoctorMiddleware from "../middleware/doctor.middlewae";
const router = Router()

////////////////////////////////////////////////////////////
router.post("/register", asyncHandler ( async(req:Request,res:Response)=>{
    try {
        const { name, email, phone , password , address } = req.body
        const passwordHash = await bcrypt.hash(password,10)
        console.log(passwordHash)
        const saveDoctor = new DoctorModel({
            name,email:email.toLowerCase(),phone,password:passwordHash,address,isDoctor:true,emailToken: crypto.randomBytes(64).toString('hex'),
            appointment:[]
        })
        const doctorData  = await saveDoctor.save() 
        if(doctorData){
            var mailOption = {
                from:` "verify your email" <vipinm500@gmail.com> `,
                to:doctorData.email,
                subject:"hello please verify your email",
                html:`<h2> ${doctorData.name} thanks for registering </h2>
                <h4>please verify your email and continue....</h4>
                <a href="http://localhost:4200/api/doctor/verify-email?token=${doctorData.emailToken}">verify email</a>`
                }
                transporter.sendMail(mailOption, function(err,info){ 
                    if(err){
                    console.log(err)  
                    }else{
                    console.log("verification email send to your account")
                    res.status(200).send({message:`welcome ${name} we will send confirmation email for your providing email address please verify`})
                    }
                    })
   
        }
                   
    } catch (error) {
        console.log(error) 
        res.status(500).send({message:"internal server down"})
    }
}))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// router.put("/add-slot", asyncHandler (async (req:Request,res:Response)=>{
//     try {
//         const { datetime,doctorId } = req.body
//         const doctorData = await DoctorModel.findOne({_id:doctorId})
//         if(doctorData){
//             let slotExists = false;
//             doctorData.appointment.forEach((data) => {
//                 if (data.datetime.toISOString() === new Date(datetime).toISOString()) {
//                   slotExists = true;
//                 }
//               });
//               if (slotExists) {
//                  res.status(401).send({ message: "Slot already exists" });
//               } else {
//                 doctorData.appointment.push({
//                   datetime: new Date(datetime),
//                   booked: false,
//                 });
//                 await doctorData.save().then((data) => {
//                   res.status(200).send({ message: "Slot added successfully" });
//                 });
//               }
            
//         }else{
//             res.status(401).send({message:"only added doctor please contact admin"})
//         }
//     } catch (error) {
//         console.log("error",error)
//         res.status(500).json("internal server down")
//     }
// }))
router.put("/add-slot",DoctorMiddleware,asyncHandler ( async(req:Request,res:Response)=>{
    try {
        const token = req.header('x-auth-doctor-token') as string
        console.log("token",token)
        const { date, time } = req.body
        const doctorToken:any = jwt.verify(token,process.env.JWT_SECRET!)
        const id = doctorToken?doctorToken.id:''
        
        const doctorExist = await AppointmentModel.findOne({doctorId:id})
        if(doctorExist){
            let slotExists = false
            doctorExist.slot.forEach(data=>{
                if(data.date===date&&data.time===time){
                    slotExists = true
                }
            })
            if(slotExists){
                res.status(400).send({message:"slot is already exist"})
            }else{
               doctorExist.slot.push({date:date,time:time,booked:false})
               await doctorExist.save().then(()=>{
                res.status(200).send({message:"slot added successfully"})
               })
            }

        }else{
            const saveSlot = new AppointmentModel({
                doctorId:id,slot:[{date:date,time:time}]
            })
            await saveSlot.save().then((data)=>{
                res.status(200).send({message:"congratulation.....! your first slot added successfully"})
            })
        }
       
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"internal server down"})
    }
}))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/verify-email", asyncHandler (async(req:Request,res:Response)=>{
    try {
        const tokenquery = req.query.token as string
        const decodeToken:any = jwt.verify(tokenquery,"thisrandom") 
        const doctorData = await DoctorModel.findOne({_id:decodeToken?decodeToken.id:''})
        if(doctorData){
            await DoctorModel.updateOne({_id:doctorData.email},{$set:{verify:true}}).then((data)=>{
                console.log(data)
                if(data.modifiedCount===1){
                    res.status(200).send({message:`welcome to MedTech Hospital ${doctorData.name}...! your verification success you can login after admin your profile....Thank you`})
                }else{
                    res.status(401).send({message:"token is not valid"})
                }
            })

        }else{
            res.status(401).send({message:"cannot verify this token id"})
        }
        
    } catch (error) {
        res.status(500).send({message:"token expired please try after sometimes"})
    }
}))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/forget-password", asyncHandler( async(req:Request,res:Response)=>{
    try {
      const doctorData = await DoctorModel.findOne({email:req.body.email})
      const token = jwt.sign({id:doctorData?.id,email:doctorData?.email},"thisrandom",{expiresIn:"30min"})
      if(doctorData&&token){
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
      const token = req.params.id
      const {password,cpassword} = req.body
      const decodeToken:any = jwt.verify(token,"thisrandom")
      const doctorData = await DoctorModel.findOne({_id:decodeToken.id})
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/fetch-appointment",DoctorMiddleware,asyncHandler ( async (req:Request,res:Response)=>{ 
try {
    const token = req.header('x-auth-doctor-token') as string
    const doctorToken:any = jwt.verify(token,process.env.JWT_SECRET!)
    const id = doctorToken?doctorToken.id:''
    const appointmentData = await AppointmentModel.aggregate([{$match:{'doctorId':id}},{$project:{_id:0,slot:1}}])
    if(appointmentData){
        res.status(200).send({data:appointmentData[0].slot,message:"data fetch successfully"})
    }else{
        res.status(401).send({data:null,message:"please add appoinment"})
    }
} catch (error) {
    res.status(500).send({message:"internal server down"})
}
}))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.patch("/remove-appointment",asyncHandler ( async(req:Request,res:Response)=>{
    try {
        const {date,time}=req.body
        const token = req.header('x-auth-doctor-token') as string
    const doctorToken:any = jwt.verify(token,process.env.JWT_SECRET!)
    const id = doctorToken?doctorToken.id:''
    const slotExist = await AppointmentModel.find()
    if(slotExist){
        const result = await AppointmentModel.updateOne(
            { doctorId: id },
            { $pull: { 'slot': { date: date,time: time } } }
          ); 
          if(result.modifiedCount===1){
            res.status(200).send({message:"slot deleted successfully"})
          }
    }
    } catch (error) {
        res.status(500).send({message:"internal server down"})
    }
}))

export default router