import { server, eventEmitter, serverPort } from "./Connections/server";
import express from "express";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Server } from "socket.io";
// import Peer from "peerjs";
// const peerServer = new Peer(server);
let roomID: any = null;
eventEmitter.emit("startServer");
serverPort.use(express.static("public"));
serverPort.set("view engine", "ejs");
const PathFileView = path.join(__dirname, "../Views/room-chat.ejs");
// auto generate port
serverPort.get("/", (req: Request, res: Response) => {
  res.redirect(`/${uuidv4()}`);
  // res.render(PathFileView);
});
// redict to port
serverPort.get("/:idRoom", (req, res) => {
  res.render(PathFileView, { Room: req.params.idRoom });
});

const io = new Server(server, {
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
