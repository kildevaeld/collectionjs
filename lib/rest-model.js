"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects_1 = require('utilities/lib/objects');
var promises_1 = require('utilities/lib/promises');
var model_1 = require('./model');
var nested_model_1 = require('./nested-model');
var persistence_1 = require('./persistence');
function isRestModel(a) {
    if (a == null)
        return false;
    return (a instanceof model_1.Model) || a.__classType === 'RestModel';
}
exports.isRestModel = isRestModel;
function normalize_path(url, id) {
    var i, p = "";
    if ((i = url.indexOf('?')) >= 0) {
        p = url.substr(i);
        url = url.substr(0, i);
    }
    if (url[url.length - 1] !== '/')
        url += '/';
    return url + id + p;
}
exports.normalize_path = normalize_path;
var RestModel = (function (_super) {
    __extends(RestModel, _super);
    function RestModel(attr, options) {
        if (options === void 0) { options = {}; }
        _super.call(this, attr, options);
        this.idAttribute = 'id';
        if (options.url) {
            this.rootURL = options.url;
        }
    }
    Object.defineProperty(RestModel.prototype, "__classType", {
        get: function () { return 'RestModel'; },
        enumerable: true,
        configurable: true
    });
    ;
    RestModel.prototype.getURL = function (id) {
        var url = this.rootURL;
        if (this.collection && this.collection.getURL()) {
            url = this.collection.getURL();
        }
        id = id || this.id;
        if (id && url) {
            url = normalize_path(url, this.id);
        }
        return url;
    };
    RestModel.prototype.fetch = function (options) {
        var _this = this;
        options = options ? objects_1.extend({}, options) : {};
        var url = this.getURL();
        if (url == null)
            return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        this.trigger('before:fetch', this, options);
        return this.sync(persistence_1.RestMethod.Read, this, options)
            .then(function (result) {
            if (result)
                _this.set(_this.parse(result.content, options), options);
            _this.trigger('fetch', _this, result, options);
            return _this;
        }).catch(function (e) {
            _this.trigger('error', _this, e);
            if (e) {
                throw e;
            }
            return _this;
        });
    };
    RestModel.prototype.save = function (options) {
        var _this = this;
        options = options ? objects_1.extend({}, options) : {};
        this.trigger('before:save', this, options);
        var method = persistence_1.RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
        var url = this.getURL(this.id);
        if (url == null)
            return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        return this.sync(method, this, options)
            .then(function (result) {
            _this.set(result.content, options);
            _this.trigger('save', _this, result, options);
            return _this;
        }).catch(function (e) {
            _this.trigger('error', _this, e);
            throw e;
        });
    };
    RestModel.prototype.remove = function (options) {
        var _this = this;
        options = options ? objects_1.extend({}, options) : {};
        if (this.isNew) {
            _super.prototype.remove.call(this, options);
            return promises_1.Promise.resolve(this);
        }
        var url = this.getURL(this.id);
        if (url == null)
            return promises_1.Promise.reject(new Error('Url or rootURL no specified'));
        this.trigger('before:remove', this, options);
        if (!options.wait)
            _super.prototype.remove.call(this, options);
        options.url = url;
        return this.sync(persistence_1.RestMethod.Delete, this, options)
            .then(function (result) {
            if (!options.wait)
                _super.prototype.remove.call(_this, options);
            return _this;
        }).catch(function (e) {
            _this.trigger('error', _this, e);
            throw e;
        });
    };
    RestModel.prototype.sync = function (method, model, options) {
        return persistence_1.sync(method, model, options);
    };
    return RestModel;
}(nested_model_1.NestedModel));
exports.RestModel = RestModel;
