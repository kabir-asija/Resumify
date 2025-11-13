import mongoose from 'mongoose'

export const connectDB=async()=>{
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(()=>console.log("DB CONNECTED"))
    .catch((err)=>console.log("Error: "+err))
}