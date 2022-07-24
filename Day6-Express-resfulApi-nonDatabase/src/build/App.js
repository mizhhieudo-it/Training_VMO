"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerHttps_1 = require("./Connection/ServerHttps");
const MidRoute_1 = require("./Routes/MidRoute");
const express_1 = require("express");
ServerHttps_1.eventEmitter.emit("start-server");
ServerHttps_1.app.use((0, express_1.json)());
(0, MidRoute_1.Route)(ServerHttps_1.app);
