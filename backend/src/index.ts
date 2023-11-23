import express from 'express'
import cors from 'cors' 

const app = express()
app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}))
app.use(express.json())

//routes
import patients_router from './patients/router'
import admin_router from './admin/router'
import doctor_router from './doctor/router'

app.use("/api/patients",patients_router)
app.use("/api/admin",admin_router)
app.use("/api/doctor",doctor_router);


app.listen(3000,()=>{
  console.log("connected");
}) 