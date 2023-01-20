import express from "express"
import dotenv from "dotenv"
import mssql from "mssql"
import cors from "cors"

// import routes from "./auth_routes/auth_routes"
import {router} from "./auth_routes/auth_routes"

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', router)

app.listen(process.env.PORT || 4000,()=>{
    console.log("server is running on 4000");
    
})