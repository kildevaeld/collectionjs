"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var promises_1 = require('utilities/lib/promises');
var utils_1 = require('utilities/lib/utils');
var request_1 = require('utilities/lib/request');
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
            http = 'POST';
            break;
        case RestMethod.Update:
            http = "PUT";
            break;
        case RestMethod.Patch:
            http = "PATCH";
            break;
        case RestMethod.Delete:
            http = "DELETE";
            break;
        case RestMethod.Read:
            http = "GET";
            break;
        default:
            return promises_1.Promise.reject(new Error("Sync: does not recognise method: " + method));
    }
    var xhr = utils_1.ajax();
    var query, url = options.url;
    if (options.params)
        query = request_1.queryParam(options.params);
    if (query) {
        var sep = (options.url.indexOf('?') === -1) ? '?' : '&';
        url += sep + query;
    }
    return new promises_1.Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            var data;
            try {
                data = getData(options.headers['Accept'], xhr);
            }
            catch (e) {
                return reject(new Error('Could not serialize response'));
            }
            var response = {
                method: method,
                status: xhr.status,
                content: data
            };
            utils_1.proxy(response, xhr, ['getAllResponseHeaders', 'getResponseHeader']);
            if (isValid(xhr)) {
                return resolve(response);
            }
            else {
                var error = new HttpError(xhr.status, xhr.statusText, data);
                return reject(error);
            }
        };
        xhr.open(http, url, true);
        if (!(options.headers && options.headers['Accept'])) {
            if (!options.headers)
                options.headers = {};
            options.headers['Accept'] = "application/json";
        }
        xhr.setRequestHeader('Content-Type', "application/json");
        if (options.headers)
            for (var key in options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
        if (options.beforeSend)
            options.beforeSend(xhr);
        xhr.send(JSON.stringify(model.toJSON()));
    });
}
exports.sync = sync;
