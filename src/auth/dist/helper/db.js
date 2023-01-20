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
const mssql_1 = __importDefault(require("mssql"));
const index_1 = __importDefault(require("../config/index"));
class DbConnection {
    constructor() {
        //connecting to the database
        this.pool = mssql_1.default.connect(index_1.default);
    }
    //classes are private to their classes
    createRequest(request, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = Object.keys(data);
                //maps through the keys
                keys.map((name) => {
                    const value = data[name];
                    request.input(name, value);
                });
                return request;
            }
            catch (error) {
                //  throw new error(error.message)
                console.log(error);
            }
        });
    }
    ;
    exec(procedure_name, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = yield (yield this.pool).request();
                this.createRequest(request, data);
                const result = yield (request === null || request === void 0 ? void 0 : request.execute(procedure_name));
                return result;
            }
            catch (error) {
                // throw new (error.message)
                console.log(error);
            }
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (yield this.pool).request().query(query);
            return result;
        });
    }
}
exports.default = new DbConnection();
