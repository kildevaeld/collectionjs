"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const model_1 = require("./model");
const orange_1 = require("orange");
function isCollection(a) {
    if (a == null)
        return false;
    return (a instanceof Collection) || a.__classType == 'Collection' || a.__classType == 'RestCollection';
}
exports.isCollection = isCollection;
var setOptions = { add: true, remove: true, merge: true };
var addOptions = { add: true, remove: false };
class Collection extends object_1.BaseObject {
    constructor(models, options = {}) {
        super();
        this.options = options;
        if (this.options.model) {
            this.Model = this.options.model;
        }
        if (models) {
            this.add(models);
        }
    }
    get __classType() { return 'Collection'; }
    ;
    get length() {
        return this.models.length;
    }
    get Model() {
        if (!this._model) {
            this._model = model_1.Model;
        }
        return this._model;
    }
    set Model(con) {
        this._model = con;
    }
    get models() {
        return this._models || (this._models = []);
    }
    add(models, options = {}) {
        if (!Array.isArray(models)) {
            if (!(models instanceof this.Model)) {
                models = this._prepareModel(models);
            }
        }
        else {
            models = models.map((item) => {
                return (item instanceof this.Model) ? item : (this._prepareModel(item));
            });
        }
        return this.set(models, orange_1.extend({ merge: false }, options, addOptions));
    }
    set(items, options = {}) {
        options = orange_1.extend({}, setOptions, options);
        if (options.parse)
            items = this.parse(items, options);
        var singular = !Array.isArray(items);
        let models = (singular ? (items ? [items] : []) : items.slice());
        var i, l, id, model, attrs, existing, sort;
        var at = options.at;
        var sortable = this.comparator && (at == null) && options.sort !== false;
        var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
        var toAdd = [], toRemove = [], modelMap = {};
        var add = options.add, merge = options.merge, remove = options.remove;
        var order = !sortable && add && remove ? [] : null;
        for (i = 0, l = models.length; i < l; i++) {
            model = models[i];
            model = this._prepareModel(model);
            id = model.get(model.idAttribute) || model.uid;
            if (existing = this.get(id)) {
                if (remove)
                    modelMap[existing.uid] = true;
                if (merge) {
                    attrs = model.toJSON();
                    existing.set(attrs, options);
                    if (sortable && !sort && existing.hasChanged(sortAttr))
                        sort = true;
                }
                models[i] = existing;
            }
            else if (add) {
                models[i] = model;
                if (!model)
                    continue;
                toAdd.push(model);
                this._addReference(model, options);
            }
            model = existing || model;
            if (order && !modelMap[model.id])
                order.push(model);
            modelMap[model.uid] = true;
        }
        if (remove) {
            for (i = 0, l = this.length; i < l; ++i) {
                if (!modelMap[(model = this.models[i]).uid])
                    toRemove.push(model);
            }
            if (toRemove.length)
                this.remove(toRemove, options);
        }
        if (toAdd.length || (order && order.length)) {
            if (sortable)
                sort = true;
            if (at != null) {
                for (i = 0, l = toAdd.length; i < l; i++) {
                    this.models.splice(at + i, 0, toAdd[i]);
                }
            }
            else {
                if (order)
                    this.models.length = 0;
                var orderedModels = order || toAdd;
                for (i = 0, l = orderedModels.length; i < l; i++) {
                    this.models.push(orderedModels[i]);
                }
            }
        }
        if (sort)
            this.sort({ silent: true });
        if (!options.silent) {
            for (i = 0, l = toAdd.length; i < l; i++) {
                (model = toAdd[i]).trigger('add', model, this, options);
            }
            if (sort || (order && order.length))
                this.trigger('sort', this, options);
            if (toAdd.length || toRemove.length)
                this.trigger('update', this, options);
        }
        return singular ? models[0] : models;
    }
    remove(models, options = {}) {
        var singular = !Array.isArray(models);
        models = (singular ? [models] : models.slice());
        var i, l, index, model;
        for (i = 0, l = models.length; i < l; i++) {
            model = models[i] = this.get(models[i]);
            if (!model)
                continue;
            index = this.indexOf(model);
            this.models.splice(index, 1);
            if (!options.silent) {
                options.index = index;
                model.trigger('remove', model, this, options);
            }
            this._removeReference(model, options);
        }
        return singular ? models[0] : models;
    }
    get(id) {
        return this.find(id);
    }
    at(index) {
        return this.models[index];
    }
    clone(options) {
        options = options || this.options;
        return new this.constructor(this.models, options);
    }
    sort(options = {}) {
        if (!this.comparator)
            throw new Error('Cannot sort a set without a comparator');
        if (typeof this.comparator === 'string' || this.comparator.length === 1) {
            this._models = this.sortBy(this.comparator, this);
        }
        else {
            this.models.sort(this.comparator.bind(this));
        }
        if (!options.silent)
            this.trigger('sort', this, options);
        return this;
    }
    sortBy(key, context) {
        return orange_1.sortBy(this._models, key, context);
    }
    push(model, options = {}) {
        return this.add(model, orange_1.extend({ at: this.length }, options));
    }
    reset(models, options = {}) {
        this.forEach((model) => {
            this._removeReference(model, options);
        });
        options.previousModels = this.models;
        this._reset();
        models = this.add(models, options);
        if (!options.silent)
            this.trigger('reset', this, options);
        return models;
    }
    create(values, options = { add: true }) {
        let model = new this.Model(values, options);
        if (options.add)
            this.add(model);
        return model;
    }
    parse(models, options = {}) {
        return models;
    }
    find(nidOrFn) {
        let model;
        if (typeof nidOrFn === 'function') {
            model = orange_1.find(this.models, nidOrFn);
        }
        else {
            model = orange_1.find(this.models, function (model) {
                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
            });
        }
        return model;
    }
    forEach(iterator, ctx) {
        for (let i = 0, l = this.models.length; i < l; i++) {
            iterator.call(ctx || this, this.models[i], i);
        }
        return this;
    }
    map(iterator, thisArgs) {
        let out = [];
        for (let i = 0, ii = this.length; i < ii; i++) {
            out.push(iterator.call(thisArgs, this.models[i], i, this));
        }
        return out;
    }
    filter(fn) {
        let out = [];
        this.forEach((m, i) => {
            if (fn(m, i))
                out.push(m);
        });
        return out;
    }
    indexOf(model) {
        return this.models.indexOf(model);
    }
    toJSON() {
        return this.models.map(function (m) { return m.toJSON(); });
    }
    _prepareModel(value) {
        if (model_1.isModel(value))
            return value;
        if (orange_1.isObject(value))
            return new this.Model(value, { parse: true });
        throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
    }
    _removeReference(model, options) {
        if (this === model.collection)
            delete model.collection;
        this.stopListening(model);
    }
    _addReference(model, options) {
        if (!model.collection)
            model.collection = this;
        this.listenTo(model, 'all', this._onModelEvent);
    }
    _reset() {
        this._models = [];
    }
    _onModelEvent(event, model, collection, options) {
        if ((event === 'add' || event === 'remove') && collection !== this)
            return;
        if (event === 'destroy')
            this.remove(model, options);
        orange_1.callFunc(this.trigger, this, orange_1.slice(arguments));
    }
    destroy() {
        this.models.forEach(m => {
            if (typeof m.destroy === 'function' &&
                m.collection == this)
                m.destroy();
        });
        super.destroy();
    }
}
exports.Collection = Collection;
