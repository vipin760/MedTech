import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constant.ts/http_status";
import { IPatient } from "../shared/interface/patient.interface";
import bcrypt from "bcryptjs";
import { PatientModel } from "./model";
import { Patient_Register } from "../shared/interface/patient_Register.interface";
import { PatientToken } from "../shared/interface/pateintToken";
import { PatientTokenModel } from "../shared/model/patientToken.model";

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
        res.status(200).send(generateToken(patientData));
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
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvY3RvcjEyMzRAZ21haWwuY29tIiwiaXNQYXRpZW50Ijp0cnVlLCJpYXQiOjE3MDA4NDgwMDgsImV4cCI6MTcwMzQ0MDAwOH0.XmAgigthfwj5TD4CJhdXPsmDwzgNM-s0JwF6QtoSIhc
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvY3RvcjEyMzRAZ21haWwuY29tIiwiaXNwUHRpZW50Ijp0cnVlLCJpYXQiOjE3MDA4NDgyMjksImV4cCI6MTcwMzQ0MDIyOX0.OBhLfdVW_xgwRrYgQL7vF1bcf7QMFY9R3_UTjX2fuhA
const generateToken = (patientData: PatientTokenModel) => {
  const token = jwt.sign(
    { email: patientData.email, ispPtient: patientData.isPatient },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );
  patientData.token = token;
  console.log("token",patientData);
  
  return patientData;
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
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const { name, email, password, address } = req.body;
      const isEmail = await PatientModel.findOne({ email: email });
      if (!isEmail) {
        const passwordHash = await bcrypt.hash(password, 10);
        const newPatient: Patient_Register = {
          name,
          email: email.toLowerCase(),
          password: passwordHash,
          address: address,
          isPatient: true, 
        };

        const patientSave = await PatientModel.create(newPatient);
        res.status(200).send(generateTokenResponse(patientSave));
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
