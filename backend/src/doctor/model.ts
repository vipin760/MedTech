import { Schema, model } from "mongoose";
import { IAppointment, IDoctor, ISlot } from "../shared/interface/doctor.interface";


///////////////////////////////////////////////////////////////////////////////////////////
const slotSchema=new Schema<ISlot>({
  date:{ type:String},
  time:{ type:String},
  booked:{ type:Boolean, default:false},
  patientId:{ type:Object},
  prescritionId:{ type:Object}
})

const appointmentSchema = new Schema<IAppointment>({
  doctorId:{ type:Object,required:true},
  slot:[slotSchema]
})
export const AppointmentModel = model<IAppointment>("appointments",appointmentSchema)
/////////////////////////////////////////////////////////////////////////////////////////// 
const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, require: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default:false },
    isDoctor: { type: Boolean, default:false },
    isPatient: { type: Boolean,  default:false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, required: false },
    isApproved: { type:Boolean, default:false},
    emailToken: { type: String }
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
 export const DoctorModel = model<IDoctor>("doctors", DoctorSchema);
///////////////////////////////////////////////////////////////////////////////////////////

// const eatingTimeSchema = new Schema<EatingTime>({
//     mealTime:{type:String,enum:['Morning','AfterNoon','Evening','Night'],required:true},
//     beforeFood:{type:Boolean, required:true}
// })

// const PrescriptionSchema = new Schema<IPrescription>({
//   medicineName: {type: String,required: true},
//   patientId: {type: String, required: true},
//   doctorId: {type: String, required: true},
//   quantity:{type:Number, required: true},
//   eatingTimes:[eatingTimeSchema],
// },{
//     timestamps:true,
//     toJSON: {
//         virtuals: true,
//     },
//     toObject:{
//         virtuals:true
//     }
// });


// export const PrescriptionModel = model<IPrescription>("prescription",PrescriptionSchema) 