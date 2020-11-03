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
exports.SchedulerCustomItem = void 0;
var react_1 = require("react");
var kendo_react_scheduler_1 = require("@progress/kendo-react-scheduler");
var kendo_react_popup_1 = require("@progress/kendo-react-popup");
var kendo_react_intl_1 = require("@progress/kendo-react-intl");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var kendo_react_layout_1 = require("@progress/kendo-react-layout");
// Styled Components
var SC = require("./SchedulerCustomItemStyled");
// Instruments
var _instruments_1 = require("../../_instruments");
exports.SchedulerCustomItem = function (props) {
    var _a, _b, _c;
    var _d = react_1.useState(false), showPopup = _d[0], setShowPopup = _d[1];
    var intl = kendo_react_intl_1.useInternationalization();
    // console.log(`CustomItemProps`, props);
    var dataItem = props.dataItem, children = props.children, isAllDay = props.isAllDay, zonedStart = props.zonedStart, zonedEnd = props.zonedEnd, _ref = props._ref;
    var iconName = dataItem.status;
    var iconDentalName = dataItem.dentalStatus;
    return (react_1["default"].createElement(kendo_react_scheduler_1.SchedulerItem, __assign({}, props, { 
        // onMouseEnter={() => setShowPopup(true)}
        // onMouseLeave={() => setShowPopup(false)}
        onClick: function () { return setShowPopup(function (prevState) { return !prevState; }); } }),
        react_1["default"].createElement(SC.SchedulerItemTopWrapper, null,
            children,
            react_1["default"].createElement("div", { className: "SchedulerItem__icons" },
                react_1["default"].createElement("div", { className: "SchedulerItem__icon" },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: _instruments_1.IconBook[iconDentalName].icon, color: _instruments_1.IconBook[iconDentalName].statusColor, size: 'lg' })),
                react_1["default"].createElement("div", { className: "SchedulerItem__icon" },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: _instruments_1.IconBook[iconName].icon, style: _instruments_1.IconBook[iconName].style, size: 'lg' })))),
        !isAllDay && (react_1["default"].createElement(kendo_react_scheduler_1.SchedulerItemContent, null,
            react_1["default"].createElement("div", { className: "SchedulerItemContent__item" }, dataItem.refID),
            react_1["default"].createElement("div", { className: "SchedulerItemContent__item" },
                intl.formatDate(zonedStart, 't'),
                " - ",
                intl.formatDate(zonedEnd, 't')),
            react_1["default"].createElement("div", { className: "SchedulerItemContent__item" }, dataItem.notes))),
        react_1["default"].createElement(kendo_react_popup_1.Popup, { show: showPopup, anchorAlign: { horizontal: 'left', vertical: 'top' }, popupAlign: { horizontal: 'left', vertical: 'bottom' }, popupClass: "SchedulerItemContent-popup-content", anchor: (_a = _ref.current) === null || _a === void 0 ? void 0 : _a.element, style: { width: (_c = (_b = _ref.current) === null || _b === void 0 ? void 0 : _b.element) === null || _c === void 0 ? void 0 : _c.offsetWidth } },
            react_1["default"].createElement("div", { className: "rounded", style: { overflow: 'hidden' } },
                react_1["default"].createElement(kendo_react_layout_1.Card, null,
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                            react_1["default"].createElement("h5", null, dataItem.staff)),
                        react_1["default"].createElement(kendo_react_layout_1.CardBody, null,
                            react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                                "Ref ID",
                                dataItem.refID),
                            react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                                "Start: ",
                                intl.formatDate(props.zonedStart, 't')),
                            react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                                "End: ",
                                intl.formatDate(props.zonedEnd, 't')),
                            react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                                "Mobile Phone: ",
                                dataItem.mobilePhone),
                            react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                                "Email: ",
                                dataItem.email),
                            react_1["default"].createElement(kendo_react_layout_1.CardHeader, null,
                                "Notes: ",
                                dataItem.notes))))))));
};
