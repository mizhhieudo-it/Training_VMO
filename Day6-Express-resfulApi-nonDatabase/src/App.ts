import {app,eventEmitter } from "./Connection/ServerHttps";
import {Route} from "./Routes/MidRoute";
import { json } from "express";
eventEmitter.emit("start-server");
app.use(json());
Route(app);