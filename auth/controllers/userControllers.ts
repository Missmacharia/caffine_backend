import mssql from "mssql"
import sqlConfig from "../config/index"
import registerSchema from "../schema/register_Schema"

export const registerController = (req:Request, res: Response)=>{
    try {
        //validation using joi
        const {error}= registerSchema.validate(req.body)
        if(error){
            res.status(400).json({message: "wrong credentials"})
        }
    } catch (error) {
        
    }
}

