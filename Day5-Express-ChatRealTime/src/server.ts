import { serverPort, eventEmitter } from "./Connections/server";
import express from "express";
import * as path from "path";
eventEmitter.emit("startServer");
serverPort.use(express.static("public"));
serverPort.set("view engine", "ejs");
const PathFileView = path.join(__dirname, "../Views/room-chat.ejs");
serverPort.get("/", (req, res) => {
  res.render(PathFileView);
});
