import express from 'express'
import cors from 'cors' 

const app = express()

app.get('/',(req,res)=>{
  res.send({message:"welcome"})
})

app.listen(3000,()=>{
  console.log("connected");
})