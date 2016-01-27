var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects_1 = require('utilities/lib/objects');
var collection_1 = require('./collection');
var promises_1 = require('utilities/lib/promises');
var persistence_1 = require('./persistence');
var PersistableCollection = (function (_super) {
    __extends(PersistableCollection, _super);
    function PersistableCollection(models, options) {
        if (options === void 0) { options = {}; }
        _super.call(this, models, options);
        if (options.url)
            this.url = options.url;
    }
    PersistableCollection.prototype.getURL = function () {
        return typeof this.url === 'function' ? this.url() : this.url;
    };
    PersistableCollection.prototype.fetch = function (options) {
        var _this = this;
        options = options ? objects_1.extend({}, options) : {};
        var url = this.getURL();
        if (url == null)
            return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        this.trigger('before:sync');
        return this.sync(persistence_1.RestMethod.Read, this, options)
            .then(function (results) {
            _this[options.reset ? 'reset' : 'set'](results, options);
            _this.trigger('sync');
            return _this;
        }).catch(function (e) {
            _this.trigger('error', e);
            throw e;
        });
    };
    PersistableCollection.prototype.create = function (value, options) {
        return null;
    };
    PersistableCollection.prototype.sync = function (method, model, options) {
        return persistence_1.sync(method, model, options);
    };
    return PersistableCollection;
})(collection_1.Collection);
exports.PersistableCollection = PersistableCollection;
