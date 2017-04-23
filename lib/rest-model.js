"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orange_1 = require("orange");
const model_1 = require("./model");
const nested_model_1 = require("./nested-model");
const persistence_1 = require("./persistence");
function isRestModel(a) {
    if (a == null)
        return false;
    return (a instanceof model_1.Model) || a.__classType === 'RestModel';
}
exports.isRestModel = isRestModel;
function normalize_path(url, id) {
    let i, p = "";
    if ((i = url.indexOf('?')) >= 0) {
        p = url.substr(i);
        url = url.substr(0, i);
    }
    if (url[url.length - 1] !== '/')
        url += '/';
    return url + id + p;
}
exports.normalize_path = normalize_path;
class RestModel extends nested_model_1.NestedModel {
    constructor(attr, options = {}) {
        super(attr, options);
        this.idAttribute = 'id';
        if (options.url) {
            this.rootURL = options.url;
        }
    }
    get __classType() { return 'RestModel'; }
    ;
    getURL(id) {
        let url = this.rootURL;
        if (this.collection && this.collection.getURL()) {
            url = this.collection.getURL();
        }
        id = id || this.id;
        if (id && url) {
            url = normalize_path(url, this.id);
        }
        return url;
    }
    fetch(options) {
        options = options ? orange_1.extend({}, options) : {};
        let url = this.getURL();
        if (url == null)
            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        this.trigger('before:fetch', this, options);
        return this.sync(persistence_1.RestMethod.Read, this, options)
            .then((result) => {
            if (result)
                this.set(this.parse(result.content, options), options);
            this.trigger('fetch', this, result, options);
            return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            if (e) {
                throw e;
            }
            return this;
        });
    }
    save(options) {
        options = options ? orange_1.extend({}, options) : {};
        this.trigger('before:save', this, options);
        let method = persistence_1.RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
        let url = this.getURL(this.id);
        if (url == null)
            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        return this.sync(method, this, options)
            .then((result) => {
            this.set(result.content, options);
            this.trigger('save', this, result, options);
            return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            throw e;
        });
    }
    remove(options) {
        options = options ? orange_1.extend({}, options) : {};
        if (this.isNew) {
            super.remove(options);
            return orange_1.Promise.resolve(this);
        }
        let url = this.getURL(this.id);
        if (url == null)
            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
        this.trigger('before:remove', this, options);
        if (!options.wait)
            super.remove(options);
        options.url = url;
        return this.sync(persistence_1.RestMethod.Delete, this, options)
            .then((result) => {
            if (options.wait)
                super.remove(options);
            return this;
        }).catch((e) => {
            this.trigger('error', this, e);
            throw e;
        });
    }
    sync(method, model, options) {
        return persistence_1.sync(method, model, options);
    }
}
exports.RestModel = RestModel;
