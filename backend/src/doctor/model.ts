import { Schema, model } from "mongoose";
import { IPostDoctor } from "../admin/shared/interface/IPostdoctor";
import { EatingTime, IPrescription } from "../shared/interface/prescription.interface";

const DoctorSchema = new Schema<IPostDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, require: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, required: true },
    isDoctor: { type: Boolean, required: true },
    isPatient: { type: Boolean, require: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, required: false },
    emailToken: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const eatingTimeSchema = new Schema<EatingTime>({
    mealTime:{type:String,enum:['Morning','AfterNoon','Evening','Night'],required:true},
    beforeFood:{type:Boolean, required:true}
})

const PrescriptionSchema = new Schema<IPrescription>({
  medicineName: {type: String,required: true},
  patientId: {type: String, required: true},
  doctorId: {type: String, required: true},
  quantity:{type:Number, required: true},
  eatingTimes:[eatingTimeSchema],
},{
    timestamps:true,
    toJSON: {
        virtuals: true,
    },
    toObject:{
        virtuals:true
    }
});

export const DoctorModel = model<IPostDoctor>("doctors", DoctorSchema);
export const PrescriptionModel = model<IPrescription>("prescription",PrescriptionSchema) 