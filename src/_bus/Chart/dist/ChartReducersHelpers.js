"use strict";
exports.__esModule = true;
exports.updateTotalStaffWorkHoursInWeekRange = exports.updateAppointmentsDataForChart = void 0;
var EntitiesTypes_1 = require("../Entities/EntitiesTypes");
// Constants
var Constants_1 = require("../Constants");
// Helpers
var ChartHelpers_1 = require("./ChartHelpers");
exports.updateAppointmentsDataForChart = function (state, entityName, data) {
    if (entityName !== EntitiesTypes_1.EntitiesMap.Appointments)
        return state;
    var sliceAppointmentsInLastWeekRange = data.filter(function (_a) {
        var End = _a.End;
        return End.getTime() <= Constants_1.MONDAY_CURRENT_WEEK.getTime();
    });
    var sliceAppointmentsInNextWeekRange = data.filter(function (_a) {
        var Start = _a.Start;
        return Start.getTime() >= Constants_1.MONDAY_CURRENT_WEEK.getTime();
    });
    var _a = sliceAppointmentsInLastWeekRange.reduce(function (acc, _a) {
        var Duration = _a.Duration, ServiceCharge = _a.ServiceCharge, LookupCM102customersId = _a.LookupCM102customersId;
        var prevHours = acc[0], prevSales = acc[1], activeCustomers = acc[2];
        var currentHours = prevHours + Duration / 60 / 60;
        var currentSales = prevSales + ServiceCharge;
        activeCustomers.add(LookupCM102customersId);
        return [currentHours, currentSales, activeCustomers];
    }, [0, 0, new Set()]), totalAppointmentHours = _a[0], totalAppointmentSales = _a[1], activeCustomersSet = _a[2];
    var _b = sliceAppointmentsInNextWeekRange.reduce(function (acc, _a) {
        var AppointmentStatus = _a.AppointmentStatus;
        var prevAppointmentReservations = acc[0], prevAppointmentBookings = acc[1], prevAppointmentAttended = acc[2], prevPaymentCompleted = acc[3];
        var currentAppointmentReservations = AppointmentStatus === EntitiesTypes_1.StatusNames.Reserved ? prevAppointmentReservations + 1 : prevAppointmentReservations;
        var currentAppointmentBookings = AppointmentStatus === EntitiesTypes_1.StatusNames.Booked ? prevAppointmentBookings + 1 : prevAppointmentBookings;
        var currentAppointmentAttended = AppointmentStatus === EntitiesTypes_1.StatusNames.Paid ? prevAppointmentAttended + 1 : prevAppointmentAttended;
        var currentPaymentCompleted = AppointmentStatus === EntitiesTypes_1.StatusNames.Paid ? prevPaymentCompleted + 1 : prevPaymentCompleted;
        return [currentAppointmentReservations, currentAppointmentBookings, currentAppointmentAttended, currentPaymentCompleted];
    }, [0, 0, 0, 0]), appointmentReservations = _b[0], appointmentBookings = _b[1], appointmentAttended = _b[2], paymentCompleted = _b[3];
    return {
        sliceAppointmentsInLastWeekRange: sliceAppointmentsInLastWeekRange,
        totalAppointmentHours: totalAppointmentHours,
        totalAppointmentSales: totalAppointmentSales,
        activeCustomersIDs: Array.from(activeCustomersSet),
        appointmentReservations: appointmentReservations,
        appointmentBookings: appointmentBookings,
        appointmentAttended: appointmentAttended,
        paymentCompleted: paymentCompleted
    };
};
exports.updateTotalStaffWorkHoursInWeekRange = function (state, entityName, data) {
    if (entityName !== EntitiesTypes_1.EntitiesMap.Staff)
        return state;
    return data.reduce(function (sum, staffDataItem) { return (sum += ChartHelpers_1.calcStaffMemberWorkWeekHours(staffDataItem)); }, 0) * Constants_1.WEEK_RANGE;
};
