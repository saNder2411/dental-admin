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
exports.__esModule = true;
exports.Calendar = void 0;
var react_1 = require("react");
var kendo_react_intl_1 = require("@progress/kendo-react-intl");
var kendo_react_common_1 = require("@progress/kendo-react-common");
// Components
var _components_1 = require("../_components");
var _1 = require("./");
// Styled Components
var SC = require("./CalendarStyled");
// Mocks
var CalendarMockData_1 = require("./CalendarMockData");
var initialFilterState = CalendarMockData_1.employees.reduce(function (prevVal, employee) {
    var _a;
    return (__assign(__assign({}, prevVal), (_a = {}, _a[employee.id] = true, _a)));
}, {});
exports.Calendar = function () {
    var localizationService = kendo_react_intl_1.useLocalization();
    var _a = react_1.useState(initialFilterState), filterState = _a[0], setFilterState = _a[1];
    var _b = react_1.useState(CalendarMockData_1.orders), data = _b[0], setData = _b[1];
    var onDataChange = react_1.useCallback(function (_a) {
        var created = _a.created, updated = _a.updated, deleted = _a.deleted;
        setData(function (old) {
            return old
                // Filter the deleted items
                .filter(function (item) { return deleted.find(function (current) { return current[CalendarMockData_1.ordersModelFields.id] === item[CalendarMockData_1.ordersModelFields.id]; }) === undefined; })
                // Find and replace the updated items
                .map(function (item) { return updated.find(function (current) { return current[CalendarMockData_1.ordersModelFields.id] === item[CalendarMockData_1.ordersModelFields.id]; }) || item; })
                // Add the newly created items and assign an `id`.
                .concat(created.map(function (item) {
                var _a;
                return Object.assign({}, item, (_a = {}, _a[CalendarMockData_1.ordersModelFields.id] = kendo_react_common_1.guid(), _a));
            }));
        });
    }, []);
    var onEmployeeClick = react_1.useCallback(function (employeeId) {
        var _a;
        setFilterState(__assign(__assign({}, filterState), (_a = {}, _a[employeeId] = !filterState[employeeId], _a)));
        console.log(employeeId, filterState);
    }, [filterState, setFilterState]);
    return (react_1["default"].createElement(SC.Calendar, { id: "Planning", className: "planning-page main-content" },
        react_1["default"].createElement("div", { className: "card-container grid" },
            react_1["default"].createElement("h3", { className: "card-title" }, localizationService.toLanguageString('custom.teamCalendar', 'Team Calendar')),
            react_1["default"].createElement("div", { className: "card-control-wrapper" }, CalendarMockData_1.employees.map(function (employee) {
                var _a, _b;
                return (react_1["default"].createElement(_1.CalendarTopControlItem, { key: employee.id, isFiltered: !filterState[employee.id], cardColor: (_b = (_a = CalendarMockData_1.teams.find(function (_a) {
                        var teamID = _a.teamID;
                        return teamID === employee.teamId;
                    })) === null || _a === void 0 ? void 0 : _a.teamColor) !== null && _b !== void 0 ? _b : '', onEmployeeClick: function () { return onEmployeeClick(employee.id); }, fullName: employee.fullName }));
            })),
            react_1["default"].createElement("div", { className: "card-component" },
                react_1["default"].createElement(_components_1.Scheduler, { data: data.filter(function (event) { return filterState[event.employeeID ? event.employeeID : '']; }), onDataChange: onDataChange, modelFields: CalendarMockData_1.ordersModelFields, group: {
                        resources: ['Teams']
                    }, resources: [
                        {
                            name: 'Teams',
                            data: CalendarMockData_1.teams
                                .filter(function (team) { return filterState[team.managerID]; })
                                .map(function (item) { return (__assign(__assign({}, item), { text: (react_1["default"].createElement(_1.CalendarHeaderCardCell, { cardColor: item.teamColor, employeeImage: item.photo, fullName: item.managerName, jobTitle: item.jobTitle })) })); }),
                            field: 'teamID',
                            valueField: 'teamID',
                            textField: 'text',
                            colorField: 'teamColor'
                        },
                    ] })))));
};
