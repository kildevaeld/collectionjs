"use strict";
var promises_1 = require('utilities/lib/promises');
var utils_1 = require('utilities/lib/utils');
var request_1 = require('utilities/lib/request');
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
        url += sep + query.substring(1);
    }
    return new promises_1.Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4)
                return;
            var response = {
                method: method,
                status: xhr.status,
                content: getData(options.headers['Accept'], xhr)
            };
            utils_1.proxy(response, xhr, ['getAllResponseHeaders', 'getResponseHeader']);
            if (isValid(xhr)) {
                return resolve(response);
            }
            else {
                var error = new Error('Server responded with status of ' + xhr.statusText);
                return reject(error);
            }
        };
        xhr.open(http, url, true);
        if (!(options.headers && options.headers['Accept'])) {
            options.headers = {
                Accept: "application/json"
            };
        }
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
