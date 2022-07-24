import * as path from "path";
import { EventEmitter } from "events";
import express from "express";
import * as https from "https";
import * as fs from "fs";
import {envReadFiles} from "../configs/configs";
const app = express();
let privateKey  = fs.readFileSync(path.join(__dirname,"../certs/selfsigned.key"), 'utf8');
let certificate = fs.readFileSync(path.join(__dirname,"../certs/selfsigned.crt"), 'utf8');
let credentials = {key: privateKey, cert: certificate};
const eventEmitter = new EventEmitter();
eventEmitter.on("start-server",()=>
{
    let ports = 8443 || process.env.Port;
    https.createServer(credentials,app);
    app.listen(ports,()=>{
        console.log(`Port listening in port ${ports} ...`);
    })
})
export {
    app,
    eventEmitter
}