"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var eventsjs_1 = require("eventsjs");
var orange_1 = require("orange");

var BaseObject = (function (_eventsjs_1$EventEmitter) {
    _inherits(BaseObject, _eventsjs_1$EventEmitter);

    function BaseObject() {
        _classCallCheck(this, BaseObject);

        _get(Object.getPrototypeOf(BaseObject.prototype), "constructor", this).apply(this, arguments);
    }

    return BaseObject;
})(eventsjs_1.EventEmitter);

BaseObject.extend = function (proto, stat) {
    return orange_1.inherits(this, proto, stat);
};
exports.BaseObject = BaseObject;