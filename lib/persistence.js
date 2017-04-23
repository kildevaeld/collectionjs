"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orange_1 = require("orange");
const orange_request_1 = require("orange.request");
class HttpError extends Error {
    constructor(status, message, body) {
        super(message);
        this.message = message;
        this.status = status;
        this.body = body;
    }
}
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
const xmlRe = /^(?:application|text)\/xml/;
const jsonRe = /^application\/json/;
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
    let http;
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
            return orange_1.Promise.reject(new Error(`Sync: does not recognise method: ${method}`));
    }
    let request = new orange_request_1.HttpRequest(http, options.url);
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
    let data = undefined;
    if (http == orange_request_1.HttpMethod.PATCH || http === orange_request_1.HttpMethod.PUT || http === orange_request_1.HttpMethod.POST) {
        data = JSON.stringify(model.toJSON());
    }
    return request.end(data)
        .then(res => {
        if (!res.isValid) {
            return res.text().then(t => { throw new HttpError(res.status, res.statusText, t); });
        }
        return res.json()
            .then(json => {
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
