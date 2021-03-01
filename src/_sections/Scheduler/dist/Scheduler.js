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
exports.Scheduler = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var kendo_react_scheduler_1 = require("@progress/kendo-react-scheduler");
//Components
var SchedulerItems_1 = require("./SchedulerItems");
// Selectors
var EntitiesSelectors_1 = require("../../_bus/Entities/EntitiesSelectors");
// Action Creators
var EntitiesAC_1 = require("../../_bus/Entities/EntitiesAC");
var SchedulerAC_1 = require("../../_bus/Scheduler/SchedulerAC");
// Helpers
var SchedulerHelpers_1 = require("./SchedulerHelpers");
exports.Scheduler = function (_a) {
    var data = _a.data, modelFields = _a.modelFields, group = _a.group, resources = _a.resources, setIsAgendaDataItemLoading = _a.setIsAgendaDataItemLoading;
    var dispatch = react_redux_1.useDispatch();
    var servicesById = react_redux_1.useSelector(EntitiesSelectors_1.selectServicesById());
    var staffById = react_redux_1.useSelector(EntitiesSelectors_1.selectStaffById());
    var customersById = react_redux_1.useSelector(EntitiesSelectors_1.selectCustomersById());
    var appointmentsAllIDs = react_redux_1.useSelector(EntitiesSelectors_1.selectAppointmentsAllIds);
    var onDataChange = react_1.useCallback(function (_a) {
        var updated = _a.updated, created = _a.created;
        if (typeof updated[0] === 'number' || !updated[0])
            return;
        var updatedDataItem = updated[0];
        if (updatedDataItem.MetroRRule && created[0]) {
            setIsAgendaDataItemLoading(true);
            var processCreateDataItem = SchedulerHelpers_1.getNewDataItemOnRecurrenceDragEvent(created[0])(appointmentsAllIDs);
            dispatch(EntitiesAC_1.updateAppointmentRecurringDataItemInitAsyncAC(updatedDataItem, processCreateDataItem, null, servicesById, staffById, customersById, function () {
                return setIsAgendaDataItemLoading(false);
            }));
            return;
        }
        setIsAgendaDataItemLoading(true);
        var processUpdateDataItem = __assign(__assign({}, updatedDataItem), { LookupHR01teamId: updatedDataItem.TeamID });
        dispatch(EntitiesAC_1.updateAppointmentDataItemInitAsyncAC(processUpdateDataItem, null, servicesById, staffById, customersById, function () { return setIsAgendaDataItemLoading(false); }));
    }, [appointmentsAllIDs, customersById, dispatch, servicesById, setIsAgendaDataItemLoading, staffById]);
    var onDateChange = react_1.useCallback(function (evt) { return dispatch(SchedulerAC_1.changeSelectedDateAC(evt.value)); }, [dispatch]);
    var onViewChange = react_1.useCallback(function (evt) { return dispatch(SchedulerAC_1.changeSelectedViewAC(evt.value)); }, [dispatch]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(kendo_react_scheduler_1.Scheduler, { style: { minHeight: 700, minWidth: 1300, overflow: 'auto' }, data: data, modelFields: modelFields, onDataChange: onDataChange, onDateChange: onDateChange, onViewChange: onViewChange, group: group, resources: resources, item: SchedulerItems_1.SchedulerItem, slot: SchedulerItems_1.SchedulerSlot, task: SchedulerItems_1.SchedulerAgendaTask, defaultView: 'day', editable: {
                add: true,
                remove: true,
                drag: true,
                resize: true,
                edit: true,
                select: false
            } },
            react_1["default"].createElement(kendo_react_scheduler_1.DayView, { workDayStart: '08:00', workDayEnd: '20:00', slotDuration: 60, slotDivisions: 4 }),
            react_1["default"].createElement(kendo_react_scheduler_1.WeekView, { slotDuration: 60, slotDivisions: 4, dateHeaderCell: SchedulerItems_1.CustomDateHeaderCell }),
            react_1["default"].createElement(kendo_react_scheduler_1.MonthView, { dateHeaderCell: SchedulerItems_1.CustomDateHeaderCell }))));
};
