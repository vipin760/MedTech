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


app.use("/api/patients",patients_router)

app.listen(3000,()=>{
  console.log("connected");
})