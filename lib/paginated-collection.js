var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var eventsjs_1 = require('eventsjs');
var PaginatedCollection = (function (_super) {
    __extends(PaginatedCollection, _super);
    function PaginatedCollection(models, options) {
        _super.call(this);
    }
    Object.defineProperty(PaginatedCollection.prototype, "length", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    PaginatedCollection.prototype.indexOf = function (item) {
    };
    PaginatedCollection.prototype.forEach = function (fn) {
    };
    PaginatedCollection.prototype.push = function (item) {
    };
    return PaginatedCollection;
})(eventsjs_1.EventEmitter);
exports.PaginatedCollection = PaginatedCollection;
