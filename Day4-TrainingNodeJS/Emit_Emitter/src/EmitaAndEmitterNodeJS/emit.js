"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    constructor() {
        this.emmit = {};
        this.on = (type, listener) => {
            this.emmit[type] = this.emmit[type] || [];
            this.emmit[type].push(listener);
        };
        this.emit = (type) => {
            if (this.emmit[type]) {
                this.emmit[type].forEach((element) => {
                    element();
                });
            }
            else {
                console.log("dosen't contain emmit");
            }
        };
    }
}
exports.default = Emitter;
