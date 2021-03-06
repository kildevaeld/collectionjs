(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["collection"] = factory();
	else
		root["collection"] = factory();
})(this, function() {
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
	__export(__webpack_require__(11));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));
	__export(__webpack_require__(25));

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
	var model_1 = __webpack_require__(11);
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

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var idCounter = 0;
	function getID() {
	    return "" + (++idCounter);
	}
	/**
	 *
	 *
	 * @export
	 * @class EventEmitterError
	 * @extends {Error}
	 */
	var EventEmitterError = (function (_super) {
	    __extends(EventEmitterError, _super);
	    /**
	     * Creates an instance of EventEmitterError.
	     *
	     * @param {string} [message]
	     * @param {string} [method]
	     * @param {*} [klass]
	     * @param {*} [ctx]
	     *
	     * @memberOf EventEmitterError
	     */
	    function EventEmitterError(message, method, klass, ctx) {
	        _super.call(this, message);
	        this.message = message;
	        this.method = method;
	        this.klass = klass;
	        this.ctx = ctx;
	    }
	    /**
	     *
	     *
	     * @returns
	     *
	     * @memberOf EventEmitterError
	     */
	    EventEmitterError.prototype.toString = function () {
	        var prefix = "EventEmitterError";
	        if (this.method && this.method != "") {
	            prefix = "EventEmitter#" + this.method;
	        }
	        return prefix + ": " + this.message;
	    };
	    return EventEmitterError;
	}(Error));
	exports.EventEmitterError = EventEmitterError;
	function removeFromListener(listeners, fn, ctx) {
	    for (var i = 0; i < listeners.length; i++) {
	        var e = listeners[i];
	        if ((fn == null && ctx != null && e.ctx === ctx) ||
	            (fn != null && ctx == null && e.handler === fn) ||
	            (fn != null && ctx != null && e.handler === fn && e.ctx === ctx)) {
	            listeners.splice(i, 1);
	        }
	    }
	    return listeners;
	}
	/**
	 *
	 *
	 * @export
	 * @param {Events[]} fn
	 * @param {any[]} [args=[]]
	 * @returns
	 */
	function callFunc(fn, args) {
	    if (args === void 0) { args = []; }
	    var l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx);
	            return;
	        case 1:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1);
	            return;
	        case 2:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2);
	            return;
	        case 3:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
	            return;
	        case 4:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
	            return;
	        default:
	            while (++i < l)
	                fn[i].handler.apply(fn[i].ctx, args);
	            return;
	    }
	}
	exports.callFunc = callFunc;
	/**
	 *
	 *
	 * @export
	 * @param {*} a
	 * @returns {a is Function}
	 */
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	/**
	 *
	 *
	 * @export
	 * @param {*} a
	 * @returns {a is EventEmitter}
	 */
	function isEventEmitter(a) {
	    return a && (a instanceof EventEmitter || (isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger)));
	}
	exports.isEventEmitter = isEventEmitter;
	/**
	 *
	 *
	 * @export
	 * @class EventEmitter
	 * @implements {IEventEmitter}
	 * @implements {Destroyable}
	 */
	var EventEmitter = (function () {
	    function EventEmitter() {
	    }
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        /**
	         *
	         *
	         * @readonly
	         * @type {{ [key: string]: Events[] }}
	         * @memberOf EventEmitter
	         */
	        get: function () {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     *
	     *
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @param {boolean} [once=false]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        events.push({
	            name: event,
	            once: once,
	            handler: fn,
	            ctx: ctx || this
	        });
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    /**
	     *
	     *
	     * @param {string} [eventName]
	     * @param {EventHandler} [fn]
	     * @param {*} [ctx]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.off = function (eventName, fn, ctx) {
	        this._listeners = this._listeners || {};
	        if (eventName == null && ctx == null) {
	            this._listeners = {};
	        }
	        else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null && ctx == null) {
	                this._listeners[eventName] = [];
	            }
	            else {
	                /*for (let i = 0; i < events.length; i++) {
	                  let e = events[i];
	                  if ((fn == null && ctx != null && e.ctx === ctx) ||
	                    (fn != null && ctx == null && e.handler === fn) ||
	                    (fn != null && ctx != null && e.handler === fn && e.ctx === ctx)) {
	                    this._listeners[eventName].splice(i, 1);
	                  }
	                }*/
	                removeFromListener(events, fn, ctx);
	            }
	        }
	        else {
	            for (var en in this.listeners) {
	                var l = this.listeners[en];
	                removeFromListener(l, fn, ctx);
	            }
	        }
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {string} eventName
	     * @param {...any[]} args
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        this._listeners = this._listeners || {};
	        var events = (this._listeners[eventName] || []).concat(this._listeners['all'] || []).concat(this._listeners["*"] || []);
	        if (EventEmitter.debugCallback)
	            EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args, events);
	        var event, a, index;
	        var calls = [];
	        var alls = [];
	        for (var i = 0, ii = events.length; i < ii; i++) {
	            event = events[i];
	            a = args;
	            if (events[i].name == 'all' || events[i].name == '*') {
	                alls.push(events[i]);
	            }
	            else {
	                calls.push(events[i]);
	            }
	            if (events[i].once === true) {
	                index = this._listeners[events[i].name].indexOf(events[i]);
	                this._listeners[events[i].name].splice(index, 1);
	            }
	        }
	        if (alls.length) {
	            var a_1 = [eventName].concat(args);
	            this._executeListener(alls, a_1);
	        }
	        if (calls.length)
	            this._executeListener(calls, args);
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {Events[]} func
	     * @param {any[]} [args]
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype._executeListener = function (func, args) {
	        EventEmitter.executeListenerFunction(func, args);
	    };
	    /**
	     *
	     *
	     * @param {IEventEmitter} obj
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @param {boolean} [once=false]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        if (!isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError)
	                throw new EventEmitterError("obj is not an EventEmitter", once ? "listenToOnce" : "listenTo", this, obj);
	            return this;
	        }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {IEventEmitter} obj
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    /**
	     *
	     *
	     * @param {IEventEmitter} [obj]
	     * @param {string} [event]
	     * @param {EventHandler} [callback]
	     * @returns
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        if (obj && !isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError)
	                throw new EventEmitterError("obj is not an EventEmitter", "stopListening", this, obj);
	            return this;
	        }
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var remove = !event && !callback;
	        if (!callback && typeof event === 'object')
	            callback = this;
	        if (obj)
	            (listeningTo = {})[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length)
	                delete this._listeningTo[id];
	        }
	        return this;
	    };
	    /**
	     *
	     *
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.destroy = function () {
	        this.stopListening();
	        this.off();
	    };
	    /**
	     *
	     *
	     * @static
	     * @type {boolean}
	     * @memberOf EventEmitter
	     */
	    EventEmitter.throwOnError = true;
	    /**
	     *
	     *
	     * @static
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.executeListenerFunction = function (func, args) {
	        callFunc(func, args);
	    };
	    return EventEmitter;
	}());
	exports.EventEmitter = EventEmitter;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(9));
	__export(__webpack_require__(7));
	__export(__webpack_require__(10));
	__export(__webpack_require__(8));
	//export * from './map';

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isString(a) {
	    return typeof a === 'string';
	}
	exports.isString = isString;
	function isNumber(a) {
	    return typeof a === 'number';
	}
	exports.isNumber = isNumber;
	function isRegExp(a) {
	    return a && a instanceof RegExp;
	}
	exports.isRegExp = isRegExp;
	function isDate(a) {
	    return a && a instanceof Date;
	}
	exports.isDate = isDate;
	function isArray(a) {
	    return Array.isArray(a);
	}
	exports.isArray = isArray;
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	var idCounter = 0;
	/** Generate an unique id with an optional prefix
	 * @param { string } prefix
	 * @return { string }
	 */
	function uniqueId() {
	    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function getOption(option, objs) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var o = _step.value;

	            if (isObject(o) && o[option]) return o[option];
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return null;
	}
	exports.getOption = getOption;
	exports.nextTick = function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	}();
	function xmlHttpRequest() {
	    var e;
	    if (window.hasOwnProperty('XMLHttpRequest')) {
	        return new XMLHttpRequest();
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.6.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.3.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp');
	    } catch (_error) {
	        e = _error;
	    }
	    throw e;
	}
	exports.xmlHttpRequest = xmlHttpRequest;
	var _has = Object.prototype.hasOwnProperty;
	function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    //if (a instanceof _) a = a._wrapped;
	    //if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        // Strings, numbers, dates, and booleans are compared by value.
	        case '[object String]':
	            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	            // equivalent to `new String("5")`.
	            return a == String(b);
	        case '[object Number]':
	            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	            // other numeric values.
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	            // millisecond representations. Note that invalid dates with millisecond representations
	            // of `NaN` are not equivalent.
	            return +a == +b;
	        // RegExps are compared by their source patterns and flags.
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	        // Linear search. Performance is inversely proportional to the number of
	        // unique nested structures.
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	        // Compare array lengths to determine if a deep comparison is necessary.
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            // Deep compare the contents, ignoring non-numeric properties.
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        // Deep compare objects.
	        for (var key in a) {
	            if (_has.call(a, key)) {
	                // Count the expected number of properties.
	                size++;
	                // Deep compare each member.
	                if (!(result = _has.call(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        // Ensure that both objects contain the same number of properties.
	        if (result) {
	            for (key in b) {
	                if (_has.call(b, key) && !size--) break;
	            }
	            result = !size;
	        }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var arrays_1 = __webpack_require__(7);
	var strings_1 = __webpack_require__(8);
	var objects_1 = __webpack_require__(9);
	var nativeBind = Function.prototype.bind;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	    }

	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(_toConsumableArray(args)));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx) {
	    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = strings_1.camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent's constructor.
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function child() {
	            return parent.apply(this, arguments);
	        };
	    }
	    // Add static properties to the constructor function, if supplied.
	    objects_1.extend(child, parent, staticProps);
	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function.
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	// Return a new array with duplicates removed

	function unique(array) {
	    var seen = new Map();
	    return array.filter(function (e, i) {
	        if (seen.has(e)) return false;
	        seen.set(e, true);
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (array[i] === item) return i;
	    }return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var v = void 0;
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (callback.call(ctx, array[i])) return array[i];
	    }
	    return null;
	}
	exports.find = find;
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria,
	            b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function truncate(str, length) {
	    var n = str.substring(0, Math.min(length, str.length));
	    return n + (n.length == str.length ? '' : '...');
	}
	exports.truncate = truncate;
	function humanFileSize(bytes) {
	    var si = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    var thresh = si ? 1000 : 1024;
	    if (Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
	    return bytes.toFixed(1) + ' ' + units[u];
	}
	exports.humanFileSize = humanFileSize;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var utils_1 = __webpack_require__(5);
	var arrays_1 = __webpack_require__(7);
	/**
	 * Takes a nested object and returns a shallow object keyed with the path names
	 * e.g. { "level1.level2": "value" }
	 *
	 * @param  {Object}      Nested object e.g. { level1: { level2: 'value' } }
	 * @return {Object}      Shallow object with path names e.g. { 'level1.level2': 'value' }
	 */
	function objToPaths(obj) {
	    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".";

	    var ret = {};
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || val.constructor === Array) && !isEmpty(val)) {
	            //Recursion for embedded objects
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
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    if (!utils_1.isObject(obj)) return obj;
	    var o = void 0,
	        k = void 0;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            o = _step.value;

	            if (!utils_1.isObject(o)) continue;
	            for (k in o) {
	                if (has(o, k)) obj[k] = o[k];
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return obj;
	}
	exports.extend = extend;
	var nativeAssign = Object.assign;
	function assign(target) {
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }

	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	    }

	    if (nativeAssign) return nativeAssign.apply(undefined, [target].concat(args));
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	var _has = Object.prototype.hasOwnProperty;
	function has(obj, prop) {
	    return _has.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop = void 0;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            prop = _step2.value;

	            if (has(obj, prop)) out[prop] = obj[prop];
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return out;
	}
	exports.pick = pick;
	function omit(obj, props) {
	    var out = {};
	    for (var key in obj) {
	        if (!!~props.indexOf(key)) continue;
	        out[key] = obj[key];
	    }
	    return out;
	}
	exports.omit = omit;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? ret.appl(ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) {
	        if (has(obj, k)) {
	            output.push(obj[k]);
	        }
	    }return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	    }

	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var arrays_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(5);
	exports.Promise = typeof window === 'undefined' ? global.Promise : window.Promise;
	// Promises
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    /* jshint validthis:true */
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if (utils_1.isFunction(obj)) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (utils_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	/**
	 * Convert a thunk to a promise.
	 *
	 * @param {Function}
	 * @return {Promise}
	 * @api private
	 */
	function thunkToPromise(fn) {
	    /* jshint validthis:true */
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	/**
	 * Convert an array of "yieldables" to a promise.
	 * Uses `Promise.all()` internally.
	 *
	 * @param {Array} obj
	 * @return {Promise}
	 * @api private
	 */
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	/**
	 * Convert an object of "yieldables" to a promise.
	 * Uses `Promise.all()` internally.
	 *
	 * @param {Object} obj
	 * @return {Promise}
	 * @api private
	 */
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        // predefine the key in the result
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred() {
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    }).catch(function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context) {
	    var accumulate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context) {
	    var accumulate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    return new exports.Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(11);
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
/* 13 */
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
	var rest_model_1 = __webpack_require__(14);
	var persistence_1 = __webpack_require__(15);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(11);
	var nested_model_1 = __webpack_require__(12);
	var persistence_1 = __webpack_require__(15);
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var orange_1 = __webpack_require__(4);
	var orange_request_1 = __webpack_require__(16);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var base_http_request_1 = __webpack_require__(17);
	var browser_fetch_1 = __webpack_require__(21);

	var HttpRequest = function (_base_http_request_1$) {
	    _inherits(HttpRequest, _base_http_request_1$);

	    function HttpRequest() {
	        _classCallCheck(this, HttpRequest);

	        return _possibleConstructorReturn(this, (HttpRequest.__proto__ || Object.getPrototypeOf(HttpRequest)).apply(this, arguments));
	    }

	    _createClass(HttpRequest, [{
	        key: '_fetch',
	        value: function _fetch(url, request) {
	            return browser_fetch_1.fetch(url, request);
	        }
	    }]);

	    return HttpRequest;
	}(base_http_request_1.BaseHttpRequest);

	exports.HttpRequest = HttpRequest;
	var utils_1 = __webpack_require__(18);
	exports.queryStringToParams = utils_1.queryStringToParams;
	exports.isValid = utils_1.isValid;
	exports.isNode = utils_1.isNode;
	exports.queryParam = utils_1.queryParam;
	__export(__webpack_require__(22));
	__export(__webpack_require__(19));
	__export(__webpack_require__(24));
	var base_http_request_2 = __webpack_require__(17);
	exports.HttpMethod = base_http_request_2.HttpMethod;
	exports.HttpError = base_http_request_2.HttpError;
	var base_http_request_3 = __webpack_require__(17);
	function get(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.GET, url);
	}
	exports.get = get;
	function post(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.POST, url);
	}
	exports.post = post;
	function put(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.PUT, url);
	}
	exports.put = put;
	function del(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.DELETE, url);
	}
	exports.del = del;
	function patch(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.PATCH, url);
	}
	exports.patch = patch;
	function head(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.HEAD, url);
	}
	exports.head = head;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var orange_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(18);
	var header_1 = __webpack_require__(19);
	(function (HttpMethod) {
	    HttpMethod[HttpMethod["GET"] = 0] = "GET";
	    HttpMethod[HttpMethod["PUT"] = 1] = "PUT";
	    HttpMethod[HttpMethod["POST"] = 2] = "POST";
	    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
	    HttpMethod[HttpMethod["HEAD"] = 4] = "HEAD";
	    HttpMethod[HttpMethod["PATCH"] = 5] = "PATCH";
	})(exports.HttpMethod || (exports.HttpMethod = {}));
	var HttpMethod = exports.HttpMethod;

	var HttpError = function (_Error) {
	    _inherits(HttpError, _Error);

	    function HttpError(response) {
	        _classCallCheck(this, HttpError);

	        var _this = _possibleConstructorReturn(this, (HttpError.__proto__ || Object.getPrototypeOf(HttpError)).call(this));

	        _this.response = response;
	        _this.status = response.status;
	        _this.statusText = response.statusText;
	        return _this;
	    }

	    return HttpError;
	}(Error);

	exports.HttpError = HttpError;

	var BaseHttpRequest = function () {
	    function BaseHttpRequest(_method, _url) {
	        _classCallCheck(this, BaseHttpRequest);

	        this._method = _method;
	        this._url = _url;
	        this._params = {};
	        this._headers = new header_1.Headers();
	        //private _body: any;
	        this._request = {};
	        if (!utils_1.isNode) {
	            this._headers.append('X-Requested-With', 'XMLHttpRequest');
	        }
	        this._request.method = HttpMethod[this._method];
	    }

	    _createClass(BaseHttpRequest, [{
	        key: 'uploadProgress',
	        value: function uploadProgress(fn) {
	            this._request.uploadProgress = fn;
	            return this;
	        }
	    }, {
	        key: 'downloadProgress',
	        value: function downloadProgress(fn) {
	            this._request.downloadProgress = fn;
	            return this;
	        }
	    }, {
	        key: 'header',
	        value: function header(field, value) {
	            if (orange_1.isString(field) && orange_1.isString(value)) {
	                this._headers.append(field, value);
	            } else if (orange_1.isObject(field)) {
	                for (var key in field) {
	                    this._headers.append(key, field[key]);
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'params',
	        value: function params(key, value) {
	            if (arguments.length === 1 && orange_1.isObject(key)) {
	                orange_1.extend(this._params, key);
	            } else if (arguments.length === 2) {
	                this._params[key] = value;
	            }
	            return this;
	        }
	    }, {
	        key: 'credentials',
	        value: function credentials(ret) {
	            this._request.credentials = ret;
	            return this;
	        }
	    }, {
	        key: 'json',
	        value: function json(data) {
	            var throwOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            this.header('content-type', 'application/json; charset=utf-8');
	            if (!orange_1.isString(data)) {
	                data = JSON.stringify(data);
	            }
	            return this.end(data, throwOnInvalid).then(function (res) {
	                return res.json();
	            });
	        }
	    }, {
	        key: 'text',
	        value: function text(data) {
	            var throwOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            return this.end(data, throwOnInvalid).then(function (r) {
	                return r.text();
	            });
	        }
	    }, {
	        key: 'end',
	        value: function end(data) {
	            var throwOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            var url = this._url;
	            if (data && data === Object(data) && this._method == HttpMethod.GET /* && check for content-type */) {
	                    var sep = url.indexOf('?') === -1 ? '?' : '&';
	                    var d = sep + utils_1.queryParam(data);
	                    url += d;
	                    data = null;
	                } else {
	                this._request.body = data;
	            }
	            url = this._apply_params(url);
	            this._request.headers = this._headers;
	            return this._fetch(url, this._request).then(function (res) {
	                if (!res.isValid && throwOnInvalid) {
	                    throw new HttpError(res);
	                }
	                return res;
	            });
	        }
	    }, {
	        key: 'then',
	        value: function then(onFulfilled, onRejected) {
	            return this.end().then(onFulfilled, onRejected);
	        }
	    }, {
	        key: 'catch',
	        value: function _catch(onRejected) {
	            return this.end().catch(onRejected);
	        }
	    }, {
	        key: '_apply_params',
	        value: function _apply_params(url) {
	            var params = {};
	            var idx = url.indexOf('?');
	            if (idx > -1) {
	                params = orange_1.extend(params, utils_1.queryStringToParams(url.substr(idx + 1)));
	                url = url.substr(0, idx);
	            }
	            orange_1.extend(params, this._params);
	            if (!orange_1.isEmpty(params)) {
	                var sep = url.indexOf('?') === -1 ? '?' : '&';
	                url += sep + utils_1.queryParam(params);
	            }
	            return url;
	        }
	    }]);

	    return BaseHttpRequest;
	}();

	exports.BaseHttpRequest = BaseHttpRequest;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";

	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
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
	exports.queryStringToParams = queryStringToParams;
	function queryParam(obj) {
	    return Object.keys(obj).reduce(function (a, k) {
	        a.push(k + '=' + encodeURIComponent(obj[k]));return a;
	    }, []).join('&');
	}
	exports.queryParam = queryParam;
	/*const fileProto = /^file:/;
	export function isValid(xhr, url) {
	    return (xhr.status >= 200 && xhr.status < 300) ||
	        (xhr.status === 304) ||
	        (xhr.status === 0 && fileProto.test(url)) ||
	        (xhr.status === 0 && window.location.protocol === 'file:')
	};*/
	function isValid(status) {
	    return status >= 200 && status < 300 || status === 304;
	}
	exports.isValid = isValid;
	;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var support_1 = __webpack_require__(20);
	function normalizeName(name) {
	    if (typeof name !== 'string') {
	        name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	}
	function normalizeValue(value) {
	    if (typeof value !== 'string') {
	        value = String(value);
	    }
	    return value;
	}
	// Build a destructive iterator for the value list
	function iteratorFor(items) {
	    var iterator = {
	        next: function next() {
	            var value = items.shift();
	            return { done: value === undefined, value: value };
	        }
	    };
	    if (support_1.default.iterable) {
	        iterator[Symbol.iterator] = function () {
	            return iterator;
	        };
	    }
	    return iterator;
	}

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        _classCallCheck(this, Headers);

	        this.map = {};
	        if (headers instanceof Headers) {
	            var _loop = function _loop(key) {
	                headers.map[key].forEach(function (v) {
	                    return _this.append(key, v);
	                });
	            };

	            for (var key in headers.map) {
	                _loop(key);
	            }
	        } else if (headers) {
	            var names = Object.getOwnPropertyNames(headers);
	            for (var i = 0, ii = names.length; i < ii; i++) {
	                this.append(names[i], headers[names[i]]);
	            }
	        }
	    }

	    _createClass(Headers, [{
	        key: Symbol.iterator,
	        value: function value() {
	            return this.entries();
	        }
	    }, {
	        key: 'append',
	        value: function append(name, value) {
	            name = normalizeName(name);
	            value = normalizeValue(value);
	            var list = this.map[name];
	            if (!list) {
	                list = [];
	                this.map[name] = list;
	            }
	            list.push(value);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(name) {
	            delete this.map[normalizeName(name)];
	        }
	    }, {
	        key: 'get',
	        value: function get(name) {
	            var values = this.map[normalizeName(name)];
	            return values ? values[0] : null;
	        }
	    }, {
	        key: 'getAll',
	        value: function getAll(name) {
	            return this.map[normalizeName(name)] || [];
	        }
	    }, {
	        key: 'has',
	        value: function has(name) {
	            return this.map.hasOwnProperty(normalizeName(name));
	        }
	    }, {
	        key: 'set',
	        value: function set(name, value) {
	            this.map[normalizeName(name)] = [normalizeValue(value)];
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(callback, thisArg) {
	            Object.getOwnPropertyNames(this.map).forEach(function (name) {
	                this.map[name].forEach(function (value) {
	                    callback.call(thisArg, value, name, this);
	                }, this);
	            }, this);
	        }
	    }, {
	        key: 'keys',
	        value: function keys() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push(name);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'values',
	        value: function values() {
	            var items = [];
	            this.forEach(function (value) {
	                items.push(value);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'entries',
	        value: function entries() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push([name, value]);
	            });
	            return iteratorFor(items);
	        }
	    }]);

	    return Headers;
	}();

	exports.Headers = Headers;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var utils_1 = __webpack_require__(18);
	var self = utils_1.isNode ? global : window;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	        try {
	            new Blob();
	            return true;
	        } catch (e) {
	            return false;
	        }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var orange_1 = __webpack_require__(4);
	var header_1 = __webpack_require__(19);
	var request_1 = __webpack_require__(22);
	var base_response_1 = __webpack_require__(23);
	var support_1 = __webpack_require__(20);
	function headers(xhr) {
	    var head = new header_1.Headers();
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	    for (var i = 0, ii = pairs.length; i < ii; i++) {
	        var split = pairs[i].trim().split(':');
	        var key = split.shift().trim();
	        var value = split.join(':').trim();
	        head.append(key, value);
	    }
	    return head;
	}

	var BrowserResponse = function (_base_response_1$Base) {
	    _inherits(BrowserResponse, _base_response_1$Base);

	    function BrowserResponse() {
	        _classCallCheck(this, BrowserResponse);

	        return _possibleConstructorReturn(this, (BrowserResponse.__proto__ || Object.getPrototypeOf(BrowserResponse)).apply(this, arguments));
	    }

	    _createClass(BrowserResponse, [{
	        key: 'clone',
	        value: function clone() {
	            return new BrowserResponse(this._body, {
	                status: this.status,
	                statusText: this.statusText,
	                headers: new header_1.Headers(this.headers),
	                url: this.url
	            });
	        }
	    }]);

	    return BrowserResponse;
	}(base_response_1.BaseResponse);

	function fetch(input, init) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var request;
	        if (request_1.isRequest(input) && !init) {
	            request = input;
	        } else {
	            request = new request_1.Request(input, init);
	        }
	        init = init || {};
	        var xhr = orange_1.xmlHttpRequest();
	        function responseURL() {
	            if ('responseURL' in xhr) {
	                return xhr.responseURL;
	            }
	            // Avoid security warnings on getResponseHeader when not allowed by CORS
	            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	                return xhr.getResponseHeader('X-Request-URL');
	            }
	            return;
	        }
	        xhr.onload = function () {
	            var options = {
	                status: xhr.status,
	                statusText: xhr.statusText,
	                headers: headers(xhr),
	                url: responseURL()
	            };
	            var body = 'response' in xhr ? xhr.response : xhr.responseText;
	            resolve(new BrowserResponse(body, options));
	        };
	        xhr.onerror = function () {
	            reject(new TypeError('Network request failed'));
	        };
	        xhr.ontimeout = function () {
	            reject(new TypeError('Network request failed: timeout'));
	        };
	        xhr.open(request.method, request.url, true);
	        if (request.credentials === 'include') {
	            xhr.withCredentials = true;
	        }
	        if ('responseType' in xhr && support_1.default.blob) {
	            xhr.responseType = 'blob';
	        }
	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });
	        if (init.downloadProgress) {
	            xhr.onprogress = init.downloadProgress;
	        }
	        if (init.uploadProgress || xhr.upload) {
	            xhr.upload.onprogress = init.uploadProgress;
	        }
	        xhr.send(typeof request.body === 'undefined' ? null : request.body);
	    });
	}
	exports.fetch = fetch;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var header_1 = __webpack_require__(19);
	// HTTP methods whose capitalization should be normalized
	var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	}
	function isRequest(a) {
	    return Request.prototype.isPrototypeOf(a) || a instanceof Request;
	}
	exports.isRequest = isRequest;

	var Request = function () {
	    function Request(input) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, Request);

	        options = options || {};
	        var body = options.body;
	        if (isRequest(input)) {
	            this.url = input.url;
	            this.credentials = input.credentials;
	            if (!options.headers) {
	                this.headers = new header_1.Headers(options.headers);
	            }
	            this.method = input.method;
	            this.mode = input.mode;
	        } else {
	            this.url = input;
	        }
	        this.credentials = options.credentials || this.credentials || 'omit';
	        if (options.headers || !this.headers) {
	            this.headers = new header_1.Headers(options.headers);
	        }
	        this.method = normalizeMethod(options.method || this.method || 'GET');
	        this.mode = options.mode || this.mode || null;
	        this.referrer = null;
	        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	            throw new TypeError('Body not allowed for GET or HEAD requests');
	        }
	        this.body = body;
	    }

	    _createClass(Request, [{
	        key: 'clone',
	        value: function clone() {
	            return new Request(this);
	        }
	    }]);

	    return Request;
	}();

	exports.Request = Request;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var header_1 = __webpack_require__(19);
	var support_1 = __webpack_require__(20);
	var orange_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(18);
	var types_1 = __webpack_require__(24);
	function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	        if (bytes) {
	            var split = bytes.split('=');
	            var name = split.shift().replace(/\+/g, ' ');
	            var value = split.join('=').replace(/\+/g, ' ');
	            form.append(decodeURIComponent(name), decodeURIComponent(value));
	        }
	    });
	    return form;
	}
	function consumed(body) {
	    if (body.bodyUsed) {
	        return orange_1.Promise.reject(new TypeError('Already read'));
	    }
	    body._bodyUsed = true;
	}
	exports.consumed = consumed;
	function fileReaderReady(reader) {
	    return new orange_1.Promise(function (resolve, reject) {
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	        reader.onerror = function () {
	            reject(reader.error);
	        };
	    });
	}
	function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	}
	function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	}
	//var redirectStatuses = [301, 302, 303, 307, 308]

	var BaseResponse = function () {
	    function BaseResponse(body, options) {
	        _classCallCheck(this, BaseResponse);

	        this._bodyUsed = false;
	        this._bodyType = types_1.BodyType.None;
	        options = options || {};
	        this.type = 'default';
	        this.status = options.status;
	        this.ok = this.status >= 200 && this.status < 300;
	        this.statusText = options.statusText;
	        this.headers = options.headers instanceof header_1.Headers ? options.headers : new header_1.Headers(options.headers);
	        this.url = options.url || '';
	        this._initBody(body);
	    }

	    _createClass(BaseResponse, [{
	        key: '_initBody',
	        value: function _initBody(body) {
	            if (typeof body === 'string' || support_1.default.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                this._bodyType = types_1.BodyType.Text;
	            } else if (support_1.default.blob && Blob.prototype.isPrototypeOf(body)) {
	                this._bodyType = types_1.BodyType.Blob;
	            } else if (support_1.default.formData && FormData.prototype.isPrototypeOf(body)) {
	                this._bodyType = types_1.BodyType.FormData;
	            } else if (!body) {
	                this._bodyType = types_1.BodyType.None;
	            } else if (support_1.default.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else if (utils_1.isNode) {
	                this._bodyType = types_1.BodyType.Stream;
	            } else {
	                throw new Error('unsupported BodyType type');
	            }
	            this._body = body ? body : "";
	            if (!this.headers.get('content-type')) {
	                if (this._bodyType == types_1.BodyType.Text) {
	                    this.headers.set('content-type', 'text/plain; charset=UTF-8');
	                } else if (this._bodyType == types_1.BodyType.Blob && this._body.type) {
	                    this.headers.set('content-type', this._body.type);
	                } else if (support_1.default.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	                }
	            }
	        }
	    }, {
	        key: 'text',
	        value: function text() {
	            if (this._bodyType == types_1.BodyType.Stream) {
	                return this.blob().then(function (n) {
	                    return n.toString();
	                });
	            }
	            var rejected = consumed(this);
	            if (rejected) return rejected;
	            if (this._bodyType == types_1.BodyType.Blob) {
	                return readBlobAsText(this._body);
	            } else if (this._bodyType == types_1.BodyType.FormData) {
	                throw new Error('could not read FormData body as text');
	            } else {
	                return orange_1.Promise.resolve(this._body);
	            }
	        }
	    }, {
	        key: 'arrayBuffer',
	        value: function arrayBuffer() {
	            return this.blob().then(readBlobAsArrayBuffer);
	        }
	    }, {
	        key: 'stream',
	        value: function stream() {
	            return this.blob();
	        }
	    }, {
	        key: 'blob',
	        value: function blob() {
	            if (!support_1.default.blob && !utils_1.isNode) {
	                return orange_1.Promise.reject(new Error("blob not supported"));
	            }
	            var rejected = consumed(this);
	            if (rejected) {
	                return rejected;
	            }
	            if (this._bodyType == types_1.BodyType.Blob) {
	                return orange_1.Promise.resolve(this._body);
	            } else if (this._bodyType == types_1.BodyType.FormData) {
	                orange_1.Promise.reject(new Error('could not read FormData body as blob'));
	            } else {
	                return orange_1.Promise.resolve(new Blob([this._body]));
	            }
	        }
	    }, {
	        key: 'formData',
	        value: function formData() {
	            if (!support_1.default.formData) {
	                return orange_1.Promise.reject(new Error("form data not supported"));
	            }
	            return this.text().then(decode);
	        }
	    }, {
	        key: 'json',
	        value: function json() {
	            return this.text().then(JSON.parse);
	        }
	    }, {
	        key: 'bodyUsed',
	        get: function get() {
	            return this._bodyUsed;
	        }
	    }, {
	        key: 'bodyType',
	        get: function get() {
	            return this._bodyType;
	        }
	    }, {
	        key: 'isValid',
	        get: function get() {
	            return utils_1.isValid(this.status);
	        }
	    }]);

	    return BaseResponse;
	}();

	exports.BaseResponse = BaseResponse;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	(function (BodyType) {
	    BodyType[BodyType["Blob"] = 0] = "Blob";
	    BodyType[BodyType["Text"] = 1] = "Text";
	    BodyType[BodyType["FormData"] = 2] = "FormData";
	    BodyType[BodyType["Stream"] = 3] = "Stream";
	    BodyType[BodyType["None"] = 4] = "None";
	})(exports.BodyType || (exports.BodyType = {}));
	var BodyType = exports.BodyType;
	;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var collection_1 = __webpack_require__(1);
	var rest_collection_1 = __webpack_require__(13);
	var orange_1 = __webpack_require__(4);
	var persistence_1 = __webpack_require__(15);
	var orange_request_1 = __webpack_require__(16);
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