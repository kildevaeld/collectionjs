(function (RestMethod) {
    RestMethod[RestMethod["Create"] = 0] = "Create";
    RestMethod[RestMethod["Update"] = 1] = "Update";
    RestMethod[RestMethod["Read"] = 2] = "Read";
    RestMethod[RestMethod["Patch"] = 3] = "Patch";
    RestMethod[RestMethod["Delete"] = 4] = "Delete";
})(exports.RestMethod || (exports.RestMethod = {}));
var RestMethod = exports.RestMethod;
;
function sync(method, model, options) {
    return null;
}
exports.sync = sync;
