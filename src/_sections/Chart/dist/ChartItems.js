"use strict";
exports.__esModule = true;
exports.ChartAverageCustomerOrders = exports.ChartAverageHourlyPerAllServices = exports.ChartStaffEmployment = exports.ChartAppointmentFunnel = exports.ChartAverageHourlyPerService = exports.ChartServiceSales = exports.ChartAppointmentsPerStaff = exports.ChartAppointmentSales = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var kendo_react_charts_1 = require("@progress/kendo-react-charts");
var kendo_react_gauges_1 = require("@progress/kendo-react-gauges");
// Constants
var ChartHelpers_1 = require("../../_bus/Chart/ChartHelpers");
var Constants_1 = require("../../_bus/Constants");
// Selectors
var ChartSelectors_1 = require("../../_bus/Chart/ChartSelectors");
var TooltipRender = function (_a) {
    var point = _a.point;
    return point === null || point === void 0 ? void 0 : point.category;
};
exports.ChartAppointmentSales = function (_a) {
    var className = _a.className;
    var _b = react_redux_1.useSelector(ChartSelectors_1.selectAppointmentsSalesChartData()), totalChartData = _b.totalChartData, servicesChartData = _b.servicesChartData, productChartData = _b.productChartData;
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "text-left" }, "Appointment Sales"),
        react_1["default"].createElement(kendo_react_charts_1.Chart, null,
            react_1["default"].createElement(kendo_react_charts_1.ChartTitle, { text: "Last 12 weeks", align: "left" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartLegend, { position: "top", orientation: "horizontal", align: "start" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartSeries, null,
                react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { type: "line", data: productChartData, name: "Product", tooltip: { visible: true } }),
                react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { type: "line", data: servicesChartData, name: "Service", tooltip: { visible: true } }),
                react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { type: "area", data: totalChartData, name: "Total", tooltip: { visible: true } })),
            react_1["default"].createElement(kendo_react_charts_1.ChartCategoryAxis, null,
                react_1["default"].createElement(kendo_react_charts_1.ChartCategoryAxisItem, { title: { text: 'WEEK Number' }, categories: ChartHelpers_1.WeekNumbers })))));
};
exports.ChartAppointmentsPerStaff = function (_a) {
    var className = _a.className;
    var _b = react_redux_1.useSelector(ChartSelectors_1.selectAppointmentPerStaffChartData()), categories = _b[0], series = _b[1];
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "text-left" }, "Appointments / Staff"),
        react_1["default"].createElement(kendo_react_charts_1.Chart, null,
            react_1["default"].createElement(kendo_react_charts_1.ChartTitle, { text: "Average per week", align: "left" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartLegend, { position: "top", orientation: "horizontal", align: "start" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartSeries, null, series.map(function (_a) {
                var data = _a.data, name = _a.name;
                return (react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { key: Math.random(), type: "column", data: data, name: name, tooltip: { visible: true } }));
            })),
            react_1["default"].createElement(kendo_react_charts_1.ChartCategoryAxis, null,
                react_1["default"].createElement(kendo_react_charts_1.ChartCategoryAxisItem, { title: { text: 'STAFF' }, categories: categories })))));
};
exports.ChartServiceSales = function (_a) {
    var className = _a.className;
    var _b = react_redux_1.useSelector(ChartSelectors_1.selectAppointmentsSalesChartData()), servicesChartData = _b.servicesChartData, productChartData = _b.productChartData;
    var series = [
        { name: 'Product', data: productChartData },
        { name: 'Service', data: servicesChartData },
    ];
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "text-left" }, "Product / Service Sales"),
        react_1["default"].createElement(kendo_react_charts_1.Chart, null,
            react_1["default"].createElement(kendo_react_charts_1.ChartTitle, { text: "Last 12 weeks", align: "left" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartLegend, { position: "top", orientation: "horizontal", align: "start" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartSeries, null, series.map(function (_a) {
                var data = _a.data, name = _a.name;
                return (react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { key: Math.random(), type: "column", data: data, name: name, tooltip: { visible: true } }));
            })),
            react_1["default"].createElement(kendo_react_charts_1.ChartCategoryAxis, null,
                react_1["default"].createElement(kendo_react_charts_1.ChartCategoryAxisItem, { title: { text: 'WEEK Number' }, categories: ChartHelpers_1.WeekNumbers })))));
};
exports.ChartAverageHourlyPerService = function (_a) {
    var className = _a.className;
    var data = react_redux_1.useSelector(ChartSelectors_1.selectAverageHourlyPerServiceChartData());
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "text-center" }, "Average Hourly $ Per Service"),
        react_1["default"].createElement(kendo_react_charts_1.Chart, { seriesColors: Constants_1.SeriesColors },
            react_1["default"].createElement(kendo_react_charts_1.ChartTitle, { text: "Last 12 weeks" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartLegend, { position: "top", orientation: "vertical" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartSeries, null,
                react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { type: "pie", overlay: {
                        gradient: 'sharpBevel'
                    }, tooltip: { visible: true }, data: data, colorField: "color", categoryField: "name", field: "data" })))));
};
exports.ChartAppointmentFunnel = function (_a) {
    var className = _a.className;
    var data = react_redux_1.useSelector(ChartSelectors_1.selectAppointmentFunnelChartData());
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "text-center" }, "Appointment Funnel"),
        react_1["default"].createElement(kendo_react_charts_1.Chart, { style: { margin: '0 auto', width: '90%' } },
            react_1["default"].createElement(kendo_react_charts_1.ChartTitle, { text: "Next 12 weeks" }),
            react_1["default"].createElement(kendo_react_charts_1.ChartSeries, null,
                react_1["default"].createElement(kendo_react_charts_1.ChartSeriesItem, { type: "funnel", data: data, categoryField: "stat", field: "data", colorField: "color", dynamicSlope: true, dynamicHeight: false },
                    react_1["default"].createElement(kendo_react_charts_1.ChartSeriesLabels, { color: "white", background: "none", format: "N0" }))),
            react_1["default"].createElement(kendo_react_charts_1.ChartTooltip, { render: TooltipRender }),
            react_1["default"].createElement(kendo_react_charts_1.ChartLegend, { visible: false }))));
};
exports.ChartStaffEmployment = function (_a) {
    var className = _a.className;
    var totalAppointmentHours = react_redux_1.useSelector(ChartSelectors_1.selectTotalAppointmentHours);
    var totalStaffWorkHoursInWeekRange = react_redux_1.useSelector(ChartSelectors_1.selectTotalStaffWorkHoursInWeekRange);
    var value = totalAppointmentHours !== 0 ? Math.round((totalAppointmentHours * 100) / totalStaffWorkHoursInWeekRange) : 0;
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "mb-2" }, "Staff Employment"),
        react_1["default"].createElement("div", { className: "text-muted mb-4 pt-1" }, "Last 12 weeks"),
        react_1["default"].createElement(kendo_react_gauges_1.ArcGauge, { value: value, arcCenterRender: function (currentValue, color) { return react_1["default"].createElement("h3", { style: { color: color } },
                currentValue,
                "%"); } })));
};
exports.ChartAverageHourlyPerAllServices = function (_a) {
    var className = _a.className;
    var _b = react_redux_1.useSelector(ChartSelectors_1.selectAverageHourlyPerAllServiceChartData()), sales = _b[0], hours = _b[1];
    var value = sales !== 0 ? Math.round(sales / hours) : 0;
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "mb-2" }, "Average Hourly $ Per All Services"),
        react_1["default"].createElement("div", { className: "text-muted mb-3 pt-1" }, "Last 12 weeks"),
        react_1["default"].createElement(kendo_react_gauges_1.LinearGauge, { pointer: { value: value, color: '#28b4c8', size: 40 }, scale: { max: value + 20 }, style: { height: 320 } })));
};
exports.ChartAverageCustomerOrders = function (_a) {
    var className = _a.className;
    var totalSales = react_redux_1.useSelector(ChartSelectors_1.selectTotalAppointmentSales);
    var amountActiveCustomers = react_redux_1.useSelector(ChartSelectors_1.selectAmountActiveCustomers);
    var value = totalSales !== 0 ? Math.round(totalSales / amountActiveCustomers) : 0;
    return (react_1["default"].createElement("section", { className: className },
        react_1["default"].createElement("h3", { className: "mb-2" }, "Average Customer Orders"),
        react_1["default"].createElement("div", { className: "text-muted mb-3 pt-1" }, "Last 12 weeks"),
        react_1["default"].createElement(kendo_react_gauges_1.LinearGauge, { pointer: { value: value, color: '#f6d245', size: 40 }, scale: { max: value + 20, minorUnit: 1, majorUnit: 10 }, style: { height: 320 } })));
};
