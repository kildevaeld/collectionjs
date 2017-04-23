"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x10, _x11, _x12) { var _again = true; _function: while (_again) { var object = _x10, property = _x11, receiver = _x12; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x10 = parent; _x11 = property; _x12 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = require("./object");
var model_1 = require("./model");
var orange_1 = require("orange");
function isCollection(a) {
    if (a == null) return false;
    return a instanceof Collection || a.__classType == 'Collection' || a.__classType == 'RestCollection';
}
exports.isCollection = isCollection;
var setOptions = { add: true, remove: true, merge: true };
var addOptions = { add: true, remove: false };

var Collection = (function (_object_1$BaseObject) {
    _inherits(Collection, _object_1$BaseObject);

    function Collection(models) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), "constructor", this).call(this);
        this.options = options;
        if (this.options.model) {
            this.Model = this.options.model;
        }
        if (models) {
            this.add(models);
        }
    }

    _createClass(Collection, [{
        key: "add",
        value: function add(models) {
            var _this = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (!Array.isArray(models)) {
                if (!(models instanceof this.Model)) {
                    models = this._prepareModel(models);
                }
            } else {
                models = models.map(function (item) {
                    return item instanceof _this.Model ? item : _this._prepareModel(item);
                });
            }
            return this.set(models, orange_1.extend({ merge: false }, options, addOptions));
        }
    }, {
        key: "set",
        value: function set(items) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            options = orange_1.extend({}, setOptions, options);
            if (options.parse) items = this.parse(items, options);
            var singular = !Array.isArray(items);
            var models = singular ? items ? [items] : [] : items.slice();
            var i, l, id, model, attrs, existing, sort;
            var at = options.at;
            var sortable = this.comparator && at == null && options.sort !== false;
            var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
            var toAdd = [],
                toRemove = [],
                modelMap = {};
            var add = options.add,
                merge = options.merge,
                remove = options.remove;
            var order = !sortable && add && remove ? [] : null;
            for (i = 0, l = models.length; i < l; i++) {
                model = models[i];
                model = this._prepareModel(model);
                id = model.get(model.idAttribute) || model.uid;
                if (existing = this.get(id)) {
                    if (remove) modelMap[existing.uid] = true;
                    if (merge) {
                        attrs = model.toJSON();
                        existing.set(attrs, options);
                        if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
                    }
                    models[i] = existing;
                } else if (add) {
                    models[i] = model;
                    if (!model) continue;
                    toAdd.push(model);
                    this._addReference(model, options);
                }
                model = existing || model;
                if (order && !modelMap[model.id]) order.push(model);
                modelMap[model.uid] = true;
            }
            if (remove) {
                for (i = 0, l = this.length; i < l; ++i) {
                    if (!modelMap[(model = this.models[i]).uid]) toRemove.push(model);
                }
                if (toRemove.length) this.remove(toRemove, options);
            }
            if (toAdd.length || order && order.length) {
                if (sortable) sort = true;
                if (at != null) {
                    for (i = 0, l = toAdd.length; i < l; i++) {
                        this.models.splice(at + i, 0, toAdd[i]);
                    }
                } else {
                    if (order) this.models.length = 0;
                    var orderedModels = order || toAdd;
                    for (i = 0, l = orderedModels.length; i < l; i++) {
                        this.models.push(orderedModels[i]);
                    }
                }
            }
            if (sort) this.sort({ silent: true });
            if (!options.silent) {
                for (i = 0, l = toAdd.length; i < l; i++) {
                    (model = toAdd[i]).trigger('add', model, this, options);
                }
                if (sort || order && order.length) this.trigger('sort', this, options);
                if (toAdd.length || toRemove.length) this.trigger('update', this, options);
            }
            return singular ? models[0] : models;
        }
    }, {
        key: "remove",
        value: function remove(models) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var singular = !Array.isArray(models);
            models = singular ? [models] : models.slice();
            var i, l, index, model;
            for (i = 0, l = models.length; i < l; i++) {
                model = models[i] = this.get(models[i]);
                if (!model) continue;
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
    }, {
        key: "get",
        value: function get(id) {
            return this.find(id);
        }
    }, {
        key: "at",
        value: function at(index) {
            return this.models[index];
        }
    }, {
        key: "clone",
        value: function clone(options) {
            options = options || this.options;
            return new this.constructor(this.models, options);
        }
    }, {
        key: "sort",
        value: function sort() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
            if (typeof this.comparator === 'string' || this.comparator.length === 1) {
                this._models = this.sortBy(this.comparator, this);
            } else {
                this.models.sort(this.comparator.bind(this));
            }
            if (!options.silent) this.trigger('sort', this, options);
            return this;
        }
    }, {
        key: "sortBy",
        value: function sortBy(key, context) {
            return orange_1.sortBy(this._models, key, context);
        }
    }, {
        key: "push",
        value: function push(model) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.add(model, orange_1.extend({ at: this.length }, options));
        }
    }, {
        key: "reset",
        value: function reset(models) {
            var _this2 = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this.forEach(function (model) {
                _this2._removeReference(model, options);
            });
            options.previousModels = this.models;
            this._reset();
            models = this.add(models, options);
            if (!options.silent) this.trigger('reset', this, options);
            return models;
        }
    }, {
        key: "create",
        value: function create(values) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? { add: true } : arguments[1];

            var model = new this.Model(values, options);
            if (options.add) this.add(model);
            return model;
        }
    }, {
        key: "parse",
        value: function parse(models) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return models;
        }
    }, {
        key: "find",
        value: function find(nidOrFn) {
            var model = undefined;
            if (typeof nidOrFn === 'function') {
                model = orange_1.find(this.models, nidOrFn);
            } else {
                model = orange_1.find(this.models, function (model) {
                    return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
                });
            }
            return model;
        }
    }, {
        key: "forEach",
        value: function forEach(iterator, ctx) {
            for (var i = 0, l = this.models.length; i < l; i++) {
                iterator.call(ctx || this, this.models[i], i);
            }
            return this;
        }
    }, {
        key: "map",
        value: function map(iterator, thisArgs) {
            var out = [];
            for (var i = 0, ii = this.length; i < ii; i++) {
                out.push(iterator.call(thisArgs, this.models[i], i, this));
            }
            return out;
        }
    }, {
        key: "filter",
        value: function filter(fn) {
            var out = [];
            this.forEach(function (m, i) {
                if (fn(m, i)) out.push(m);
            });
            return out;
        }
    }, {
        key: "indexOf",
        value: function indexOf(model) {
            return this.models.indexOf(model);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.models.map(function (m) {
                return m.toJSON();
            });
        }
    }, {
        key: "_prepareModel",
        value: function _prepareModel(value) {
            if (model_1.isModel(value)) return value;
            if (orange_1.isObject(value)) return new this.Model(value, { parse: true });
            throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
        }
    }, {
        key: "_removeReference",
        value: function _removeReference(model, options) {
            if (this === model.collection) delete model.collection;
            this.stopListening(model);
        }
    }, {
        key: "_addReference",
        value: function _addReference(model, options) {
            if (!model.collection) model.collection = this;
            this.listenTo(model, 'all', this._onModelEvent);
        }
    }, {
        key: "_reset",
        value: function _reset() {
            this._models = [];
        }
    }, {
        key: "_onModelEvent",
        value: function _onModelEvent(event, model, collection, options) {
            if ((event === 'add' || event === 'remove') && collection !== this) return;
            if (event === 'destroy') this.remove(model, options);
            orange_1.callFunc(this.trigger, this, orange_1.slice(arguments));
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var _this3 = this;

            this.models.forEach(function (m) {
                if (typeof m.destroy === 'function' && m.collection == _this3) m.destroy();
            });
            _get(Object.getPrototypeOf(Collection.prototype), "destroy", this).call(this);
        }
    }, {
        key: "__classType",
        get: function get() {
            return 'Collection';
        }
    }, {
        key: "length",
        get: function get() {
            return this.models.length;
        }
    }, {
        key: "Model",
        get: function get() {
            if (!this._model) {
                this._model = model_1.Model;
            }
            return this._model;
        },
        set: function set(con) {
            this._model = con;
        }
    }, {
        key: "models",
        get: function get() {
            return this._models || (this._models = []);
        }
    }]);

    return Collection;
})(object_1.BaseObject);

exports.Collection = Collection;