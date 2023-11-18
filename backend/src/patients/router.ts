import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken'

const router = Router()
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/login',(req,res)=>{
    const {email, password} = req.body
    const user = sample_users.find(user=> user.email === email && user.password === password)
    if(user){

       res.status(200).send(generateToken(user))
    }else{
       res.status(404).send("invalid user")
    }
}) 

const generateToken = (user:any)=>{
   const token = jwt.sign({email:user.email, is_admin: user.is_admin },"randomkey",{expiresIn:"30d"})
   user.token = token
   return user

}

////////////////////////////////////////////////////////////////////////////////////////////


export default router
