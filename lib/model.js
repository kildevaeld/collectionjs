"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("./object");
var orange_1 = require("orange");
function isModel(a) {
    if (a == null) return false;
    return a instanceof Model || a.__classType === 'Model' || a.__classType === 'RestModel';
}
exports.isModel = isModel;

var Model = (function (_object_1$BaseObject) {
    _inherits(Model, _object_1$BaseObject);

    _createClass(Model, [{
        key: "__classType",
        get: function get() {
            return 'Model';
        }
    }, {
        key: "id",
        get: function get() {
            if (this.idAttribute in this._attributes) return this._attributes[this.idAttribute];
        }
    }, {
        key: "isNew",
        get: function get() {
            return this.id == null;
        }
    }, {
        key: "isDirty",
        get: function get() {
            return this.hasChanged();
        }
    }]);

    function Model() {
        var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Model);

        _get(Object.getPrototypeOf(Model.prototype), "constructor", this).call(this);
        options = options || {};
        this._attributes = {};
        this.options = options;
        if (options.parse) attributes = this.parse(attributes);
        this.set(attributes, { silent: true, array: false });
        this.uid = orange_1.uniqueId('uid');
        this._changed = {};
        this.collection = options.collection;
        this.idAttribute = options.idAttribute || this.idAttribute || 'id';
    }

    _createClass(Model, [{
        key: "set",
        value: function set(key, val) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var attr,
                attrs = {},
                unset,
                changes,
                silent,
                changing,
                prev,
                current;
            if (key == null) return this;
            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                attrs[key] = val;
            }
            options || (options = {});
            unset = options.unset;
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;
            if (!changing) {
                this._previousAttributes = orange_1.extend(Object.create(null), this._attributes);
                this._changed = {};
            }
            current = this._attributes, prev = this._previousAttributes;
            for (attr in attrs) {
                val = attrs[attr];
                if (!orange_1.equal(current[attr], val)) changes.push(attr);
                if (!orange_1.equal(prev[attr], val)) {
                    this._changed[attr] = val;
                } else {
                    delete this._changed[attr];
                }
                unset ? delete current[attr] : current[attr] = val;
            }
            if (!silent) {
                if (changes.length) this._pending = !!options;
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:' + changes[i], this, current[changes[i]], options);
                }
            }
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    options = this._pending;
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        }
    }, {
        key: "get",
        value: function get(key) {
            return this._attributes[key];
        }
    }, {
        key: "unset",
        value: function unset(key, options) {
            this.set(key, void 0, orange_1.extend({}, options, { unset: true }));
        }
    }, {
        key: "has",
        value: function has(attr) {
            return this.get(attr) != null;
        }
    }, {
        key: "hasChanged",
        value: function hasChanged(attr) {
            if (attr == null) return !!Object.keys(this.changed).length;
            return orange_1.has(this.changed, attr);
        }
    }, {
        key: "clear",
        value: function clear(options) {
            var attrs = {};
            for (var key in this._attributes) {
                attrs[key] = void 0;
            }return this.set(attrs, orange_1.extend({}, options, { unset: true }));
        }
    }, {
        key: "changedAttributes",
        value: function changedAttributes(diff) {
            if (!diff) return this.hasChanged() ? orange_1.extend(Object.create(null), this.changed) : false;
            var val,
                changed = {};
            var old = this._changing ? this._previousAttributes : this._attributes;
            for (var attr in diff) {
                if (orange_1.equal(old[attr], val = diff[attr])) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        }
    }, {
        key: "previous",
        value: function previous(attr) {
            if (attr == null || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        }
    }, {
        key: "previousAttributes",
        value: function previousAttributes() {
            return orange_1.extend(Object.create(null), this._previousAttributes);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return JSON.parse(JSON.stringify(this._attributes));
        }
    }, {
        key: "clone",
        value: function clone() {
            return new this.constructor(this._attributes, this.options);
        }
    }, {
        key: "parse",
        value: function parse(attr, options) {
            return attr;
        }
    }, {
        key: "remove",
        value: function remove(options) {
            this.trigger('remove', this, this.collection, options);
        }
    }, {
        key: "pick",
        value: function pick(attr) {
            for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                attrs[_key - 1] = arguments[_key];
            }

            if (arguments.length === 1) {
                if (!Array.isArray(attr)) {
                    attrs = [attr];
                } else {
                    attrs = attr;
                }
            } else {
                attrs = [attr].concat(attrs);
            }
            var out = {};
            for (var i = 0, ii = attrs.length; i < ii; i++) {
                if (this.has(attrs[i])) out[attrs[i]] = this.get(attrs[i]);
            }
            return out;
        }
    }, {
        key: "changed",
        get: function get() {
            return orange_1.extend({}, this._changed);
        }
    }]);

    return Model;
})(object_1.BaseObject);

exports.Model = Model;