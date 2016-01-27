var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rest_collection_1 = require('./rest-collection');
var PARAM_TRIM_RE = /[\s'"]/g;
var URL_TRIM_RE = /[<>\s'"]/g;
var PaginatedCollection = (function (_super) {
    __extends(PaginatedCollection, _super);
    function PaginatedCollection() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PaginatedCollection.prototype, "page", {
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    PaginatedCollection.prototype.getPreviousPage = function (options) {
        return null;
    };
    PaginatedCollection.prototype.getNextPage = function (options) {
        return null;
    };
    PaginatedCollection.prototype.getPage = function (options) {
        return null;
    };
    PaginatedCollection.prototype._parseLinkHeaders = function (resp, header) {
        var link = {};
        if (typeof resp['getResponseHeader'] !== 'function') {
            return link;
        }
        var linkHeader = resp['getResponseHeader']('Link');
        if (!linkHeader)
            return link;
        linkHeader = linkHeader.split(',');
        var relations = ['first', 'prev', 'next'];
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
