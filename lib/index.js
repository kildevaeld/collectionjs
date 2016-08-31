"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./collection'));
__export(require('./model'));
__export(require('./nested-model'));
__export(require('./rest-collection'));
__export(require('./rest-model'));
__export(require('./paginated-collection'));
var collection_2 = require('./collection');
var rest_collection_2 = require('./rest-collection');
var model_2 = require('./model');
function isCollection(a) {
    if (a == null)
        return false;
    return (a instanceof collection_2.Collection) || a.__classType == 'Collection' || a.__classType == 'RestCollection';
}
exports.isCollection = isCollection;
function isRestCollection(a) {
    if (a == null)
        return false;
    return (a instanceof rest_collection_2.RestCollection) || a.__classType == 'RestCollection';
}
exports.isRestCollection = isRestCollection;
function isModel(a) {
    if (a == null)
        return false;
    return (a instanceof model_2.Model) || a.__classType === 'Model' || a.__classType === 'RestModel';
}
exports.isModel = isModel;
function isRestModel(a) {
    if (a == null)
        return false;
    return (a instanceof model_2.Model) || a.__classType === 'RestModel';
}
exports.isRestModel = isRestModel;
