import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AdminModel } from "../admin/model";
import { IAdmin_token } from "../shared/interface/admin.interface";


async function AdminMiddleware(req:Request, res:Response, next:NextFunction){
     const token = req.header('authentication');
     console.log("token")
     console.log(token)
     if(token){
        next()
     }else{
        res.status(401).send({message:"invalid token"})
     } 
 }
export default AdminMiddleware



// async function AdminMiddleware(req:Request, res:Response, next:NextFunction){
//      const token = req.header('x-auth-token');
//      console.log("working 1")
//      if(token){
//         console.log("working 2")
//         try {
//             console.log("working 3")
//             const decoded = jwt.verify(token,"thisismysecretkey") as IAdmin
//             console.log(decoded)
//             console.log("working 4")
//             if(decoded){
//                 console.log(decoded)
//                 const adminData =await AdminModel.findOne({_id:decoded.id}) 
//                 console.log(adminData)
//                 if(adminData){
//                     next()
//                 }else{
//                     res.status(401).send({message:"token is not valid 1"})
//                 }
//             }else{
//                 res.status(401).send({message:"token is not valid decodeddd"})
//             }
//          } catch (error) {
//             res.status(401).send({message:"token is not valid 3"})
//          }
//      }
// }
