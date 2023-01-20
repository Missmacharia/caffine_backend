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
exports.loginController = exports.registerController = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../helper/db"));
const register_Schema_1 = __importDefault(require("../../schema/register_Schema"));
const login_Schema_1 = __importDefault(require("../../schema/login_Schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//registraion endpoints
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //validation using joi
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
        const registration = yield ((_a = (yield db_1.default.exec("signUp", {
            id,
            username,
            email,
            password,
        }))) === null || _a === void 0 ? void 0 : _a.recordsets);
        // console.log(registration);
        return res.status(200).json(registration);
    }
    catch (error) {
        return res.status(500).json(console.log(error)
        // message: error.message
        );
    }
});
exports.registerController = registerController;
//login controllers
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        //validating the logins
        const { error } = login_Schema_1.default.validate(req.body);
        if (error) {
            return res.status(400).json({
                meassage: "Wrong Credentials!",
            });
        }
        //data from the body
        const { email, password } = req.body;
        //connecting to the database
        const result = yield ((_b = (yield db_1.default.exec("login", { email }))) === null || _b === void 0 ? void 0 : _b.recordsets);
        //comparing the password
        res.status(200).json(result);
        const validPassword = yield bcrypt_1.default.compare(password, password);
        if (!validPassword) {
            return res.status(400).json({
                mesasge: "Wrong Credentials!",
            });
        }
        else {
            //generating a token
            const token = yield jsonwebtoken_1.default.sign({ email }, "SECRET", {
                expiresIn: "24h",
            });
            return res.status(200).json({ email, token });
        }
    }
    catch (error) {
        return res.status(500).json(console.log(error));
    }
});
exports.loginController = loginController;
