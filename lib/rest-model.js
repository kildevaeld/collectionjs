"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var orange_1 = require("orange");
var model_1 = require("./model");
var nested_model_1 = require("./nested-model");
var persistence_1 = require("./persistence");
function isRestModel(a) {
    if (a == null) return false;
    return a instanceof model_1.Model || a.__classType === 'RestModel';
}
exports.isRestModel = isRestModel;
function normalize_path(url, id) {
    var i = undefined,
        p = "";
    if ((i = url.indexOf('?')) >= 0) {
        p = url.substr(i);
        url = url.substr(0, i);
    }
    if (url[url.length - 1] !== '/') url += '/';
    return url + id + p;
}
exports.normalize_path = normalize_path;

var RestModel = (function (_nested_model_1$NestedModel) {
    _inherits(RestModel, _nested_model_1$NestedModel);

    function RestModel(attr) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, RestModel);

        _get(Object.getPrototypeOf(RestModel.prototype), "constructor", this).call(this, attr, options);
        this.idAttribute = 'id';
        if (options.url) {
            this.rootURL = options.url;
        }
    }

    _createClass(RestModel, [{
        key: "getURL",
        value: function getURL(id) {
            var url = this.rootURL;
            if (this.collection && this.collection.getURL()) {
                url = this.collection.getURL();
            }
            id = id || this.id;
            if (id && url) {
                url = normalize_path(url, this.id);
            }
            return url;
        }
    }, {
        key: "fetch",
        value: function fetch(options) {
            var _this = this;

            options = options ? orange_1.extend({}, options) : {};
            var url = this.getURL();
            if (url == null) return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
            options.url = url;
            this.trigger('before:fetch', this, options);
            return this.sync(persistence_1.RestMethod.Read, this, options).then(function (result) {
                if (result) _this.set(_this.parse(result.content, options), options);
                _this.trigger('fetch', _this, result, options);
                return _this;
            })["catch"](function (e) {
                _this.trigger('error', _this, e);
                if (e) {
                    throw e;
                }
                return _this;
            });
        }
    }, {
        key: "save",
        value: function save(options) {
            var _this2 = this;

            options = options ? orange_1.extend({}, options) : {};
            this.trigger('before:save', this, options);
            var method = persistence_1.RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
            var url = this.getURL(this.id);
            if (url == null) return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
            options.url = url;
            return this.sync(method, this, options).then(function (result) {
                _this2.set(result.content, options);
                _this2.trigger('save', _this2, result, options);
                return _this2;
            })["catch"](function (e) {
                _this2.trigger('error', _this2, e);
                throw e;
            });
        }
    }, {
        key: "remove",
        value: function remove(options) {
            var _this3 = this;

            options = options ? orange_1.extend({}, options) : {};
            if (this.isNew) {
                _get(Object.getPrototypeOf(RestModel.prototype), "remove", this).call(this, options);
                return orange_1.Promise.resolve(this);
            }
            var url = this.getURL(this.id);
            if (url == null) return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
            this.trigger('before:remove', this, options);
            if (!options.wait) _get(Object.getPrototypeOf(RestModel.prototype), "remove", this).call(this, options);
            options.url = url;
            return this.sync(persistence_1.RestMethod.Delete, this, options).then(function (result) {
                if (options.wait) _get(Object.getPrototypeOf(RestModel.prototype), "remove", _this3).call(_this3, options);
                return _this3;
            })["catch"](function (e) {
                _this3.trigger('error', _this3, e);
                throw e;
            });
        }
    }, {
        key: "sync",
        value: function sync(method, model, options) {
            return persistence_1.sync(method, model, options);
        }
    }, {
        key: "__classType",
        get: function get() {
            return 'RestModel';
        }
    }]);

    return RestModel;
})(nested_model_1.NestedModel);

exports.RestModel = RestModel;