import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
dotenv.config();
connectDB();
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})