import { Router } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { DoctorModel } from "../doctor/model";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { PatientModel } from "../patients/model";
import { IAdmin, IAdminLogin } from "../shared/interface/admin.interface";
import { AdminModel } from "./model";

const router = Router();
//////////////////////////////////////////////////////////////////////////////

router.post("/login", asyncHandler( async(req, res) => {
  const { email, password } = req.body;
  const adminData = await AdminModel.findOne({email:email})
  if (adminData && await bcrypt.compare(password,adminData.password)) {
    res.status(200).send(generateToken(adminData));
  } else {
    res.status(404).send({ message: "admin not found here", data: null });
  }
}));

const generateToken = (adminData: IAdminLogin) => {
  const token = jwt.sign(
    { email: adminData.email, isAdmin: adminData.isAdmin },
    "randomkey",
    { expiresIn: "30d" }
  );
  const adminDetails = {
  _id:adminData._id,
  email:adminData.email,
  name:adminData.name,
  token:token
  }

  return adminDetails;
};
////////////////////////////////////////////////////////////////////////////

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vipinm500@gmail.com",
    pass: "ugyh ilhh gsnl xiro",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post(
  "/add-doctor",
  asyncHandler(async (req, res) => {
    try {
      const { name, email, phone, address, password } = req.body;
      const emailExist = await DoctorModel.findOne({ email: email });
      if (!emailExist) {
        const hashPassword = await bcrypt.hash(password, 10);
        const saveDoctor = {
          name: name,
          email: email.toLowerCase(),
          password: hashPassword,
          phone,
          address,
          isDoctor: true,
          isPatient: false,
          isAdmin: false,
          emailToken: crypto.randomBytes(64).toString("hex"),
        };
        await DoctorModel.create(saveDoctor).then((data) => {
          if (data) {
            var mailOption = {
              from: ` "verify your email" <vipinm500@gmail.com> `,
              to: data.email,
              subject: "hello please verify your email",
              html: `<h2> ${data.name} thanks for registering </h2>
                        <h4>please verify ypu emmail and continue....</h4>
                        <a href="http://${req.headers.host}/user/verify-email?token=${data.emailToken}">verify email</a>`,
            };

            transporter.sendMail(mailOption, function (err, info) {
              if (err) {
                console.log(err);
              } else {
                res.send({
                  data: { name: data.name },
                  message:
                    "New Doctor Added Successfully, please verify doctors email and they can access the account",
                });
              }
            });
          } else {
            res.send({ data: null, message: "new Doctor cannot added" });
          }
        });
      } else {
        res.status(409).send({ data: null, message: "email already exist" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

////////////////////////////////////////////////////////////////////////////

router.get("/list-doctors",asyncHandler( async(req,res)=>{
  try {
    const doctorData = await DoctorModel.find()
    if(doctorData){
      res.status(200).send({data:doctorData, message:"doctor data fetch successfully"})
    }else{
      res.status(401).send({data:null, message:"doctors data cannot fetch"})
    }
    
  } catch (error) {
    res.status(500).send({data:null,message:"internal server down"})
  }
}))
////////////////////////////////////////////////////////////////////////////

router.patch("/unblock-doctor",asyncHandler( async(req,res)=>{
  try {
    await DoctorModel.updateOne({_id:req.body.id},{$set:{isBlocked:false}}).then((data)=>{
      res.status(200).send({data:data, message:"unblocked"})
    })
    
  } catch (error) {
    res.status(500).send({message:"internal server error"})
  }
}))
////////////////////////////////////////////////////////////////////////////
router.patch("/block-doctor",asyncHandler( async(req,res)=>{
  try { 
    await DoctorModel.updateOne({_id:req.body.id},{$set:{isBlocked:true}}).then((data)=>{
      res.status(200).send({data:data, message:"blocked"}) 
    })
    
  } catch (error) {
    res.status(500).send({message:"internal server error"})
  }
}))
////////////////////////////////////////////////////////////////////////////

router.get("/fetch-doctor/:id",asyncHandler( async(req,res)=>{
  try {
    const doctoData = await DoctorModel.findOne({_id:req.params.id})
    if(doctoData){
      res.status(200).send({data:doctoData, message:"doctor data fetch successfully"})
    }else{
      res.status(400).send({data:null,message:"cannot load data"})
    }
  } catch (error) {
    res.status(500).send({data:null,message:"internal server down"})
  }
}))

////////////////////////////////////////////////////////////////////////////

router.put("/update-doctor/:id", asyncHandler( async(req,res)=>{
  try {
    const { name, email, address, phone } = req.body
    const updateDoctor={
      name,email: email.toLowerCase(),address,phone
    }
   await DoctorModel.updateOne({_id:req.params.id},{$set:updateDoctor}).then(data=>{
    res.status(200).send({data:null,message:"doctor data updated successfully"})
   }).catch(Error=>{
    res.status(401).send({data:null, message:`doctor data cannot updated ${Error.message}`})
   })
  } catch (error) {
    res.status(200).send({data:null, message:"internal server down"})
  }
}))

////////////////////////////////////////////////////////////////////////////

router.get("/fetch-patients", asyncHandler( async(req,res)=>{
  try {
    const patientData = await PatientModel.find()
  if(patientData){
    res.status(200).send({data:patientData, message:"patients data fetched successfully"})
  }else{
    res.status(401).send({data:null, message:"patient data cannot fetch"})
  }
  } catch (error) {
   res.status(500).send({data:null, message:"internal server dowwn"}) 
  }
}))

////////////////////////////////////////////////////////////////////////////

router.patch("/block-patient", asyncHandler ( async (req,res)=>{
  try {
    await PatientModel.updateOne({_id:req.body.id},{$set:{isBlocked:true}}).then((data)=>{
      if(data.modifiedCount===1){
        res.status(200).send({data:null,message:"patients blocked ....!"})
      }else{
        res.status(401).send({data:null,message:"oops something wrong1.....!"})
      }
    }).catch((error)=>{
      res.status(401).send({data:null,message:"oops something wrong2.....!"})
    })
  } catch (error) {
    res.status(500).send({data:null, message:"internal server down"})
  }
}))

////////////////////////////////////////////////////////////////////////////

router.patch("/unblock-patient", asyncHandler ( async (req,res)=>{
  try {
    await PatientModel.updateOne({_id: req.body.id},{$set:{isBlocked:false}}).then((data)=>{
      if(data.modifiedCount===1){
        res.status(200).send({data:null,message:"patients unblocked ....!"})
      }else{
        res.status(401).send({data:null,message:"oops something wrong11.....!"})
      }
    }).catch((error)=>{
      res.status(401).send({data:null,message:"oops something wrong22.....!"})
    })
    
  } catch (error) {
    res.status(500).send({data:null, message:"internal server down"})
  }
}))

////////////////////////////////////////////////////////////////////////////

router.get("/fetch-patient/:id", asyncHandler (async (req,res)=>{
  try {
    const patientData = await PatientModel.findOne({_id:req.params.id})
    if(patientData){
      res.status(200).send({data:patientData, message:"patient data fetched success"})
    }else{
      res.status(401).send({data:null, message:"oops something wrong...!!!"})
    }
    
  } catch (error) {
    res.status(500).send({data:null, message:"internal server down"})
  }
}))

////////////////////////////////////////////////////////////////////////////
router.put("/update-patient/:id", asyncHandler (async (req,res)=>{
  try {
    const {name,email,address,phone} = req.body
    const patientData = {
      name, email: email.toLowerCase(), address,phone
    }
    await PatientModel.updateOne({_id:req.params.id},{$set:patientData}).then(data=>{
      res.status(200).send({data:null, message:"updated successfully"})
    }).catch(error=>{
      res.status(404).send({data:null, message:"oops something wrong"})
    })
  } catch (error) {
    res.status(500).send({data:null, message:"internal server down"})
  }
}))


export default router;
