"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const AutoGenKeys_1 = __importDefault(require("../../Common/AutoGenKeys"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const HandlerStringJson_1 = __importDefault(require("../../Services/HandlerStringJson"));
class Repository {
    constructor() {
        this.pathDB = path_1.default.join(__dirname, "../../database/Database.json");
        this.objList = {};
        this.database = {};
    }
    CreateAsync(item) {
        let idKeys = (0, AutoGenKeys_1.default)(10);
        this.objList[idKeys] = item;
        let customizeObject = (0, HandlerStringJson_1.default)(JSON.stringify(this.objList));
        this.database = customizeObject;
        fs_1.default.appendFileSync(this.pathDB, this.database);
        return Promise.resolve(this.objList);
    }
    UpdateAsync(item) {
        throw new Error("Method not implemented.");
    }
    RemoveAsync(id) {
        throw new Error("Method not implemented.");
    }
    GetAllAsync() {
        throw new Error("Method not implemented.");
    }
}
exports.Repository = Repository;
