var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('./collection');
var rest_collection_1 = require('./rest-collection');
var promises_1 = require('utilities/lib/promises');
var persistence_1 = require('./persistence');
var objects_1 = require('utilities/lib/objects');
var request_1 = require('utilities/lib/request');
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
            objects_1.extend(this.queryParams, options.queryParams);
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
    PaginatedCollection.prototype.hasPage = function (page) {
        if (this._state.last > -1) {
            return page <= this._state.last;
        }
        return false;
    };
    PaginatedCollection.prototype.getPreviousPage = function (options) {
        options = options ? objects_1.extend({}, options) : {};
        options.page = this._state.current - 1;
        return this.getPage(options);
    };
    PaginatedCollection.prototype.getNextPage = function (options) {
        options = options ? objects_1.extend({}, options) : {};
        options.page = this._state.current + 1;
        return this.getPage(options);
    };
    PaginatedCollection.prototype.getPage = function (options) {
        options = options ? objects_1.extend({}, options) : {};
        if (options.page === void 0)
            return promises_1.Promise.reject(new Error("No page"));
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
        options = options ? objects_1.extend({}, options) : {};
        var url;
        if (!objects_1.has(options, 'page')) {
            options.page = this._state.current;
        }
        var params = options.params ? objects_1.extend({}, options.params) : {};
        if (objects_1.has(params, this.queryParams.page))
            delete params[this.queryParams.page];
        url = this._link[options.page];
        if (!url) {
            url = this.getURL();
        }
        if (!url)
            return promises_1.Promise.reject(new Error("no url specified"));
        var idx = url.indexOf('?');
        if (idx > -1) {
            params = objects_1.extend(params, queryStringToParams(url.substr(idx + 1)));
            url = url.substr(0, idx);
        }
        if (!objects_1.has(params, this.queryParams.page)) {
            params[this.queryParams.page] = options.page;
        }
        options.params = params;
        options.url = url;
        this.trigger('before:fetch', this, options);
        params[this.queryParams.size] = this._state.size;
        if (!this._link[options.page + '']) {
            this._link[options.page] = url + request_1.queryParam({ page: options.page });
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
                if (objects_1.has(params, this.queryParams.page)) {
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
        this.page.reset(data);
        return this;
    };
    PaginatedCollection.prototype._parseLinkHeaders = function (resp) {
        var link = {};
        if (typeof resp['getResponseHeader'] !== 'function') {
            return link;
        }
        var linkHeader = resp['getResponseHeader']('Link');
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
})(rest_collection_1.RestCollection);
exports.PaginatedCollection = PaginatedCollection;
