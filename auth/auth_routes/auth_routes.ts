import express, { application } from "express"
import  registerController from "../controllers/userControllers"

const router = express.Router()

router.post("/register", registerController)

export default router