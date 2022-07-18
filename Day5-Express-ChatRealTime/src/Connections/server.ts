import { EventEmitter } from "events";
import express from "express";
const eventEmitter = new EventEmitter();
const serverPort = express();
eventEmitter.on("startServer", async () => {
  try {
    serverPort.listen(3699, () => {
      console.log("Port running in port 3699.....");
    });
  } catch (error: any) {
    console.log(error.message);
  }
});
export { serverPort, eventEmitter };
