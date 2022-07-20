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
const server_1 = require("./Connections/server");
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const socket_io_1 = require("socket.io");
// import Peer from "peerjs";
// const peerServer = new Peer(server);
let roomID = null;
server_1.eventEmitter.emit("startServer");
server_1.serverPort.use(express_1.default.static("public"));
server_1.serverPort.set("view engine", "ejs");
const PathFileView = path.join(__dirname, "../Views/room-chat.ejs");
// auto generate port
server_1.serverPort.get("/", (req, res) => {
    res.redirect(`/${(0, uuid_1.v4)()}`);
    // res.render(PathFileView);
});
// redict to port
server_1.serverPort.get("/:idRoom", (req, res) => {
    res.render(PathFileView, { Room: req.params.idRoom });
});
const io = new socket_io_1.Server(server_1.server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    socket.on("mgs-from-client", (data) => {
        //io.emit("mgs-from-server", data);
        roomID = data.idRoom;
        socket.join(data.idRoom); // join  vào 1 rom
        // redict to room
        io.to(data.idRoom).emit("mgs-from-server", data);
        // console.log(data.content);
        //socket.to(data.idRoom).emit("mgs-from-server", data);
    });
    socket.on("sent-id-room", (id) => {
        roomID = id;
    });
    socket.on("sent-id-client", (idClient) => {
        console.log("Client connect id: ", idClient);
        console.log("Room id:", roomID);
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("sent-id-caller", idClient);
    });
});
// register event connection
