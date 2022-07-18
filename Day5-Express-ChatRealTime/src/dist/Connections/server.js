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
exports.eventEmitter = exports.serverPort = void 0;
const events_1 = require("events");
const express_1 = __importDefault(require("express"));
const eventEmitter = new events_1.EventEmitter();
exports.eventEmitter = eventEmitter;
const serverPort = (0, express_1.default)();
exports.serverPort = serverPort;
eventEmitter.on("startServer", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        serverPort.listen(3699, () => {
            console.log("Port running in port 3699.....");
        });
    }
    catch (error) {
        console.log(error.message);
    }
}));
