"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var collection_1 = require("./collection");
var rest_collection_1 = require("./rest-collection");
var orange_1 = require("orange");
var persistence_1 = require("./persistence");
var orange_request_1 = require("orange.request");
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