"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const orange_1 = require("orange");
function isModel(a) {
    if (a == null)
        return false;
    return (a instanceof Model) || a.__classType === 'Model' || a.__classType === 'RestModel';
}
exports.isModel = isModel;
class Model extends object_1.BaseObject {
    get __classType() { return 'Model'; }
    ;
    get id() {
        if (this.idAttribute in this._attributes)
            return this._attributes[this.idAttribute];
    }
    get isNew() {
        return this.id == null;
    }
    get isDirty() {
        return this.hasChanged();
    }
    constructor(attributes = {}, options = {}) {
        super();
        options = options || {};
        this._attributes = {};
        this.options = options;
        if (options.parse)
            attributes = this.parse(attributes);
        this.set(attributes, { silent: true, array: false });
        this.uid = orange_1.uniqueId('uid');
        this._changed = {};
        this.collection = options.collection;
        this.idAttribute = options.idAttribute || this.idAttribute || 'id';
    }
    set(key, val, options = {}) {
        var attr, attrs = {}, unset, changes, silent, changing, prev, current;
        if (key == null)
            return this;
        if (typeof key === 'object') {
            attrs = key;
            options = val;
        }
        else {
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
            if (!orange_1.equal(current[attr], val))
                changes.push(attr);
            if (!orange_1.equal(prev[attr], val)) {
                this._changed[attr] = val;
            }
            else {
                delete this._changed[attr];
            }
            unset ? delete current[attr] : current[attr] = val;
        }
        if (!silent) {
            if (changes.length)
                this._pending = !!options;
            for (var i = 0, l = changes.length; i < l; i++) {
                this.trigger('change:' + changes[i], this, current[changes[i]], options);
            }
        }
        if (changing)
            return this;
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
    get(key) {
        return this._attributes[key];
    }
    unset(key, options) {
        this.set(key, void 0, orange_1.extend({}, options, { unset: true }));
    }
    has(attr) {
        return this.get(attr) != null;
    }
    hasChanged(attr) {
        if (attr == null)
            return !!Object.keys(this.changed).length;
        return orange_1.has(this.changed, attr);
    }
    clear(options) {
        let attrs = {};
        for (let key in this._attributes)
            attrs[key] = void 0;
        return this.set(attrs, orange_1.extend({}, options, { unset: true }));
    }
    get changed() {
        return orange_1.extend({}, this._changed);
    }
    changedAttributes(diff) {
        if (!diff)
            return this.hasChanged() ? orange_1.extend(Object.create(null), this.changed) : false;
        var val, changed = {};
        var old = this._changing ? this._previousAttributes : this._attributes;
        for (var attr in diff) {
            if (orange_1.equal(old[attr], (val = diff[attr])))
                continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    }
    previous(attr) {
        if (attr == null || !this._previousAttributes)
            return null;
        return this._previousAttributes[attr];
    }
    previousAttributes() {
        return orange_1.extend(Object.create(null), this._previousAttributes);
    }
    toJSON() {
        return JSON.parse(JSON.stringify(this._attributes));
    }
    clone() {
        return new (this.constructor)(this._attributes, this.options);
    }
    parse(attr, options) {
        return attr;
    }
    remove(options) {
        this.trigger('remove', this, this.collection, options);
    }
    pick(attr, ...attrs) {
        if (arguments.length === 1) {
            if (!Array.isArray(attr)) {
                attrs = [attr];
            }
            else {
                attrs = attr;
            }
        }
        else {
            attrs = [attr].concat(attrs);
        }
        let out = {};
        for (let i = 0, ii = attrs.length; i < ii; i++) {
            if (this.has(attrs[i]))
                out[attrs[i]] = this.get(attrs[i]);
        }
        return out;
    }
}
exports.Model = Model;
