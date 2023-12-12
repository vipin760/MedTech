import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constant.ts/http_status";
import bcrypt from "bcryptjs";
import { PatientModel } from "./model";
import { Patient_Register } from "../shared/interface/patient.interface";
import { PatientTokenModel } from "../shared/model/patientToken.model";
import { IPatientToken } from '../shared/interface/patient.interface'
import nodemailer from 'nodemailer';
import crypto from 'crypto';
const router = Router();

////////////////////////////////////////////////////////////////////////////////////////////
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const patientData = await PatientModel.findOne({ email: email });

      if (
        patientData &&
        (await bcrypt.compare(password, patientData?.password))
      ) {
        if(patientData.verified){
          if(patientData.isBlocked){
            res
            .status(HTTP_BAD_REQUEST)
            .send({ data: null, message: "in these account blocked please contact admin immediately" });
          }else{
            res.status(200).send(generateToken(patientData));
          }
        }else{
          res
          .status(HTTP_BAD_REQUEST)
          .send({ data: null, message: "please verify your mail then after you can login" });

        }

       
      } else {
        res
          .status(HTTP_BAD_REQUEST)
          .send({ data: null, message: "Invalid user name or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(HTTP_BAD_REQUEST)
        .send({ data: null, message: "Internal server error" });
    }
  })
);

const generateToken = (patientData: IPatientToken) => {

  const token = jwt.sign(
    { email: patientData.email, ispPtient: patientData.isPatient },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );
 const patientDetails={
    _id:patientData._id,
    name:patientData.name,
    email:patientData.email,
    token:token
  }
  return patientDetails;
}; 

////////////////////////////////////////////////////////////////////////////////////////////

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await PatientModel.countDocuments();

    if (userCount > 0) {
      res.send("seed is already done");
      return;
    }
    await PatientModel.create(sample_users);
    res.send("Seed is done");
  })
);
////////////////////////////////////////////////////////////////////////////////////////////
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
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const isEmail = await PatientModel.findOne({ email: email });
      if (!isEmail) {
        const passwordHash = await bcrypt.hash(password, 10);
        const newPatient: Patient_Register = {
          name,
          email: email.toLowerCase(),
          password: passwordHash,
          phone: phone,
          isPatient: true,emailToken: crypto.randomBytes(64).toString('hex'),isVerified:false
        };

        const patientSave = await PatientModel.create(newPatient);

        if(patientSave){
           // send verification email user
    console.log("req.headers.host",req.headers.host);
    var mailOption = {
        from:` "verify your email" <vipinm500@gmail.com> `,
        to:patientSave.email,
        subject:"hello please verify your email",
        html:`<h2> ${patientSave.name} thanks for registering </h2>
            <h4>please verify your email and continue....</h4>
            <a href="http://${req.headers.host}/api/patients/verify-email?token=${patientSave.emailToken}">verify email</a>`
    }
    transporter.sendMail(mailOption, function(err,info){
        if(err){ 
            console.log(err)  
        }else{
            console.log("verification email send to your account")
            res.status(200).send({data:null, message:"verification email send to your account"});
        }
    })
        }else{
          res.status(401).send({data:null, message:"data cannot saved please try after some times"});
        }


       
      } else {
        res
          .status(HTTP_BAD_REQUEST)
          .send({ data: null, message: "email is alreay registered" });
        return;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      res
        .status(HTTP_BAD_REQUEST)
        .send({ data: null, message: "Internal server error" });
    }
  })
);


router.get("/verify-email",async(req,res)=>{
  try {
      const token = req.query.token
      const patient = await PatientModel.findOne({emailToken:token})
      if(patient){
        patient.emailToken=''
        patient.verified=true 
          await patient.save()
          res.redirect("http://localhost:4200")
      }
      
  } catch (error) {
      console.log(error)
  }
})
////////////////////////////////////////////////////////////////////////////////////////////

const generateTokenResponse = (patient: PatientTokenModel) => {
  const token = jwt.sign(
    {
      email: patient.email,
      isPatient: patient.isPatient,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  ); 

 patient.token = token 
  return patient 
};
////////////////////////////////////////////////////////////////////////////////////////////

export default router;
