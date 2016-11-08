(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("eventsjs"), require("orange"), require("orange.request"));
	else if(typeof define === 'function' && define.amd)
		define(["eventsjs", "orange", "orange.request"], factory);
	else if(typeof exports === 'object')
		exports["collection"] = factory(require("eventsjs"), require("orange"), require("orange.request"));
	else
		root["collection"] = factory(root["eventsjs"], root["orange"], root["orange"]["request"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(11));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(2);
	var model_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(4);
	function isCollection(a) {
	    if (a == null)
	        return false;
	    return (a instanceof Collection) || a.__classType == 'Collection' || a.__classType == 'RestCollection';
	}
	exports.isCollection = isCollection;
	var setOptions = { add: true, remove: true, merge: true };
	var addOptions = { add: true, remove: false };
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(models, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this);
	        this.options = options;
	        if (this.options.model) {
	            this.Model = this.options.model;
	        }
	        if (models) {
	            this.add(models);
	        }
	    }
	    Object.defineProperty(Collection.prototype, "__classType", {
	        get: function () { return 'Collection'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Collection.prototype, "length", {
	        get: function () {
	            return this.models.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "Model", {
	        get: function () {
	            if (!this._model) {
	                this._model = model_1.Model;
	            }
	            return this._model;
	        },
	        set: function (con) {
	            this._model = con;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "models", {
	        get: function () {
	            return this._models || (this._models = []);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.add = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        if (!Array.isArray(models)) {
	            if (!(models instanceof this.Model)) {
	                models = this._prepareModel(models);
	            }
	        }
	        else {
	            models = models.map(function (item) {
	                return (item instanceof _this.Model) ? item : (_this._prepareModel(item));
	            });
	        }
	        this.set(models, orange_1.extend({ merge: false }, options, addOptions));
	    };
	    Collection.prototype.set = function (items, options) {
	        if (options === void 0) { options = {}; }
	        options = orange_1.extend({}, setOptions, options);
	        if (options.parse)
	            items = this.parse(items, options);
	        var singular = !Array.isArray(items);
	        var models = (singular ? (items ? [items] : []) : items.slice());
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
	    };
	    Collection.prototype.remove = function (models, options) {
	        if (options === void 0) { options = {}; }
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
	    };
	    Collection.prototype.get = function (id) {
	        return this.find(id);
	    };
	    Collection.prototype.at = function (index) {
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (options) {
	        options = options || this.options;
	        return new this.constructor(this.models, options);
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) { options = {}; }
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
	    };
	    Collection.prototype.sortBy = function (key, context) {
	        return orange_1.sortBy(this._models, key, context);
	    };
	    Collection.prototype.push = function (model, options) {
	        if (options === void 0) { options = {}; }
	        return this.add(model, orange_1.extend({ at: this.length }, options));
	    };
	    Collection.prototype.reset = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        this.forEach(function (model) {
	            _this._removeReference(model, options);
	        });
	        options.previousModels = this.models;
	        this._reset();
	        models = this.add(models, options);
	        if (!options.silent)
	            this.trigger('reset', this, options);
	        return models;
	    };
	    Collection.prototype.create = function (values, options) {
	        if (options === void 0) { options = { add: true }; }
	        var model = new this.Model(values, options);
	        if (options.add)
	            this.add(model);
	        return model;
	    };
	    Collection.prototype.parse = function (models, options) {
	        if (options === void 0) { options = {}; }
	        return models;
	    };
	    Collection.prototype.find = function (nidOrFn) {
	        var model;
	        if (typeof nidOrFn === 'function') {
	            model = orange_1.find(this.models, nidOrFn);
	        }
	        else {
	            model = orange_1.find(this.models, function (model) {
	                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
	            });
	        }
	        return model;
	    };
	    Collection.prototype.forEach = function (iterator, ctx) {
	        for (var i = 0, l = this.models.length; i < l; i++) {
	            iterator.call(ctx || this, this.models[i], i);
	        }
	        return this;
	    };
	    Collection.prototype.map = function (iterator, thisArgs) {
	        var out = [];
	        for (var i = 0, ii = this.length; i < ii; i++) {
	            out.push(iterator.call(thisArgs, this.models[i], i, this));
	        }
	        return out;
	    };
	    Collection.prototype.filter = function (fn) {
	        var out = [];
	        this.forEach(function (m, i) {
	            if (fn(m, i))
	                out.push(m);
	        });
	        return out;
	    };
	    Collection.prototype.indexOf = function (model) {
	        return this.models.indexOf(model);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (m) { return m.toJSON(); });
	    };
	    Collection.prototype._prepareModel = function (value) {
	        if (model_1.isModel(value))
	            return value;
	        if (orange_1.isObject(value))
	            return new this.Model(value, { parse: true });
	        throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
	    };
	    Collection.prototype._removeReference = function (model, options) {
	        if (this === model.collection)
	            delete model.collection;
	        this.stopListening(model);
	    };
	    Collection.prototype._addReference = function (model, options) {
	        if (!model.collection)
	            model.collection = this;
	        this.listenTo(model, 'all', this._onModelEvent);
	    };
	    Collection.prototype._reset = function () {
	        this._models = [];
	    };
	    Collection.prototype._onModelEvent = function (event, model, collection, options) {
	        if ((event === 'add' || event === 'remove') && collection !== this)
	            return;
	        if (event === 'destroy')
	            this.remove(model, options);
	        orange_1.callFunc(this.trigger, this, orange_1.slice(arguments));
	    };
	    Collection.prototype.destroy = function () {
	        var _this = this;
	        this.models.forEach(function (m) {
	            if (typeof m.destroy === 'function' &&
	                m.collection == _this)
	                m.destroy();
	        });
	        _super.prototype.destroy.call(this);
	    };
	    return Collection;
	}(object_1.BaseObject));
	exports.Collection = Collection;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var eventsjs_1 = __webpack_require__(3);
	var orange_1 = __webpack_require__(4);
	var BaseObject = (function (_super) {
	    __extends(BaseObject, _super);
	    function BaseObject() {
	        _super.apply(this, arguments);
	    }
	    BaseObject.extend = function (proto, stat) {
	        return orange_1.inherits(this, proto, stat);
	    };
	    return BaseObject;
	}(eventsjs_1.EventEmitter));
	exports.BaseObject = BaseObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(2);
	var orange_1 = __webpack_require__(4);
	function isModel(a) {
	    if (a == null)
	        return false;
	    return (a instanceof Model) || a.__classType === 'Model' || a.__classType === 'RestModel';
	}
	exports.isModel = isModel;
	var Model = (function (_super) {
	    __extends(Model, _super);
	    function Model(attributes, options) {
	        if (attributes === void 0) { attributes = {}; }
	        if (options === void 0) { options = {}; }
	        _super.call(this);
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
	    Object.defineProperty(Model.prototype, "__classType", {
	        get: function () { return 'Model'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Model.prototype, "id", {
	        get: function () {
	            if (this.idAttribute in this._attributes)
	                return this._attributes[this.idAttribute];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "isNew", {
	        get: function () {
	            return this.id == null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "isDirty", {
	        get: function () {
	            return this.hasChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.set = function (key, val, options) {
	        if (options === void 0) { options = {}; }
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
	    };
	    Model.prototype.get = function (key) {
	        return this._attributes[key];
	    };
	    Model.prototype.unset = function (key, options) {
	        this.set(key, void 0, orange_1.extend({}, options, { unset: true }));
	    };
	    Model.prototype.has = function (attr) {
	        return this.get(attr) != null;
	    };
	    Model.prototype.hasChanged = function (attr) {
	        if (attr == null)
	            return !!Object.keys(this.changed).length;
	        return orange_1.has(this.changed, attr);
	    };
	    Model.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this._attributes)
	            attrs[key] = void 0;
	        return this.set(attrs, orange_1.extend({}, options, { unset: true }));
	    };
	    Object.defineProperty(Model.prototype, "changed", {
	        get: function () {
	            return orange_1.extend({}, this._changed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.changedAttributes = function (diff) {
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
	    };
	    Model.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes)
	            return null;
	        return this._previousAttributes[attr];
	    };
	    Model.prototype.previousAttributes = function () {
	        return orange_1.extend(Object.create(null), this._previousAttributes);
	    };
	    Model.prototype.toJSON = function () {
	        return JSON.parse(JSON.stringify(this._attributes));
	    };
	    Model.prototype.clone = function () {
	        return new (this.constructor)(this._attributes, this.options);
	    };
	    Model.prototype.parse = function (attr, options) {
	        return attr;
	    };
	    Model.prototype.remove = function (options) {
	        this.trigger('remove', this, this.collection, options);
	    };
	    Model.prototype.pick = function (attr) {
	        var attrs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            attrs[_i - 1] = arguments[_i];
	        }
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
	        var out = {};
	        for (var i = 0, ii = attrs.length; i < ii; i++) {
	            if (this.has(attrs[i]))
	                out[attrs[i]] = this.get(attrs[i]);
	        }
	        return out;
	    };
	    return Model;
	}(object_1.BaseObject));
	exports.Model = Model;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(5);
	function objToPaths(obj, separator, array) {
	    if (separator === void 0) { separator = "."; }
	    if (array === void 0) { array = true; }
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
	function isOnNestedModel(obj, path, separator) {
	    if (separator === void 0) { separator = "."; }
	    var fields = path ? path.split(separator) : [];
	    if (!obj)
	        return false;
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (model_1.isModel(result))
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
	            var curVal = getNested(current, attr);
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
	                    if (model_1.isModel(val)) {
	                        var fn = function (model) {
	                            if (model.changed == undefined || orange_1.isEmpty(model.changed))
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
	                setNested(current, attr, val, options);
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
	        return this.set(attrs, orange_1.extend({}, options, {
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
	            if (orange_1.equal(old[attr], (val = diff[attr])))
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
	        return orange_1.extend({}, this._previousAttributes);
	    };
	    NestedModel.prototype.pick = function (attr) {
	        var attrs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            attrs[_i - 1] = arguments[_i];
	        }
	        if (arguments.length === 1) {
	            attr = !Array.isArray(attr) ? [attr] : attr;
	        }
	        else {
	            attrs = [attr].concat(attrs);
	        }
	        var out = {};
	        for (var i = 0, ii = attrs.length; i < ii; i++) {
	            if (this.has(attrs[i])) {
	                setNested(out, attrs[i], this.get(attrs[i]));
	            }
	        }
	        return out;
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
	}(model_1.Model));
	exports.NestedModel = NestedModel;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(4);
	var collection_1 = __webpack_require__(1);
	var rest_model_1 = __webpack_require__(8);
	var persistence_1 = __webpack_require__(9);
	function isRestCollection(a) {
	    if (a == null)
	        return false;
	    return (a instanceof RestCollection) || a.__classType == 'RestCollection';
	}
	exports.isRestCollection = isRestCollection;
	var RestCollection = (function (_super) {
	    __extends(RestCollection, _super);
	    function RestCollection(models, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, models, options);
	        this.Model = rest_model_1.RestModel;
	        if (options.url)
	            this.url = options.url;
	        this.options.queryParameter = this.options.queryParameter || 'q';
	    }
	    Object.defineProperty(RestCollection.prototype, "__classType", {
	        get: function () { return 'RestCollection'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    RestCollection.prototype.getURL = function () {
	        return typeof this.url === 'function' ? this.url() : this.url;
	    };
	    RestCollection.prototype.fetch = function (options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        var url = this.getURL();
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        this.trigger('before:fetch');
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (results) {
	            _this[options.reset ? 'reset' : 'set'](results.content, options);
	            _this.trigger('fetch');
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	    };
	    RestCollection.prototype.create = function (value, options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        var model;
	        var url = this.getURL();
	        if (url == null)
	            throw new Error('Url or rootURL no specified');
	        options.url = url;
	        if (rest_model_1.isRestModel(value)) {
	            model = value;
	        }
	        else {
	            model = new this.Model(value, { parse: true, url: this.getURL() });
	        }
	        if (options.wait === void 0)
	            options.wait = true;
	        if (!options.wait)
	            this.add(model, options);
	        this.trigger('before:create', this, model, value, options);
	        model.save().then(function () {
	            if (!options.wait)
	                _this.add(model, options);
	            _this.trigger('create', _this, model, value, options);
	            if (options.complete)
	                options.complete(null, model);
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            if (options.complete)
	                options.complete(e, null);
	        });
	        return model;
	    };
	    RestCollection.prototype.query = function (term, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var params = (_a = {}, _a[this.options.queryParameter] = term, _a);
	        var url = this.getURL();
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        if (!options.params)
	            options.params = {};
	        orange_1.extend(options.params, params);
	        this.trigger('before:query');
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (results) {
	            _this.reset(results.content, options);
	            _this.trigger('query');
	            return _this.models;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	        var _a;
	    };
	    RestCollection.prototype.sync = function (method, model, options) {
	        return persistence_1.sync(method, model, options);
	    };
	    return RestCollection;
	}(collection_1.Collection));
	exports.RestCollection = RestCollection;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(5);
	var nested_model_1 = __webpack_require__(6);
	var persistence_1 = __webpack_require__(9);
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
	        options = options ? orange_1.extend({}, options) : {};
	        var url = this.getURL();
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
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
	        options = options ? orange_1.extend({}, options) : {};
	        this.trigger('before:save', this, options);
	        var method = persistence_1.RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
	        var url = this.getURL(this.id);
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
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
	        options = options ? orange_1.extend({}, options) : {};
	        if (this.isNew) {
	            _super.prototype.remove.call(this, options);
	            return orange_1.Promise.resolve(this);
	        }
	        var url = this.getURL(this.id);
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(4);
	var orange_request_1 = __webpack_require__(10);
	var HttpError = (function (_super) {
	    __extends(HttpError, _super);
	    function HttpError(status, message, body) {
	        _super.call(this, message);
	        this.message = message;
	        this.status = status;
	        this.body = body;
	    }
	    return HttpError;
	}(Error));
	exports.HttpError = HttpError;
	(function (RestMethod) {
	    RestMethod[RestMethod["Create"] = 0] = "Create";
	    RestMethod[RestMethod["Update"] = 1] = "Update";
	    RestMethod[RestMethod["Read"] = 2] = "Read";
	    RestMethod[RestMethod["Patch"] = 3] = "Patch";
	    RestMethod[RestMethod["Delete"] = 4] = "Delete";
	})(exports.RestMethod || (exports.RestMethod = {}));
	var RestMethod = exports.RestMethod;
	;
	var xmlRe = /^(?:application|text)\/xml/;
	var jsonRe = /^application\/json/;
	var getData = function (accepts, xhr) {
	    if (accepts == null)
	        accepts = xhr.getResponseHeader('content-type');
	    if (xmlRe.test(accepts)) {
	        return xhr.responseXML;
	    }
	    else if (jsonRe.test(accepts) && xhr.responseText !== '') {
	        return JSON.parse(xhr.responseText);
	    }
	    else {
	        return xhr.responseText;
	    }
	};
	var isValid = function (xhr) {
	    return (xhr.status >= 200 && xhr.status < 300) ||
	        (xhr.status === 304) ||
	        (xhr.status === 0 && window.location.protocol === 'file:');
	};
	function sync(method, model, options) {
	    var http;
	    switch (method) {
	        case RestMethod.Create:
	            http = orange_request_1.HttpMethod.POST;
	            break;
	        case RestMethod.Update:
	            http = orange_request_1.HttpMethod.PUT;
	            break;
	        case RestMethod.Patch:
	            http = orange_request_1.HttpMethod.PATCH;
	            break;
	        case RestMethod.Delete:
	            http = orange_request_1.HttpMethod.DELETE;
	            break;
	        case RestMethod.Read:
	            http = orange_request_1.HttpMethod.GET;
	            break;
	        default:
	            return orange_1.Promise.reject(new Error("Sync: does not recognise method: " + method));
	    }
	    var request = new orange_request_1.HttpRequest(http, options.url);
	    if (options.params)
	        request.params(options.params);
	    if (options.headers)
	        request.header(options.headers);
	    request.header('Content-Type', 'application/json');
	    if (!(options.headers && options.headers['Accept'])) {
	        request.header('Accept', 'application/json');
	    }
	    if (options.beforeSend)
	        options.beforeSend(request);
	    var data = undefined;
	    if (http == orange_request_1.HttpMethod.PATCH || http === orange_request_1.HttpMethod.PUT || http === orange_request_1.HttpMethod.POST) {
	        data = JSON.stringify(model.toJSON());
	    }
	    return request.end(data)
	        .then(function (res) {
	        if (!res.isValid) {
	            return res.text().then(function (t) { throw new HttpError(res.status, res.statusText, t); });
	        }
	        return res.json()
	            .then(function (json) {
	            return {
	                method: method,
	                status: res.status,
	                content: json,
	                headers: new orange_request_1.Headers(res.headers)
	            };
	        });
	    });
	}
	exports.sync = sync;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var collection_1 = __webpack_require__(1);
	var rest_collection_1 = __webpack_require__(7);
	var orange_1 = __webpack_require__(4);
	var persistence_1 = __webpack_require__(9);
	var orange_request_1 = __webpack_require__(10);
	var PARAM_TRIM_RE = /[\s'"]/g;
	var URL_TRIM_RE = /[<>\s'"]/g;
	function queryStringToParams(qs) {
	    var kvp, k, v, ls, params = {}, decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null)
	            v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls))
	            ls.push(v);
	        else if (ls)
	            params[k] = [ls, v];
	        else
	            params[k] = v;
	    }
	    return params;
	}
	var PaginatedCollection = (function (_super) {
	    __extends(PaginatedCollection, _super);
	    function PaginatedCollection(models, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, models, options);
	        this._state = { first: 1, last: -1, current: 1, size: 10 };
	        this._link = {};
	        this.queryParams = {
	            page: 'page',
	            size: 'pageSize'
	        };
	        if (options.queryParams) {
	            orange_1.extend(this.queryParams, options.queryParams);
	        }
	        if (options.firstPage)
	            this._state.first = options.firstPage;
	        if (options.pageSize)
	            this._state.size = options.pageSize;
	        this._state.current = this._state.first;
	        this._page = new collection_1.Collection();
	        this._page.Model = this.Model;
	    }
	    Object.defineProperty(PaginatedCollection.prototype, "page", {
	        get: function () {
	            return this._page;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PaginatedCollection.prototype.hasNext = function () {
	        return this.hasPage(this._state.current + 1);
	    };
	    PaginatedCollection.prototype.hasPrevious = function () {
	        return this.hasPage(this._state.current - 1);
	    };
	    PaginatedCollection.prototype.hasPage = function (page) {
	        if (this._state.last > -1) {
	            return page <= this._state.last;
	        }
	        return false;
	    };
	    PaginatedCollection.prototype.getPreviousPage = function (options) {
	        options = options ? orange_1.extend({}, options) : {};
	        options.page = this._state.current - 1;
	        return this.getPage(options);
	    };
	    PaginatedCollection.prototype.getNextPage = function (options) {
	        options = options ? orange_1.extend({}, options) : {};
	        options.page = this._state.current + 1;
	        return this.getPage(options);
	    };
	    PaginatedCollection.prototype.getPage = function (options) {
	        options = options ? orange_1.extend({}, options) : {};
	        if (options.page === void 0)
	            return orange_1.Promise.reject(new Error("No page"));
	        if (this._state.last < options.page && this._state.last != -1) {
	            options.page = this._state.last;
	        }
	        else if (options.page < this._state.first) {
	            options.page = this._state.first;
	        }
	        return this.fetch(options);
	    };
	    PaginatedCollection.prototype.fetch = function (options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        options = options ? orange_1.extend({}, options) : {};
	        var url;
	        if (!orange_1.has(options, 'page')) {
	            options.page = this._state.current;
	        }
	        var params = options.params ? orange_1.extend({}, options.params) : {};
	        if (orange_1.has(params, this.queryParams.page))
	            delete params[this.queryParams.page];
	        url = this._link[options.page];
	        if (!url) {
	            url = this.getURL();
	        }
	        if (!url)
	            return orange_1.Promise.reject(new Error("no url specified"));
	        var idx = url.indexOf('?');
	        if (idx > -1) {
	            params = orange_1.extend(params, queryStringToParams(url.substr(idx + 1)));
	            url = url.substr(0, idx);
	        }
	        if (!orange_1.has(params, this.queryParams.page)) {
	            params[this.queryParams.page] = options.page;
	        }
	        options.params = params;
	        options.url = url;
	        this.trigger('before:fetch', this, options);
	        params[this.queryParams.size] = this._state.size;
	        if (!this._link[options.page + '']) {
	            this._link[options.page] = url + '?' + orange_request_1.queryParam({ page: options.page });
	        }
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (resp) {
	            _this._processResponse(resp, options);
	            _this.trigger('fetch', _this, resp, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	    };
	    PaginatedCollection.prototype._processResponse = function (resp, options) {
	        var currentPage = options.page;
	        var links = this._parseLinkHeaders(resp);
	        if (links.first)
	            this._link[this._state.first] = links.first;
	        if (links.prev)
	            this._link[currentPage - 1] = links.prev;
	        if (links.next)
	            this._link[currentPage + 1] = links.next;
	        if (links.last) {
	            var last = links.last;
	            var idx = last.indexOf('?');
	            if (idx > -1) {
	                var params = queryStringToParams(last.substr(idx + 1));
	                if (orange_1.has(params, this.queryParams.page)) {
	                    this._link[params[this.queryParams.page]] = last;
	                    this._state.last = parseInt(params[this.queryParams.page]);
	                }
	            }
	        }
	        this._state.current = currentPage;
	        var data = resp.content;
	        if (data && !Array.isArray(data))
	            data = [data];
	        if (!data)
	            return this;
	        data = this.parse(data);
	        for (var i = 0, ii = data.length; i < ii; i++) {
	            data[i] = this._prepareModel(data[i]);
	        }
	        this.add(data);
	        return this;
	    };
	    PaginatedCollection.prototype._parseLinkHeaders = function (resp) {
	        var link = {};
	        var linkHeader = resp.headers.get('Link');
	        if (!linkHeader)
	            return link;
	        linkHeader = linkHeader.split(',');
	        var relations = ['first', 'prev', 'next', 'last'];
	        for (var i = 0, ii = linkHeader.length; i < ii; i++) {
	            var linkParts = linkHeader[i].split(';'), url = linkParts[0].replace(URL_TRIM_RE, ''), params = linkParts.slice(1);
	            for (var x = 0, xx = params.length; x < xx; x++) {
	                var paramParts = params[x].split('='), key = paramParts[0].replace(PARAM_TRIM_RE, ''), value = paramParts[1].replace(PARAM_TRIM_RE, '');
	                if (key == 'rel' && !!~relations.indexOf(value))
	                    link[value] = url;
	            }
	        }
	        return link;
	    };
	    return PaginatedCollection;
	}(rest_collection_1.RestCollection));
	exports.PaginatedCollection = PaginatedCollection;


/***/ }
/******/ ])
});
;