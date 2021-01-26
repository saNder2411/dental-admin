"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.transformDataItemForAPI = exports.transformAPIDataItem = exports.transformAPIData = void 0;
exports.transformAPIData = function (apiResults) {
    return apiResults.map(function (_a) {
        var LookupMultiBP01offeringsId = _a.LookupMultiBP01offeringsId, __metadata = _a.__metadata, dataItem = __rest(_a, ["LookupMultiBP01offeringsId", "__metadata"]);
        return (__assign(__assign({}, dataItem), { TeamID: dataItem.LookupHR01teamId, Start: new Date(dataItem.EventDate), End: new Date(dataItem.EndDate), MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map(function (exception) { return new Date(exception); }) : null, LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results } }));
    });
};
exports.transformAPIDataItem = function (_a) {
    var __metadata = _a.__metadata, LookupMultiBP01offeringsId = _a.LookupMultiBP01offeringsId, dataItem = __rest(_a, ["__metadata", "LookupMultiBP01offeringsId"]);
    return (__assign(__assign({}, dataItem), { TeamID: dataItem.LookupHR01teamId, Start: new Date(dataItem.EventDate), End: new Date(dataItem.EndDate), MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map(function (exception) { return new Date(exception); }) : null, LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results } }));
};
exports.transformDataItemForAPI = function (_a) {
    var TeamID = _a.TeamID, Start = _a.Start, End = _a.End, isNew = _a.isNew, inEdit = _a.inEdit, dataItem = __rest(_a, ["TeamID", "Start", "End", "isNew", "inEdit"]);
    return (__assign(__assign({}, dataItem), { EventDate: Start.toISOString(), EndDate: End.toISOString(), FilterStart: Start.toISOString(), FilterEnd: End.toISOString(), __metadata: { type: 'SP.Data.MetroHR03ListItem' } }));
};
