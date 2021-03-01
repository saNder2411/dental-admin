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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getNewDataItemOnRecurrenceDragEvent = exports.getNewDataItemWithUpdateException = exports.getInitDataForNewDataItem = exports.getFormInputOptionalProps = exports.customModelFields = void 0;
// Helpers
var EntitiesHelpers_1 = require("../../_bus/Entities/EntitiesHelpers");
exports.customModelFields = {
    id: 'ID',
    title: 'Title',
    description: 'Description',
    start: 'Start',
    end: 'End',
    isAllDay: 'fAllDayEvent',
    recurrenceRule: 'MetroRRule',
    recurrenceId: 'RecurrenceID',
    recurrenceExceptions: 'MetroRecException'
};
exports.getFormInputOptionalProps = function (_a) {
    var touched = _a.touched, validationMessage = _a.validationMessage, showValidationMessage = _a.showValidationMessage, hint = _a.hint, id = _a.id, showHint = _a.showHint, label = _a.label;
    return ({
        showValidationMessage: touched && validationMessage,
        showHint: !showValidationMessage && hint,
        hintId: showHint ? id + "_hint" : '',
        errorId: showValidationMessage ? id + "_error" : '',
        labelId: label ? id + "_label" : ''
    });
};
exports.getInitDataForNewDataItem = function (selectedDate, selectedView, TeamID) {
    switch (selectedView) {
        case 'month':
            return {
                Start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0),
                End: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1, 0),
                TeamID: TeamID
            };
        default:
            return {
                Start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 10),
                End: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 11),
                TeamID: TeamID
            };
    }
};
exports.getNewDataItemWithUpdateException = function (dataItem, exception) {
    var MetroRecException = dataItem.MetroRecException ? __spreadArrays(dataItem.MetroRecException, [exception]) : [exception];
    var occurrenceId = dataItem.occurrenceId, originalStart = dataItem.originalStart, EventDate = dataItem.EventDate, EndDate = dataItem.EndDate, others = __rest(dataItem, ["occurrenceId", "originalStart", "EventDate", "EndDate"]);
    return __assign(__assign({}, others), { EventDate: EventDate,
        EndDate: EndDate, Start: new Date(EventDate), End: new Date(EndDate), MetroRecException: MetroRecException, RecurrenceID: null });
};
exports.getNewDataItemOnRecurrenceDragEvent = function (dataItem) { return function (allIds) {
    var ID = EntitiesHelpers_1.generateId(allIds);
    var occurrenceId = dataItem.occurrenceId, originalStart = dataItem.originalStart, Start = dataItem.Start, End = dataItem.End, TeamID = dataItem.TeamID, newDataItem = __rest(dataItem, ["occurrenceId", "originalStart", "Start", "End", "TeamID"]);
    return __assign(__assign({}, newDataItem), { Start: Start,
        End: End, EventDate: Start.toISOString(), EndDate: End.toISOString(), TeamID: TeamID, LookupHR01teamId: TeamID, ID: ID, Id: ID });
}; };
