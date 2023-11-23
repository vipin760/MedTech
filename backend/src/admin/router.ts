import {Router} from 'express'
import { sample_users } from '../data'
import jwt from 'jsonwebtoken' 
import { Admin } from '../shared/model/admin.model'

const router = Router()
/////////////////////////////////////////////////////////////////////////////

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    const adminData:Admin = sample_users.find(admin => email === admin.email && password ===admin.password)
    if(adminData){
        res.status(200).send(generateToken(adminData))
    }else{
        res.status(404).send({message:"admin not found here", data:null})
    }
})

const generateToken=(admin:Admin)=>{
 const token = jwt.sign({email:admin.email,isAdmin:admin.isAdmin},"randomkey",{expiresIn:"30d"})
 admin.token = token
 console.log(admin);
 
 return admin
}
////////////////////////////////////////////////////////////////////////////




export default router