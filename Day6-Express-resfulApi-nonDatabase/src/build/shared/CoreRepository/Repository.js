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
exports.Repository = void 0;
const AutoGenKeys_1 = __importDefault(require("../../Common/AutoGenKeys"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Repository {
    constructor(modelName) {
        this.pathDB = path_1.default.join(__dirname, "../../database/Database.json");
        this.objList = {};
        this.database = {};
        this._modelName = "";
        this.CreateAsync = (item) => __awaiter(this, void 0, void 0, function* () {
            let idKeys = (0, AutoGenKeys_1.default)(10);
            this.objList[idKeys] = item;
            let db = yield fs_1.default.readFileSync(this.pathDB, 'utf-8');
            if (db == '') {
                this.database[this._modelName] = this.objList;
                fs_1.default.appendFileSync(this.pathDB, JSON.stringify(this.database));
            }
            else {
                let convertDBToJson = JSON.parse(db);
                let readContentObj = convertDBToJson[this._modelName];
                this.database[this._modelName] = readContentObj;
                this.database[this._modelName] = this.objList;
                yield fs_1.default.writeFileSync(this.pathDB, JSON.stringify(this.database));
            }
            return Promise.resolve(this.objList);
        });
        this.UpdateAsync = (item, id) => __awaiter(this, void 0, void 0, function* () {
            let db = yield fs_1.default.readFileSync(this.pathDB, 'utf-8');
            let resultWithModelName = JSON.parse(db)[this._modelName];
            resultWithModelName[id] = item;
            this.database[this._modelName] = resultWithModelName;
            yield fs_1.default.writeFileSync(this.pathDB, JSON.stringify(this.database));
            return Promise.resolve(item);
        });
        this.RemoveAsync = (id) => __awaiter(this, void 0, void 0, function* () {
            let db = yield fs_1.default.readFileSync(this.pathDB, 'utf-8');
            let resultWithModelName = JSON.parse(db)[this._modelName];
            delete resultWithModelName[id];
            this.database[this._modelName] = resultWithModelName;
            yield fs_1.default.writeFileSync(this.pathDB, JSON.stringify(this.database));
            return Promise.resolve("item deleted !");
        });
        this.GetAllAsync = () => __awaiter(this, void 0, void 0, function* () {
            let db = yield fs_1.default.readFileSync(this.pathDB, 'utf-8');
            let result = JSON.parse(db)[this._modelName];
            return Promise.resolve(result);
        });
        this._modelName = modelName;
    }
}
exports.Repository = Repository;
