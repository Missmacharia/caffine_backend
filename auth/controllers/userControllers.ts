import express, { Request, response } from "express";
import mssql from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../helper/db"
import sqlConfig from "../config/index";
import registerSchema from "../schema/register_Schema";

const registerController = async (req: Request, res: Response) => {
  try {
    //validation using joi
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return response.status(400).json({ message: "wrong credentials" });
    }
    //request from the body
    const { username, email } = req.body;
    //connecting to the database
    const pool = await mssql.connect(sqlConfig);
    //generating an id
    const id = v4();
    //generating a salt
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    await pool.request();
    // excuting procedures
    const registration= await (
      await db.exec("signUp",{
        id, 
        username,
        email
      })
    )
    // console.log({registration});
    return response.json(registration) 

  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};


export default registerController;
