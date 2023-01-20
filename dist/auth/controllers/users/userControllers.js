"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../helper/db"));
const register_Schema_1 = __importDefault(require("../../schema/register_Schema"));
//registraion endpoints
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try { //validation using joi
        const { error } = register_Schema_1.default.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "wrong credentials" });
        }
        //request from the body
        const { username, email } = req.body;
        // const pool = await mssql.connect(sqlConfig);
        //generating an id
        const id = (0, uuid_1.v4)();
        //generating a salt
        const salt = yield bcrypt_1.default.genSalt(10);
        const password = yield bcrypt_1.default.hash(req.body.password, salt);
        //connecting to the database
        // excuting procedures
        const registration = yield db_1.default.exec("signUp", {
            id,
            username,
            email,
            password
        });
        // console.log({registration});
        return res.status(200).json(registration);
    }
    catch (error) {
        return res.status(500).json(console.log(error)
        // message: error.message
        );
    }
});
exports.registerController = registerController;
// login endpoints
// export const loginController = (req: Request, res: Response)=>{
//   try {
//   } catch (error) {
//   }
// }
