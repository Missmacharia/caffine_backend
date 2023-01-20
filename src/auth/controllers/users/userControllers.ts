import express, { Request, Response } from "express";
import mssql from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../../helper/db";
import sqlConfig from "../../config/index";
import registerSchema from "../../schema/register_Schema";
import loginSchema from "../../schema/login_Schema";
import jwt from "jsonwebtoken";

//registraion endpoints
export const registerController = async (req: Request, res: Response) => {
  try {
    //validation using joi
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "wrong credentials" });
    }
    //request from the body
    const { username, email } = req.body;

    // const pool = await mssql.connect(sqlConfig);
    //generating an id
    const id = v4();
    //generating a salt
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    //connecting to the database
    // excuting procedures
    const registration = await (
      await db.exec("signUp", {
        id,
        username,
        email,
        password,
      })
    )?.recordsets;

    // console.log(registration);
    return res.status(200).json(registration);
  } catch (error: any) {
    return res.status(500).json(
      console.log(error)

      // message: error.message
    );
  }
};

//login controllers
export const loginController = async (req: Request, res: Response) => {
  try {
    //validating the logins
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        meassage: "Wrong Credentials!",
      });
    }
    //data from the body

    const { email, password } = req.body;
    
    //connecting to the database
    const result = await (await db.exec("login", { email }))?.recordsets;
    //comparing the password
    res.status(200).json(result)
    const validPassword = await bcrypt.compare(password, password);
    if (!validPassword) {
      return res.status(400).json({
        mesasge: "Wrong Credentials!",
      });
    } else {
      //generating a token
      const token = await jwt.sign({ email }, "SECRET", {
        expiresIn: "24h",
      });
      return res.status(200).json({email, token});
    }
  } catch (error) {
    return res.status(500).json(
      console.log(error)
    )
  }
};
