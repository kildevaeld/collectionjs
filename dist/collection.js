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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(1));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(11));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x10, _x11, _x12) { var _again = true; _function: while (_again) { var object = _x10, property = _x11, receiver = _x12; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x10 = parent; _x11 = property; _x12 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var object_1 = __webpack_require__(2);
	var model_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(4);
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var eventsjs_1 = __webpack_require__(3);
	var orange_1 = __webpack_require__(4);

	var BaseObject = (function (_eventsjs_1$EventEmitter) {
	    _inherits(BaseObject, _eventsjs_1$EventEmitter);

	    function BaseObject() {
	        _classCallCheck(this, BaseObject);

	        _get(Object.getPrototypeOf(BaseObject.prototype), "constructor", this).apply(this, arguments);
	    }

	    return BaseObject;
	})(eventsjs_1.EventEmitter);

	BaseObject.extend = function (proto, stat) {
	    return orange_1.inherits(this, proto, stat);
	};
	exports.BaseObject = BaseObject;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var object_1 = __webpack_require__(2);
	var orange_1 = __webpack_require__(4);
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(5);
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var collection_1 = __webpack_require__(1);
	var rest_model_1 = __webpack_require__(8);
	var persistence_1 = __webpack_require__(9);
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(5);
	var nested_model_1 = __webpack_require__(6);
	var persistence_1 = __webpack_require__(9);
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var orange_request_1 = __webpack_require__(10);

	var HttpError = (function (_Error) {
	    _inherits(HttpError, _Error);

	    function HttpError(status, message, body) {
	        _classCallCheck(this, HttpError);

	        _get(Object.getPrototypeOf(HttpError.prototype), "constructor", this).call(this, message);
	        this.message = message;
	        this.status = status;
	        this.body = body;
	    }

	    return HttpError;
	})(Error);

	exports.HttpError = HttpError;
	var RestMethod;
	(function (RestMethod) {
	    RestMethod[RestMethod["Create"] = 0] = "Create";
	    RestMethod[RestMethod["Update"] = 1] = "Update";
	    RestMethod[RestMethod["Read"] = 2] = "Read";
	    RestMethod[RestMethod["Patch"] = 3] = "Patch";
	    RestMethod[RestMethod["Delete"] = 4] = "Delete";
	})(RestMethod = exports.RestMethod || (exports.RestMethod = {}));
	;
	var xmlRe = /^(?:application|text)\/xml/;
	var jsonRe = /^application\/json/;
	var getData = function getData(accepts, xhr) {
	    if (accepts == null) accepts = xhr.getResponseHeader('content-type');
	    if (xmlRe.test(accepts)) {
	        return xhr.responseXML;
	    } else if (jsonRe.test(accepts) && xhr.responseText !== '') {
	        return JSON.parse(xhr.responseText);
	    } else {
	        return xhr.responseText;
	    }
	};
	var isValid = function isValid(xhr) {
	    return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && window.location.protocol === 'file:';
	};
	function sync(method, model, options) {
	    var http = undefined;
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
	    if (options.params) request.params(options.params);
	    if (options.headers) request.header(options.headers);
	    request.header('Content-Type', 'application/json');
	    if (!(options.headers && options.headers['Accept'])) {
	        request.header('Accept', 'application/json');
	    }
	    if (options.beforeSend) options.beforeSend(request);
	    var data = undefined;
	    if (http == orange_request_1.HttpMethod.PATCH || http === orange_request_1.HttpMethod.PUT || http === orange_request_1.HttpMethod.POST) {
	        data = JSON.stringify(model.toJSON());
	    }
	    return request.end(data).then(function (res) {
	        if (!res.isValid) {
	            return res.text().then(function (t) {
	                throw new HttpError(res.status, res.statusText, t);
	            });
	        }
	        return res.json().then(function (json) {
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var collection_1 = __webpack_require__(1);
	var rest_collection_1 = __webpack_require__(7);
	var orange_1 = __webpack_require__(4);
	var persistence_1 = __webpack_require__(9);
	var orange_request_1 = __webpack_require__(10);
	var PARAM_TRIM_RE = /[\s'"]/g;
	var URL_TRIM_RE = /[<>\s'"]/g;
	function queryStringToParams(qs) {
	    var kvp,
	        k,
	        v,
	        ls,
	        params = {},
	        decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null) v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls)) ls.push(v);else if (ls) params[k] = [ls, v];else params[k] = v;
	    }
	    return params;
	}

	var PaginatedCollection = (function (_rest_collection_1$RestCollection) {
	    _inherits(PaginatedCollection, _rest_collection_1$RestCollection);

	    function PaginatedCollection(models) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, PaginatedCollection);

	        _get(Object.getPrototypeOf(PaginatedCollection.prototype), "constructor", this).call(this, models, options);
	        this._state = { first: 1, last: -1, current: 1, size: 10 };
	        this._link = {};
	        this.queryParams = {
	            page: 'page',
	            size: 'pageSize'
	        };
	        if (options.queryParams) {
	            orange_1.extend(this.queryParams, options.queryParams);
	        }
	        if (options.firstPage) this._state.first = options.firstPage;
	        if (options.pageSize) this._state.size = options.pageSize;
	        this._state.current = this._state.first;
	        this._page = new collection_1.Collection();
	        this._page.Model = this.Model;
	    }

	    _createClass(PaginatedCollection, [{
	        key: "hasNext",
	        value: function hasNext() {
	            return this.hasPage(this._state.current + 1);
	        }
	    }, {
	        key: "hasPrevious",
	        value: function hasPrevious() {
	            return this.hasPage(this._state.current - 1);
	        }
	    }, {
	        key: "hasPage",
	        value: function hasPage(page) {
	            if (this._state.last > -1) {
	                return page <= this._state.last;
	            }
	            return false;
	        }
	    }, {
	        key: "getPreviousPage",
	        value: function getPreviousPage(options) {
	            options = options ? orange_1.extend({}, options) : {};
	            options.page = this._state.current - 1;
	            return this.getPage(options);
	        }
	    }, {
	        key: "getNextPage",
	        value: function getNextPage(options) {
	            options = options ? orange_1.extend({}, options) : {};
	            options.page = this._state.current + 1;
	            return this.getPage(options);
	        }
	    }, {
	        key: "getPage",
	        value: function getPage(options) {
	            options = options ? orange_1.extend({}, options) : {};
	            if (options.page === void 0) return orange_1.Promise.reject(new Error("No page"));
	            if (this._state.last < options.page && this._state.last != -1) {
	                options.page = this._state.last;
	            } else if (options.page < this._state.first) {
	                options.page = this._state.first;
	            }
	            return this.fetch(options);
	        }
	    }, {
	        key: "fetch",
	        value: function fetch() {
	            var _this = this;

	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            options = options ? orange_1.extend({}, options) : {};
	            var url = undefined;
	            if (!orange_1.has(options, 'page')) {
	                options.page = this._state.current;
	            }
	            var params = options.params ? orange_1.extend({}, options.params) : {};
	            if (orange_1.has(params, this.queryParams.page)) delete params[this.queryParams.page];
	            url = this._link[options.page];
	            if (!url) {
	                url = this.getURL();
	            }
	            if (!url) return orange_1.Promise.reject(new Error("no url specified"));
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
	            return this.sync(persistence_1.RestMethod.Read, this, options).then(function (resp) {
	                _this._processResponse(resp, options);
	                _this.trigger('fetch', _this, resp, options);
	                return _this;
	            })["catch"](function (e) {
	                _this.trigger('error', e);
	                throw e;
	            });
	        }
	    }, {
	        key: "_processResponse",
	        value: function _processResponse(resp, options) {
	            var currentPage = options.page;
	            var links = this._parseLinkHeaders(resp);
	            if (links.first) this._link[this._state.first] = links.first;
	            if (links.prev) this._link[currentPage - 1] = links.prev;
	            if (links.next) this._link[currentPage + 1] = links.next;
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
	            if (data && !Array.isArray(data)) data = [data];
	            if (!data) return this;
	            data = this.parse(data);
	            for (var i = 0, ii = data.length; i < ii; i++) {
	                data[i] = this._prepareModel(data[i]);
	            }
	            this.add(data);
	            return this;
	        }
	    }, {
	        key: "_parseLinkHeaders",
	        value: function _parseLinkHeaders(resp) {
	            var link = {};
	            var linkHeader = resp.headers.get('Link');
	            if (!linkHeader) return link;
	            linkHeader = linkHeader.split(',');
	            var relations = ['first', 'prev', 'next', 'last'];
	            for (var i = 0, ii = linkHeader.length; i < ii; i++) {
	                var linkParts = linkHeader[i].split(';'),
	                    url = linkParts[0].replace(URL_TRIM_RE, ''),
	                    params = linkParts.slice(1);
	                for (var x = 0, xx = params.length; x < xx; x++) {
	                    var paramParts = params[x].split('='),
	                        key = paramParts[0].replace(PARAM_TRIM_RE, ''),
	                        value = paramParts[1].replace(PARAM_TRIM_RE, '');
	                    if (key == 'rel' && !! ~relations.indexOf(value)) link[value] = url;
	                }
	            }
	            return link;
	        }
	    }, {
	        key: "_reset",
	        value: function _reset() {
	            _get(Object.getPrototypeOf(PaginatedCollection.prototype), "_reset", this).call(this);
	            this._state = { first: 1, last: -1, current: 1, size: this._state.size };
	            this._link = {};
	        }
	    }, {
	        key: "page",
	        get: function get() {
	            return this._page;
	        }
	    }]);

	    return PaginatedCollection;
	})(rest_collection_1.RestCollection);

	exports.PaginatedCollection = PaginatedCollection;

/***/ })
/******/ ])
});
;