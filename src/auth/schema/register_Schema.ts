import joi from "joi"

const registerSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})

export default registerSchema