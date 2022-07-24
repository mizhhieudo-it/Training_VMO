"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Account_js_1 = require("../../Controllers/Account.js");
const Account_js_2 = require("../../utils/Validations/Validate/Account.js");
const routers = (0, express_1.Router)();
routers.post("/register", [Account_js_2.AccountValidate.CheckValidate], Account_js_1.AccountController.Register);
routers.post("/login", Account_js_1.AccountController.Login);
exports.default = routers;
