import {Schema, model} from 'mongoose';
import { IPatient } from '../shared/interface/patient.interface';



export const UserSchema = new Schema<IPatient>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    phone:{type:String, required:true},
    isAdmin: {type: Boolean, default:false},
    isPatient: {type: Boolean, default:false},
    isDoctor: {type: Boolean, default:false}, 
    token: {type:String, required:false},
    verified:{type:Boolean, default:false},
    isBlocked:{type:Boolean, default:false},
    isDeleted:{type:Boolean, default:false},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    
});

export const PatientModel = model<IPatient>('patients', UserSchema); 