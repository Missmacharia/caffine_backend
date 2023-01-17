import express from "express"
import dotenv from "dotenv"
import mssql from "mssql"
import cors from "cors"

import routes from "./routes/caffine_routes"

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', routes)

app.listen(4000,()=>{
    console.log("server is running on 4000");
    
})