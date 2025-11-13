import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from 'path'
import { fileURLToPath } from "url";
import resumeRoutes from './routes/resumeRoutes.js'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);

app.use(
  '/uploads',
  express.static(path.join(__dirname,'uploads'),{
    setHeaders: (res,_path)=>{
      res.set('Access-Control-Allow-Origin',process.env.VITE_BACKEND_URL)
    }
  })
)

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App listening at Port ${process.env.PORT}`);
});
