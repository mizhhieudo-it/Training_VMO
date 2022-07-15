"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emit_1 = __importDefault(require("./EmitaAndEmitterNodeJS/emit"));
const Emitter = new emit_1.default();
Emitter.on("good", () => {
    console.log("good job man");
});
Emitter.on("good", () => {
    console.log("bonus 1k$");
});
function isAchieveTarget(KPI) {
    if (KPI < 3000) {
        console.log("không đủ chỉ tiêu tháng !!! ");
    }
    else {
        console.log("Đã đạt chỉ tiêu !!!");
        Emitter.emit("good");
    }
}
isAchieveTarget(3000);
