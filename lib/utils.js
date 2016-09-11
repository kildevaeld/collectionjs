"use strict";
var collection_1 = require('./collection');
var model_1 = require('./model');
var rest_collection_1 = require('./rest-collection');
function isCollection(a) {
    if (a == null)
        return false;
    return (a instanceof collection_1.Collection) || a.__classType == 'Collection' || a.__classType == 'RestCollection';
}
exports.isCollection = isCollection;
function isRestCollection(a) {
    if (a == null)
        return false;
    return (a instanceof rest_collection_1.RestCollection) || a.__classType == 'RestCollection';
}
exports.isRestCollection = isRestCollection;
function isModel(a) {
    if (a == null)
        return false;
    return (a instanceof model_1.Model) || a.__classType === 'Model' || a.__classType === 'RestModel';
}
exports.isModel = isModel;
function isRestModel(a) {
    if (a == null)
        return false;
    return (a instanceof model_1.Model) || a.__classType === 'RestModel';
}
exports.isRestModel = isRestModel;
