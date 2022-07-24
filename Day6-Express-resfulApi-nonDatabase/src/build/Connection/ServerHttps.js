"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventEmitter = exports.app = void 0;
const path = __importStar(require("path"));
const events_1 = require("events");
const express_1 = __importDefault(require("express"));
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const app = (0, express_1.default)();
exports.app = app;
let privateKey = fs.readFileSync(path.join(__dirname, "../certs/selfsigned.key"), 'utf8');
let certificate = fs.readFileSync(path.join(__dirname, "../certs/selfsigned.crt"), 'utf8');
let credentials = { key: privateKey, cert: certificate };
const eventEmitter = new events_1.EventEmitter();
exports.eventEmitter = eventEmitter;
eventEmitter.on("start-server", () => {
    let ports = 8443 || process.env.Port;
    https.createServer(credentials, app);
    app.listen(ports, () => {
        console.log(`Port listening in port ${ports} ...`);
    });
});
