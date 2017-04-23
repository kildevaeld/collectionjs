"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventsjs_1 = require("eventsjs");
const orange_1 = require("orange");
class BaseObject extends eventsjs_1.EventEmitter {
}
BaseObject.extend = function (proto, stat) {
    return orange_1.inherits(this, proto, stat);
};
exports.BaseObject = BaseObject;
