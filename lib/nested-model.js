"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orange_1 = require("orange");
const model_1 = require("./model");
function objToPaths(obj, separator = ".", array = true) {
    var ret = {};
    if (!obj)
        return obj;
    for (var key in obj) {
        var val = obj[key];
        if (val && (val.constructor === Object || (array && val.constructor === Array)) && !orange_1.isEmpty(val)) {
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
exports.objToPaths = objToPaths;
function isOnNestedModel(obj, path, separator = ".") {
    var fields = path ? path.split(separator) : [];
    if (!obj)
        return false;
    var result = obj;
    for (let i = 0, n = fields.length; i < n; i++) {
        if (model_1.isModel(result))
            return true;
        if (!result)
            return false;
        result = result[fields[i]];
    }
    return false;
}
function getNested(obj, path, return_exists, separator = ".") {
    if (!obj)
        return null;
    var fields = path ? path.split(separator) : [];
    var result = obj;
    return_exists || (return_exists === false);
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
                let rest = fields.slice(i + 1);
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
class NestedModel extends model_1.Model {
    get(attr) {
        return getNested(this._attributes, attr);
    }
    set(key, val, options) {
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
            this._previousAttributes = orange_1.extend({}, this._attributes);
            this._changed = {};
        }
        current = this._attributes, prev = this._previousAttributes;
        var separator = NestedModel.keyPathSeparator;
        attrs = objToPaths(attrs, separator, options.array);
        var alreadyTriggered = {};
        if (!this._nestedListener)
            this._nestedListener = {};
        for (attr in attrs) {
            val = attrs[attr];
            let curVal = getNested(current, attr);
            if (!orange_1.equal(curVal, val)) {
                changes.push(attr);
                this._changed[attr] = val;
            }
            if (!orange_1.equal(getNested(prev, attr), val)) {
                setNested(this.changed, attr, val, options);
            }
            else {
                deleteNested(this.changed, attr);
            }
            if (model_1.isModel(curVal)) {
                let fn = this._nestedListener[attr];
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
                    if (model_1.isModel(val)) {
                        let fn = (model) => {
                            if (model.changed == undefined || orange_1.isEmpty(model.changed))
                                return;
                            for (let key in model.changed) {
                                this._changed[attr + separator + key] = model.changed[key];
                                this.trigger('change:' + attr + separator + key, model.changed[key]);
                            }
                            this.trigger('change', this, options);
                        };
                        this._nestedListener[attr] = fn;
                        val.on('change', fn);
                    }
                }
                else {
                    alreadyTriggered[attr] = true;
                }
                setNested(current, attr, val, options);
            }
        }
        if (!silent) {
            if (changes.length)
                this._pending = true;
            for (var i = 0, l = changes.length; i < l; i++) {
                let key = changes[i];
                if (!alreadyTriggered.hasOwnProperty(key) || !alreadyTriggered[key]) {
                    alreadyTriggered[key] = true;
                    this.trigger('change:' + key, this, getNested(current, key), options);
                }
                var fields = key.split(separator);
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
    }
    clear(options) {
        var attrs = {};
        var shallowAttributes = objToPaths(this._attributes);
        for (var key in shallowAttributes)
            attrs[key] = void 0;
        return this.set(attrs, orange_1.extend({}, options, {
            unset: true
        }));
    }
    hasChanged(attr) {
        if (attr == null) {
            return !Object.keys(this.changed).length;
        }
        return getNested(this.changed, attr) !== undefined;
    }
    changedAttributes(diff) {
        if (!diff)
            return this.hasChanged() ? objToPaths(this.changed) : false;
        var old = this._changing ? this._previousAttributes : this._attributes;
        diff = objToPaths(diff);
        old = objToPaths(old);
        var val, changed = false;
        for (var attr in diff) {
            if (orange_1.equal(old[attr], (val = diff[attr])))
                continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    }
    previous(attr) {
        if (attr == null || !this._previousAttributes) {
            return null;
        }
        return getNested(this._previousAttributes, attr);
    }
    previousAttributes() {
        return orange_1.extend({}, this._previousAttributes);
    }
    pick(attr, ...attrs) {
        if (arguments.length === 1) {
            attr = !Array.isArray(attr) ? [attr] : attr;
        }
        else {
            attrs = [attr].concat(attrs);
        }
        let out = {};
        for (let i = 0, ii = attrs.length; i < ii; i++) {
            if (this.has(attrs[i])) {
                setNested(out, attrs[i], this.get(attrs[i]));
            }
        }
        return out;
    }
    destroy() {
        for (let key in this._nestedListener) {
            let fn = this._nestedListener[key];
            if (fn) {
                let m = this.get(key);
                if (m)
                    m.off(key, fn);
            }
        }
        super.destroy();
    }
}
NestedModel.keyPathSeparator = '.';
exports.NestedModel = NestedModel;
