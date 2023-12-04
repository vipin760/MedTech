import {Schema, model} from "mongoose";
import { IPostDoctor } from "../admin/shared/interface/IPostdoctor";

const DoctorSchema =new Schema<IPostDoctor>({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    address:{type:String, require:true},
    password:{type:String, required:true},
    verified:{type:Boolean, default:false},
    isAdmin:{type:Boolean, required:true},
    isDoctor:{type:Boolean, required:true},
    isPatient:{type:Boolean, require:true},
    isBlocked:{type:Boolean, default:false},
    isDeleted:{type:Boolean, required:false},
    emailToken:{type:String}
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    
})

export const DoctorModel = model<IPostDoctor>('doctors',DoctorSchema)