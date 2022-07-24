"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HandleJson(params) {
    params = params.substring(1, params.length - 1);
    console.log(params);
    return params;
}
exports.default = HandleJson;
