import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, PatientModel } from "./model";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constant.ts/http_status";
import { IUser } from "../shared/interface/user.interface";
import bcrypt from "bcryptjs";

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

const generateToken = (patientData: any) => {
  const token = jwt.sign(
    { email: patientData.email, is_admin: patientData.is_patient },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );
  patientData.token = token;
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
        const newPatient: IUser = {
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

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  const userWithToken = {
    ...user.toObject(), // Convert the Mongoose document to a plain JavaScript object
    token: token,
  };
  // user.token = token
  return userWithToken;
};
////////////////////////////////////////////////////////////////////////////////////////////

export default router;
