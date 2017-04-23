"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orange_1 = require("orange");
const collection_1 = require("./collection");
const rest_model_1 = require("./rest-model");
const persistence_1 = require("./persistence");
function isRestCollection(a) {
    if (a == null)
        return false;
    return (a instanceof RestCollection) || a.__classType == 'RestCollection';
}
exports.isRestCollection = isRestCollection;
class RestCollection extends collection_1.Collection {
    constructor(models, options = {}) {
        super(models, options);
        this.Model = rest_model_1.RestModel;
        if (options.url)
            this.url = options.url;
        this.options.queryParameter = this.options.queryParameter || 'q';
    }
    get __classType() { return 'RestCollection'; }
    ;
    getURL() {
        return typeof this.url === 'function' ? this.url() : this.url;
    }
    fetch(options) {
        options = options ? orange_1.extend({}, options) : {};
        let url = this.getURL();
        if (url == null)
            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        this.trigger('before:fetch');
        return this.sync(persistence_1.RestMethod.Read, this, options)
            .then((results) => {
            this[options.reset ? 'reset' : 'set'](results.content, options);
            this.trigger('fetch');
            return this;
        }).catch((e) => {
            this.trigger('error', e);
            throw e;
        });
    }
    create(value, options) {
        options = options ? orange_1.extend({}, options) : {};
        let model;
        let url = this.getURL();
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
        model.save().then(() => {
            if (!options.wait)
                this.add(model, options);
            this.trigger('create', this, model, value, options);
            if (options.complete)
                options.complete(null, model);
        }).catch((e) => {
            this.trigger('error', e);
            if (options.complete)
                options.complete(e, null);
        });
        return model;
    }
    query(term, options = { merge: true }) {
        let params = { [this.options.queryParameter]: term };
        let url = this.getURL();
        if (url == null)
            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
        options.url = url;
        if (!options.params)
            options.params = {};
        orange_1.extend(options.params, params);
        this.trigger('before:query');
        return this.sync(persistence_1.RestMethod.Read, this, options)
            .then((results) => {
            let models = this.add(results.content, options);
            this.trigger('query');
            return models;
        }).catch((e) => {
            this.trigger('error', e);
            throw e;
        });
    }
    sync(method, model, options) {
        return persistence_1.sync(method, model, options);
    }
}
exports.RestCollection = RestCollection;
