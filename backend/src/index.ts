import express from 'express'
import cors from 'cors' 
import dotenv from 'dotenv'
dotenv.config()
const app = express()
import { dbConnect } from './config/config'
//routes
import patients_router from './patients/router'
import admin_router from './admin/router'
import doctor_router from './doctor/router'

dbConnect()
app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}))
app.use(express.json())




app.use("/api/patients",patients_router)
app.use("/api/admin",admin_router)
app.use("/api/doctor",doctor_router);
// app.get("/api/doctor",(req,res)=>{
//   res.status(200).send({message:"response success"})
// });

app.listen(3000,()=>{
  console.log("server connected");
}) 