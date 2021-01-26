"use strict";
exports.__esModule = true;
exports.ChartReducer = void 0;
var redux_1 = require("redux");
var EntitiesTypes_1 = require("../Entities/EntitiesTypes");
// Helpers
var ChartReducersHelpers_1 = require("./ChartReducersHelpers");
var initAppointmentsDataForChart = {
    sliceAppointmentsInLastWeekRange: [],
    totalAppointmentHours: 0,
    totalAppointmentSales: 0,
    activeCustomersIDs: [],
    appointmentReservations: 0,
    appointmentBookings: 0,
    appointmentAttended: 0,
    paymentCompleted: 0
};
var appointmentsDataForChartReducer = function (state, action) {
    if (state === void 0) { state = initAppointmentsDataForChart; }
    switch (action.type) {
        case EntitiesTypes_1.ActionTypes.FETCH_DATA_SUCCESS:
            return ChartReducersHelpers_1.updateAppointmentsDataForChart(state, action.entityName, action.data);
        default:
            return state;
    }
};
var totalStaffWorkHoursInWeekRangeReducer = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case EntitiesTypes_1.ActionTypes.FETCH_DATA_SUCCESS:
            return ChartReducersHelpers_1.updateTotalStaffWorkHoursInWeekRange(state, action.entityName, action.data);
        default:
            return state;
    }
};
exports.ChartReducer = redux_1.combineReducers({
    appointmentsDataForChart: appointmentsDataForChartReducer,
    totalStaffWorkHoursInWeekRange: totalStaffWorkHoursInWeekRangeReducer
});
