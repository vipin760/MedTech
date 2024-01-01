import { Router, Request, Response } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constant.ts/http_status";
import bcrypt from "bcryptjs";
import { PatientModel } from "./model";
import { Patient_Register } from "../shared/interface/patient.interface";
import { PatientTokenModel } from "../shared/model/patientToken.model";
import { IPatientToken } from "../shared/interface/patient.interface";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { AppointmentModel, DoctorModel } from "../doctor/model";
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
        if (patientData.verified) {
          if (patientData.isBlocked) {
            res
              .status(HTTP_BAD_REQUEST)
              .send({
                data: null,
                message:
                  "in these account blocked please contact admin immediately",
              });
          } else {
            res.status(200).send(generateToken(patientData));
          }
        } else {
          res
            .status(HTTP_BAD_REQUEST)
            .send({
              data: null,
              message: "please verify your mail then after you can login",
            });
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
  const patientDetails = {
    _id: patientData._id,
    name: patientData.name,
    email: patientData.email,
    token: token,
  };
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
  service: "gmail",
  auth: {
    user: "vipinm500@gmail.com",
    pass: process.env.REGISTER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      console.log("working",process.env.REGISTER_PASSWORD)
      const { name, email, password, phone } = req.body;
      console.log(req.body)
      const isEmail = await PatientModel.findOne({ email: email });
      if (!isEmail) {
        const passwordHash = await bcrypt.hash(password, 10);
        const newPatient: Patient_Register = {
          name,
          email: email.toLowerCase(),
          password: passwordHash,
          phone: phone,
          isPatient: true,
          emailToken: crypto.randomBytes(64).toString("hex"),
          isVerified: false,
        };

        await PatientModel.create(newPatient).then(patientSave=>{
          var mailOption = {
            from: ` "verify your email" <vipinm500@gmail.com> `,
            to: patientSave.email,
            subject: "hello please verify your email",
            html: `<h2> ${patientSave.name} thanks for registering </h2>
            <h4>please verify your email and continue....</h4>
            <a href="http://${req.headers.host}/api/patients/verify-email?token=${patientSave.emailToken}">verify email</a>`,
          };
          transporter.sendMail(mailOption, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("verification email send to your account");
              res
                .status(200)
                .send({
                  data: null,
                  message: "verification email send to your account",
                });
            }
          });
          
        })
        
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

router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const patient = await PatientModel.findOne({ emailToken: token });
    if (patient) {
      patient.emailToken = "";
      patient.verified = true;
      await patient.save();
      res.redirect("http://localhost:4200");
    }
  } catch (error) {
    console.log(error);
  }
});
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

  patient.token = token;
  return patient;
};
////////////////////////////////////////////////////////////////////////////////////////////

router.post(
  "/forget-password",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      console.log("forget password success 2");
      const patientData = await PatientModel.findOne({ email: req.body.email });
      const token = jwt.sign(
        { id: patientData?.id, email: patientData?.email },
        "thisrandom",
        { expiresIn: "30min" }
      );
      if (patientData && token) {
        console.log("forget password success 2");
        var mailOption = {
          from: ` "Reset password" <vipinm500@gmail.com> `,
          to: patientData.email,
          subject: "hello please Reset Password",
          html: `<h2> ${patientData.name} reset your password make strong</h2>
            <h4>please reset password and continue</h4>
            <a href="http://localhost:4200/reset-password/${token}">reset password</a>`,
        };
        transporter.sendMail(mailOption, function (err, info) {
          if (err) {
            console.log(err);
            res
              .status(400)
              .json("Oops some happened wrong please try after some times");
          } else {
            console.log("verification email send to your account");
            res
              .status(200)
              .json(
                "reset password send in your providing email please reset now valid only 30 minutes"
              );
          }
        });
      } else {
        res
          .status(404)
          .json(
            "the request resource associated with the provided email address could not be find"
          );
      }
    } catch (error) {
      res.status(500).json("internal server down");
    }
  })
);
////////////////////////////////////////////////////////////////////////////////////////////
router.patch(
  "/reset-password/:id",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const token = req.params.id;
      const { password, cpassword } = req.body;
      const decodeToken: any = jwt.verify(token, "thisrandom");
      const patientData = await PatientModel.findOne({ _id: decodeToken.id });
      if (patientData) {
        const passwordHash = await bcrypt.hash(password, 10);
        await PatientModel.updateOne(
          { email: patientData.email },
          { $set: { password: passwordHash } }
        ).then((data) => {
          if (data.modifiedCount === 1) {
            res.status(200).json("password reset successfully");
          } else {
            res
              .status(404)
              .json("password cannot reset please try after sometimes");
          }
        });
      } else {
        res.status(404).json("token exiredpatient");
      }
    } catch (error) {
      res.status(500).json("token expired");
    }
  })
);
////////////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/fetch-appointment-doctorsList",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await AppointmentModel.aggregate([{$lookup:{from:"doctors",localField:"doctorId",foreignField:"_id",as:"doctor"}}])
      console.log(result)
    } catch (error) {
      res.status(500).send({ data: null, message: "internal server down" });
    }
  })
);
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
export default router;
