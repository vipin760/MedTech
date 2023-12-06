import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { Admin } from "../shared/model/admin.model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { DoctorModel } from "../doctor/model";
import { IPostDoctor } from "./shared/interface/IPostdoctor";
import crypto from "crypto";
import nodemailer from "nodemailer";
import cookie from "cookie-parser";

const router = Router();
/////////////////////////////////////////////////////////////////////////////

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const adminData: Admin = sample_users.find(
    (admin) => email === admin.email && password === admin.password
  );
  if (adminData) {
    res.status(200).send(generateToken(adminData));
  } else {
    res.status(404).send({ message: "admin not found here", data: null });
  }
});

const generateToken = (admin: Admin) => {
  const token = jwt.sign(
    { email: admin.email, isAdmin: admin.isAdmin },
    "randomkey",
    { expiresIn: "30d" }
  );
  admin.token = token;

  return admin;
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
      console.log("req.body",typeof req.body.phone)
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
    const us = await DoctorModel.findOne({_id:req.body.id}) 
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
    console.log(req.params.id,typeof req.params.id)
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

export default router;
