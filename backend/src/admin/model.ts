import {Schema, model} from 'mongoose';
import { IAdmin } from '../shared/interface/admin.interface';



export const AdminSchema = new Schema<IAdmin>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String},
    phone:{type:Number, required:true},
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

export const AdminModel = model<IAdmin>('admin', AdminSchema); 