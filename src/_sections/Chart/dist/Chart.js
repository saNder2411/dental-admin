"use strict";
exports.__esModule = true;
exports.Chart = void 0;
var react_1 = require("react");
// Components
var ChartItems_1 = require("./ChartItems");
exports.Chart = function () {
    return (react_1["default"].createElement("section", { className: "card-container row" },
        react_1["default"].createElement("section", { className: "border shadow-sm mr-2 pt-2 rounded col" },
            react_1["default"].createElement(ChartItems_1.ChartAppointmentSales, null),
            react_1["default"].createElement(ChartItems_1.ChartAppointmentsPerStaff, null),
            react_1["default"].createElement(ChartItems_1.ChartServiceSales, null)),
        react_1["default"].createElement("section", { className: "col-5" },
            react_1["default"].createElement("section", { className: "row mb-2" },
                react_1["default"].createElement("div", { className: "col px-1" },
                    react_1["default"].createElement(ChartItems_1.ChartStaffEmployment, { className: "h-100 border shadow-sm rounded pt-2" })),
                react_1["default"].createElement("div", { className: "col px-1" },
                    react_1["default"].createElement(ChartItems_1.ChartAppointmentFunnel, { className: "h-100 border shadow-sm rounded py-2" }))),
            react_1["default"].createElement("section", { className: "row mb-2" },
                react_1["default"].createElement("div", { className: "col px-1" },
                    react_1["default"].createElement(ChartItems_1.ChartAverageHourlyPerService, { className: "h-100 border shadow-sm rounded pt-2" })),
                react_1["default"].createElement("div", { className: "col px-1" },
                    react_1["default"].createElement(ChartItems_1.ChartAverageHourlyPerAllServices, { className: "h-100 border shadow-sm rounded py-2" }))),
            react_1["default"].createElement("section", { className: "row" },
                react_1["default"].createElement("div", { className: "col-6 px-1" },
                    react_1["default"].createElement(ChartItems_1.ChartAverageCustomerOrders, { className: "h-100 border shadow-sm rounded py-2" }))))));
};
