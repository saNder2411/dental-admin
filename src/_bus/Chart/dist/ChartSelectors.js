"use strict";
exports.__esModule = true;
exports.selectAppointmentFunnelChartData = exports.selectAverageHourlyPerAllServiceChartData = exports.selectAverageHourlyPerServiceChartData = exports.selectAppointmentPerStaffChartData = exports.selectAppointmentsSalesChartData = exports.selectTotalStaffWorkHoursInWeekRange = exports.selectAmountActiveCustomers = exports.selectTotalAppointmentSales = exports.selectTotalAppointmentHours = exports.getActiveCustomersIDs = void 0;
var reselect_1 = require("reselect");
// Selectors
var EntitiesSelectors_1 = require("../Entities/EntitiesSelectors");
// Helpers
var ChartHelpers_1 = require("./ChartHelpers");
var getSliceAppointmentsInLastWeekRange = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.sliceAppointmentsInLastWeekRange;
};
exports.getActiveCustomersIDs = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.activeCustomersIDs;
};
var getAppointmentReservations = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.appointmentReservations;
};
var getAppointmentBookings = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.appointmentBookings;
};
var getAppointmentAttended = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.appointmentAttended;
};
var getPaymentCompleted = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.paymentCompleted;
};
exports.selectTotalAppointmentHours = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.totalAppointmentHours;
};
exports.selectTotalAppointmentSales = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.totalAppointmentSales;
};
exports.selectAmountActiveCustomers = function (_a) {
    var Chart = _a.Chart;
    return Chart.appointmentsDataForChart.activeCustomersIDs.length;
};
exports.selectTotalStaffWorkHoursInWeekRange = function (_a) {
    var Chart = _a.Chart;
    return Chart.totalStaffWorkHoursInWeekRange;
};
exports.selectAppointmentsSalesChartData = function () {
    return reselect_1.createSelector(getSliceAppointmentsInLastWeekRange, EntitiesSelectors_1.getServicesByIdData, function (sliceAppointments, servicesById) {
        return ChartHelpers_1.getAppointmentSalesData(sliceAppointments, servicesById);
    });
};
exports.selectAppointmentPerStaffChartData = function () {
    return reselect_1.createSelector(getSliceAppointmentsInLastWeekRange, EntitiesSelectors_1.selectOriginalStaffData, function (sliceAppointments, staff) {
        return ChartHelpers_1.getAppointmentPerStaffData(sliceAppointments, staff);
    });
};
exports.selectAverageHourlyPerServiceChartData = function () {
    return reselect_1.createSelector(getSliceAppointmentsInLastWeekRange, EntitiesSelectors_1.selectOriginalServicesData, function (sliceAppointments, services) {
        return ChartHelpers_1.getAverageHourlyPerServiceData(sliceAppointments, services);
    });
};
exports.selectAverageHourlyPerAllServiceChartData = function () {
    return reselect_1.createSelector(getSliceAppointmentsInLastWeekRange, EntitiesSelectors_1.getServicesByIdData, function (sliceAppointments, servicesById) {
        return ChartHelpers_1.getAverageHourlyPerAllServiceData(sliceAppointments, servicesById);
    });
};
exports.selectAppointmentFunnelChartData = function () {
    return reselect_1.createSelector(getAppointmentReservations, getAppointmentBookings, getAppointmentAttended, getPaymentCompleted, function (appointmentReservations, appointmentBookings, appointmentAttended, paymentCompleted) { return [
        {
            stat: 'Appointment Reservations',
            data: 4,
            color: '#166f99'
        },
        {
            stat: 'Appointment Bookings',
            data: 3,
            color: '#2185b4'
        },
        {
            stat: 'Appointment Attended',
            data: 2,
            color: '#319fd2'
        },
        {
            stat: 'Payment Completed',
            data: 1,
            color: '#3eaee2'
        },
    ]; });
};
