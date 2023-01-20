import express from "express"
import  {loginController, registerController} from "../controllers/users/userControllers"

export const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

