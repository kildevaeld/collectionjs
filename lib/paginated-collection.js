"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("./collection");
const rest_collection_1 = require("./rest-collection");
const orange_1 = require("orange");
const persistence_1 = require("./persistence");
const orange_request_1 = require("orange.request");
const PARAM_TRIM_RE = /[\s'"]/g;
const URL_TRIM_RE = /[<>\s'"]/g;
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
class PaginatedCollection extends rest_collection_1.RestCollection {
    constructor(models, options = {}) {
        super(models, options);
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
    get page() {
        return this._page;
    }
    hasNext() {
        return this.hasPage(this._state.current + 1);
    }
    hasPrevious() {
        return this.hasPage(this._state.current - 1);
    }
    hasPage(page) {
        if (this._state.last > -1) {
            return page <= this._state.last;
        }
        return false;
    }
    getPreviousPage(options) {
        options = options ? orange_1.extend({}, options) : {};
        options.page = this._state.current - 1;
        return this.getPage(options);
    }
    getNextPage(options) {
        options = options ? orange_1.extend({}, options) : {};
        options.page = this._state.current + 1;
        return this.getPage(options);
    }
    getPage(options) {
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
    }
    fetch(options = {}) {
        options = options ? orange_1.extend({}, options) : {};
        let url;
        if (!orange_1.has(options, 'page')) {
            options.page = this._state.current;
        }
        let params = options.params ? orange_1.extend({}, options.params) : {};
        if (orange_1.has(params, this.queryParams.page))
            delete params[this.queryParams.page];
        url = this._link[options.page];
        if (!url) {
            url = this.getURL();
        }
        if (!url)
            return orange_1.Promise.reject(new Error("no url specified"));
        let idx = url.indexOf('?');
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
            .then((resp) => {
            this._processResponse(resp, options);
            this.trigger('fetch', this, resp, options);
            return this;
        }).catch((e) => {
            this.trigger('error', e);
            throw e;
        });
    }
    _processResponse(resp, options) {
        let currentPage = options.page;
        let links = this._parseLinkHeaders(resp);
        if (links.first)
            this._link[this._state.first] = links.first;
        if (links.prev)
            this._link[currentPage - 1] = links.prev;
        if (links.next)
            this._link[currentPage + 1] = links.next;
        if (links.last) {
            let last = links.last;
            let idx = last.indexOf('?');
            if (idx > -1) {
                let params = queryStringToParams(last.substr(idx + 1));
                if (orange_1.has(params, this.queryParams.page)) {
                    this._link[params[this.queryParams.page]] = last;
                    this._state.last = parseInt(params[this.queryParams.page]);
                }
            }
        }
        this._state.current = currentPage;
        let data = resp.content;
        if (data && !Array.isArray(data))
            data = [data];
        if (!data)
            return this;
        data = this.parse(data);
        for (let i = 0, ii = data.length; i < ii; i++) {
            data[i] = this._prepareModel(data[i]);
        }
        this.add(data);
        return this;
    }
    _parseLinkHeaders(resp) {
        var link = {};
        let linkHeader = resp.headers.get('Link');
        if (!linkHeader)
            return link;
        linkHeader = linkHeader.split(',');
        let relations = ['first', 'prev', 'next', 'last'];
        for (let i = 0, ii = linkHeader.length; i < ii; i++) {
            let linkParts = linkHeader[i].split(';'), url = linkParts[0].replace(URL_TRIM_RE, ''), params = linkParts.slice(1);
            for (let x = 0, xx = params.length; x < xx; x++) {
                let paramParts = params[x].split('='), key = paramParts[0].replace(PARAM_TRIM_RE, ''), value = paramParts[1].replace(PARAM_TRIM_RE, '');
                if (key == 'rel' && !!~relations.indexOf(value))
                    link[value] = url;
            }
        }
        return link;
    }
    _reset() {
        super._reset();
        this._state = { first: 1, last: -1, current: 1, size: this._state.size };
        this._link = {};
    }
}
exports.PaginatedCollection = PaginatedCollection;
