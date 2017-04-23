"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var orange_1 = require("orange");
var orange_request_1 = require("orange.request");

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