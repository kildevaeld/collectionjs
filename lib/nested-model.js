var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require('utilities/lib/utils');
var objects_1 = require('utilities/lib/objects');
var model_1 = require('./model');
function objToPaths(obj, separator) {
    if (separator === void 0) { separator = "."; }
    var ret = {};
    if (!obj)
        return obj;
    for (var key in obj) {
        var val = obj[key];
        if (val && (val.constructor === Object || val.constructor === Array) && !objects_1.isEmpty(val)) {
            var obj2 = objToPaths(val);
            for (var key2 in obj2) {
                var val2 = obj2[key2];
                ret[key + separator + key2] = val2;
            }
        }
        else {
            ret[key] = val;
        }
    }
    return ret;
}
function isOnNestedModel(obj, path, separator) {
    if (separator === void 0) { separator = "."; }
    var fields = path ? path.split(separator) : [];
    if (!obj)
        return false;
    var result = obj;
    for (var i = 0, n = fields.length; i < n; i++) {
        if (result instanceof model_1.Model)
            return true;
        if (!result)
            return false;
        result = result[fields[i]];
    }
    return false;
}
function getNested(obj, path, return_exists, separator) {
    if (separator === void 0) { separator = "."; }
    if (!obj)
        return null;
    var fields = path ? path.split(separator) : [];
    var result = obj;
    return_exists || (return_exists === false);
    for (var i = 0, n = fields.length; i < n; i++) {
        if (return_exists && !objects_1.has(result, fields[i])) {
            return false;
        }
        result = result instanceof model_1.Model ? result.get(fields[i]) : result[fields[i]];
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
function setNested(obj, path, val, options) {
    options = options || {};
    if (!obj)
        return null;
    var separator = options.separator || ".";
    var fields = path ? path.split(separator) : [];
    var result = obj;
    for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
        var field = fields[i];
        if (i === n - 1) {
            options.unset ? delete result[field] : result[field] = val;
        }
        else {
            if (typeof result[field] === 'undefined' || !objects_1.isObject(result[field])) {
                if (options.unset) {
                    delete result[field];
                    return;
                }
                var nextField = fields[i + 1];
                result[field] = /^\d+$/.test(nextField) ? [] : {};
            }
            result = result[field];
            if (result instanceof model_1.Model) {
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
var NestedModel = (function (_super) {
    __extends(NestedModel, _super);
    function NestedModel() {
        _super.apply(this, arguments);
    }
    NestedModel.prototype.get = function (attr) {
        return getNested(this._attributes, attr);
    };
    NestedModel.prototype.set = function (key, val, options) {
        var _this = this;
        var attr, attrs, unset, changes, silent, changing, prev, current;
        if (key == null)
            return this;
        if (typeof key === 'object') {
            attrs = key;
            options = val || {};
        }
        else {
            (attrs = {})[key] = val;
        }
        options || (options = {});
        unset = options.unset;
        silent = options.silent;
        changes = [];
        changing = this._changing;
        this._changing = true;
        if (!changing) {
            this._previousAttributes = objects_1.extend({}, this._attributes);
            this._changed = {};
        }
        current = this._attributes, prev = this._previousAttributes;
        if (this.idAttribute in attrs)
            this.id = attrs[this.idAttribute];
        attrs = objToPaths(attrs);
        var alreadyTriggered = {};
        var separator = NestedModel.keyPathSeparator;
        if (!this._nestedListener)
            this._nestedListener = {};
        for (attr in attrs) {
            val = attrs[attr];
            var curVal = getNested(current, attr);
            if (!utils_1.equal(curVal, val)) {
                changes.push(attr);
                this._changed[attr] = val;
            }
            if (!utils_1.equal(getNested(prev, attr), val)) {
                setNested(this.changed, attr, val);
            }
            else {
                deleteNested(this.changed, attr);
            }
            if (curVal instanceof model_1.Model) {
                var fn = this._nestedListener[attr];
                if (fn) {
                    curVal.off('change', fn);
                    delete this._nestedListener[attr];
                }
            }
            if (unset) {
                deleteNested(current, attr);
            }
            else {
                if (!isOnNestedModel(current, attr, separator)) {
                    if (val instanceof model_1.Model) {
                        var fn = function (model) {
                            if (model.changed == undefined || objects_1.isEmpty(model.changed))
                                return;
                            for (var key_1 in model.changed) {
                                _this._changed[attr + separator + key_1] = model.changed[key_1];
                                _this.trigger('change:' + attr + separator + key_1, model.changed[key_1]);
                            }
                            _this.trigger('change', _this, options);
                        };
                        this._nestedListener[attr] = fn;
                        val.on('change', fn);
                    }
                }
                else {
                    alreadyTriggered[attr] = true;
                }
                setNested(current, attr, val);
            }
        }
        if (!silent) {
            if (changes.length)
                this._pending = true;
            for (var i = 0, l = changes.length; i < l; i++) {
                var key_2 = changes[i];
                if (!alreadyTriggered.hasOwnProperty(key_2) || !alreadyTriggered[key_2]) {
                    alreadyTriggered[key_2] = true;
                    this.trigger('change:' + key_2, this, getNested(current, key_2), options);
                }
                var fields = key_2.split(separator);
                for (var n = fields.length - 1; n > 0; n--) {
                    var parentKey = fields.slice(0, n).join(separator), wildcardKey = parentKey + separator + '*';
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
        if (changing)
            return this;
        if (!silent) {
            while (this._pending) {
                this._pending = false;
                this.trigger('change', this, options);
            }
        }
        this._pending = false;
        this._changing = false;
        return this;
    };
    NestedModel.prototype.clear = function (options) {
        var attrs = {};
        var shallowAttributes = objToPaths(this._attributes);
        for (var key in shallowAttributes)
            attrs[key] = void 0;
        return this.set(attrs, objects_1.extend({}, options, {
            unset: true
        }));
    };
    NestedModel.prototype.hasChanged = function (attr) {
        if (attr == null) {
            return !Object.keys(this.changed).length;
        }
        return getNested(this.changed, attr) !== undefined;
    };
    NestedModel.prototype.changedAttributes = function (diff) {
        if (!diff)
            return this.hasChanged() ? objToPaths(this.changed) : false;
        var old = this._changing ? this._previousAttributes : this._attributes;
        diff = objToPaths(diff);
        old = objToPaths(old);
        var val, changed = false;
        for (var attr in diff) {
            if (utils_1.equal(old[attr], (val = diff[attr])))
                continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    };
    NestedModel.prototype.previous = function (attr) {
        if (attr == null || !this._previousAttributes) {
            return null;
        }
        return getNested(this._previousAttributes, attr);
    };
    NestedModel.prototype.previousAttributes = function () {
        return objects_1.extend({}, this._previousAttributes);
    };
    NestedModel.prototype.destroy = function () {
        for (var key in this._nestedListener) {
            var fn = this._nestedListener[key];
            if (fn) {
                var m = this.get(key);
                if (m)
                    m.off(key, fn);
            }
        }
        _super.prototype.destroy.call(this);
    };
    NestedModel.keyPathSeparator = '.';
    return NestedModel;
})(model_1.Model);
exports.NestedModel = NestedModel;
