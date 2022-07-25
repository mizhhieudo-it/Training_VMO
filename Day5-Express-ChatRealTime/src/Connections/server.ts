import { EventEmitter } from "events";
import express from "express";
import * as https from "https";
const eventEmitter = new EventEmitter();
const serverPort = express();
const server = https.createServer(serverPort);
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
