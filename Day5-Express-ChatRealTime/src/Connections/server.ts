import { EventEmitter } from "events";
import express from "express";
import * as http from "http";
const eventEmitter = new EventEmitter();
const serverPort = express();
const server = http.createServer(serverPort);
eventEmitter.on("startServer", async () => {
  try {
    server.listen(3000, () => {
      console.log("Port running in port 3000.....");
    });
  } catch (error: any) {
    console.log(error.message);
  }
});
export { server, eventEmitter, serverPort };
