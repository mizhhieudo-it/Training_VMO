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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const Repository_1 = require("../shared/CoreRepository/Repository");
class BookController {
    constructor() {
        this.createAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let item = req.body;
            let resultCreate = yield this._bookRepo.CreateAsync(item);
            return res.status(200).send(resultCreate);
        });
        this.getAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let resultCreate = yield this._bookRepo.GetAllAsync();
            return res.status(200).send(resultCreate);
        });
        this.updateAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let item = req.body;
            let resultUpdate = yield this._bookRepo.UpdateAsync(item, id);
            return res.status(200).send(resultUpdate);
        });
        this.deleteAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let resultUpdate = yield this._bookRepo.RemoveAsync(id);
            return res.status(200).send(resultUpdate);
        });
        this._bookRepo = new Repository_1.Repository("BookCollection");
    }
}
exports.Books = new BookController();
