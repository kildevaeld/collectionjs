"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var orange_1 = require("orange");
var collection_1 = require("./collection");
var rest_model_1 = require("./rest-model");
var persistence_1 = require("./persistence");
function isRestCollection(a) {
    if (a == null) return false;
    return a instanceof RestCollection || a.__classType == 'RestCollection';
}
exports.isRestCollection = isRestCollection;

var RestCollection = (function (_collection_1$Collection) {
    _inherits(RestCollection, _collection_1$Collection);

    function RestCollection(models) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, RestCollection);

        _get(Object.getPrototypeOf(RestCollection.prototype), "constructor", this).call(this, models, options);
        this.Model = rest_model_1.RestModel;
        if (options.url) this.url = options.url;
        this.options.queryParameter = this.options.queryParameter || 'q';
    }

    _createClass(RestCollection, [{
        key: "getURL",
        value: function getURL() {
            return typeof this.url === 'function' ? this.url() : this.url;
        }
    }, {
        key: "fetch",
        value: function fetch(options) {
            var _this = this;

            options = options ? orange_1.extend({}, options) : {};
            var url = this.getURL();
            if (url == null) return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
            options.url = url;
            this.trigger('before:fetch');
            return this.sync(persistence_1.RestMethod.Read, this, options).then(function (results) {
                _this[options.reset ? 'reset' : 'set'](results.content, options);
                _this.trigger('fetch');
                return _this;
            })["catch"](function (e) {
                _this.trigger('error', e);
                throw e;
            });
        }
    }, {
        key: "create",
        value: function create(value, options) {
            var _this2 = this;

            options = options ? orange_1.extend({}, options) : {};
            var model = undefined;
            var url = this.getURL();
            if (url == null) throw new Error('Url or rootURL no specified');
            options.url = url;
            if (rest_model_1.isRestModel(value)) {
                model = value;
            } else {
                model = new this.Model(value, { parse: true, url: this.getURL() });
            }
            if (options.wait === void 0) options.wait = true;
            if (!options.wait) this.add(model, options);
            this.trigger('before:create', this, model, value, options);
            model.save().then(function () {
                if (!options.wait) _this2.add(model, options);
                _this2.trigger('create', _this2, model, value, options);
                if (options.complete) options.complete(null, model);
            })["catch"](function (e) {
                _this2.trigger('error', e);
                if (options.complete) options.complete(e, null);
            });
            return model;
        }
    }, {
        key: "query",
        value: function query(term) {
            var _this3 = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? { merge: true } : arguments[1];

            var params = _defineProperty({}, this.options.queryParameter, term);
            var url = this.getURL();
            if (url == null) return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
            options.url = url;
            if (!options.params) options.params = {};
            orange_1.extend(options.params, params);
            this.trigger('before:query');
            return this.sync(persistence_1.RestMethod.Read, this, options).then(function (results) {
                var models = _this3.add(results.content, options);
                _this3.trigger('query');
                return models;
            })["catch"](function (e) {
                _this3.trigger('error', e);
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
            return 'RestCollection';
        }
    }]);

    return RestCollection;
})(collection_1.Collection);

exports.RestCollection = RestCollection;