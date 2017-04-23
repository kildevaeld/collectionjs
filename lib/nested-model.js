"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var orange_1 = require("orange");
var model_1 = require("./model");
function objToPaths(obj) {
    var separator = arguments.length <= 1 || arguments[1] === undefined ? "." : arguments[1];
    var array = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    var ret = {};
    if (!obj) return obj;
    for (var key in obj) {
        var val = obj[key];
        if (val && (val.constructor === Object || array && val.constructor === Array) && !orange_1.isEmpty(val)) {
            var obj2 = objToPaths(val);
            for (var key2 in obj2) {
                var val2 = obj2[key2];
                ret[key + separator + key2] = val2;
            }
        } else {
            ret[key] = val;
        }
    }
    return ret;
}
exports.objToPaths = objToPaths;
function isOnNestedModel(obj, path) {
    var separator = arguments.length <= 2 || arguments[2] === undefined ? "." : arguments[2];

    var fields = path ? path.split(separator) : [];
    if (!obj) return false;
    var result = obj;
    for (var i = 0, n = fields.length; i < n; i++) {
        if (model_1.isModel(result)) return true;
        if (!result) return false;
        result = result[fields[i]];
    }
    return false;
}
function getNested(obj, path, return_exists) {
    var separator = arguments.length <= 3 || arguments[3] === undefined ? "." : arguments[3];

    if (!obj) return null;
    var fields = path ? path.split(separator) : [];
    var result = obj;
    return_exists || return_exists === false;
    for (var i = 0, n = fields.length; i < n; i++) {
        if (return_exists && !orange_1.has(result, fields[i])) {
            return false;
        }
        result = model_1.isModel(result) ? result.get(fields[i]) : result[fields[i]];
        if (result == null && i < n - 1) {
            result = {};
        }
        if (typeof result === 'undefined') {
            if (return_exists) {
                return true;
            }
            return result;
        }
    }
    if (return_exists) {
        return true;
    }
    return result;
}
exports.getNested = getNested;
function setNested(obj, path, val, options) {
    options = options || {};
    if (!obj) return null;
    var separator = options.separator || ".";
    var fields = path ? path.split(separator) : [];
    var result = obj;
    for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
        var field = fields[i];
        if (i === n - 1) {
            options.unset ? delete result[field] : result[field] = val;
        } else {
            if (typeof result[field] === 'undefined' || !orange_1.isObject(result[field])) {
                if (options.unset) {
                    delete result[field];
                    return;
                }
                var nextField = fields[i + 1];
                result[field] = /^\d+$/.test(nextField) ? [] : {};
            }
            result = result[field];
            if (model_1.isModel(result)) {
                var rest = fields.slice(i + 1);
                return result.set(rest.join('.'), val, options);
            }
        }
    }
}
function deleteNested(obj, path) {
    setNested(obj, path, null, {
        unset: true
    });
}

var NestedModel = (function (_model_1$Model) {
    _inherits(NestedModel, _model_1$Model);

    function NestedModel() {
        _classCallCheck(this, NestedModel);

        _get(Object.getPrototypeOf(NestedModel.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(NestedModel, [{
        key: "get",
        value: function get(attr) {
            return getNested(this._attributes, attr);
        }
    }, {
        key: "set",
        value: function set(key, val, options) {
            var _this = this;

            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (key == null) return this;
            if (typeof key === 'object') {
                attrs = key;
                options = val || {};
            } else {
                (attrs = {})[key] = val;
            }
            options || (options = {});
            unset = options.unset;
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;
            if (!changing) {
                this._previousAttributes = orange_1.extend({}, this._attributes);
                this._changed = {};
            }
            current = this._attributes, prev = this._previousAttributes;
            var separator = NestedModel.keyPathSeparator;
            attrs = objToPaths(attrs, separator, options.array);
            var alreadyTriggered = {};
            if (!this._nestedListener) this._nestedListener = {};
            for (attr in attrs) {
                val = attrs[attr];
                var curVal = getNested(current, attr);
                if (!orange_1.equal(curVal, val)) {
                    changes.push(attr);
                    this._changed[attr] = val;
                }
                if (!orange_1.equal(getNested(prev, attr), val)) {
                    setNested(this.changed, attr, val, options);
                } else {
                    deleteNested(this.changed, attr);
                }
                if (model_1.isModel(curVal)) {
                    var fn = this._nestedListener[attr];
                    if (fn) {
                        curVal.off('change', fn);
                        delete this._nestedListener[attr];
                    }
                }
                if (unset) {
                    deleteNested(current, attr);
                } else {
                    if (!isOnNestedModel(current, attr, separator)) {
                        if (model_1.isModel(val)) {
                            var fn = function fn(model) {
                                if (model.changed == undefined || orange_1.isEmpty(model.changed)) return;
                                for (var _key in model.changed) {
                                    _this._changed[attr + separator + _key] = model.changed[_key];
                                    _this.trigger('change:' + attr + separator + _key, model.changed[_key]);
                                }
                                _this.trigger('change', _this, options);
                            };
                            this._nestedListener[attr] = fn;
                            val.on('change', fn);
                        }
                    } else {
                        alreadyTriggered[attr] = true;
                    }
                    setNested(current, attr, val, options);
                }
            }
            if (!silent) {
                if (changes.length) this._pending = true;
                for (var i = 0, l = changes.length; i < l; i++) {
                    var _key2 = changes[i];
                    if (!alreadyTriggered.hasOwnProperty(_key2) || !alreadyTriggered[_key2]) {
                        alreadyTriggered[_key2] = true;
                        this.trigger('change:' + _key2, this, getNested(current, _key2), options);
                    }
                    var fields = _key2.split(separator);
                    for (var n = fields.length - 1; n > 0; n--) {
                        var parentKey = fields.slice(0, n).join(separator),
                            wildcardKey = parentKey + separator + '*';
                        if (!alreadyTriggered.hasOwnProperty(wildcardKey) || !alreadyTriggered[wildcardKey]) {
                            alreadyTriggered[wildcardKey] = true;
                            this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
                        }
                        if (!alreadyTriggered.hasOwnProperty(parentKey) || !alreadyTriggered[parentKey]) {
                            alreadyTriggered[parentKey] = true;
                            this.trigger('change:' + parentKey, this, getNested(current, parentKey), options);
                        }
                    }
                }
            }
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        }
    }, {
        key: "clear",
        value: function clear(options) {
            var attrs = {};
            var shallowAttributes = objToPaths(this._attributes);
            for (var key in shallowAttributes) attrs[key] = void 0;
            return this.set(attrs, orange_1.extend({}, options, {
                unset: true
            }));
        }
    }, {
        key: "hasChanged",
        value: function hasChanged(attr) {
            if (attr == null) {
                return !Object.keys(this.changed).length;
            }
            return getNested(this.changed, attr) !== undefined;
        }
    }, {
        key: "changedAttributes",
        value: function changedAttributes(diff) {
            if (!diff) return this.hasChanged() ? objToPaths(this.changed) : false;
            var old = this._changing ? this._previousAttributes : this._attributes;
            diff = objToPaths(diff);
            old = objToPaths(old);
            var val,
                changed = false;
            for (var attr in diff) {
                if (orange_1.equal(old[attr], val = diff[attr])) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        }
    }, {
        key: "previous",
        value: function previous(attr) {
            if (attr == null || !this._previousAttributes) {
                return null;
            }
            return getNested(this._previousAttributes, attr);
        }
    }, {
        key: "previousAttributes",
        value: function previousAttributes() {
            return orange_1.extend({}, this._previousAttributes);
        }
    }, {
        key: "pick",
        value: function pick(attr) {
            for (var _len = arguments.length, attrs = Array(_len > 1 ? _len - 1 : 0), _key3 = 1; _key3 < _len; _key3++) {
                attrs[_key3 - 1] = arguments[_key3];
            }

            if (arguments.length === 1) {
                attr = !Array.isArray(attr) ? [attr] : attr;
            } else {
                attrs = [attr].concat(attrs);
            }
            var out = {};
            for (var i = 0, ii = attrs.length; i < ii; i++) {
                if (this.has(attrs[i])) {
                    setNested(out, attrs[i], this.get(attrs[i]));
                }
            }
            return out;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            for (var key in this._nestedListener) {
                var fn = this._nestedListener[key];
                if (fn) {
                    var m = this.get(key);
                    if (m) m.off(key, fn);
                }
            }
            _get(Object.getPrototypeOf(NestedModel.prototype), "destroy", this).call(this);
        }
    }]);

    return NestedModel;
})(model_1.Model);

NestedModel.keyPathSeparator = '.';
exports.NestedModel = NestedModel;