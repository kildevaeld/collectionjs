var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('./collection');
var PersistableCollection = (function (_super) {
    __extends(PersistableCollection, _super);
    function PersistableCollection(models, options) {
        _super.call(this);
    }
    PersistableCollection.prototype.fetch = function () {
        return null;
    };
    PersistableCollection.prototype.create = function (value, options) {
        return null;
    };
    return PersistableCollection;
})(collection_1.Collection);
exports.PersistableCollection = PersistableCollection;
