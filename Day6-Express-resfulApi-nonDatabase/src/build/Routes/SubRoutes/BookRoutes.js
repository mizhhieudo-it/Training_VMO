"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BookController_1 = require("../../Controllers/BookController");
const routers = (0, express_1.Router)();
routers.post("/create", BookController_1.Books.createAsync);
exports.default = routers;
