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
exports.SchedulerCustomEditItem = void 0;
var react_1 = require("react");
var kendo_react_scheduler_1 = require("@progress/kendo-react-scheduler");
// Components
var _1 = require("./");
exports.SchedulerCustomEditItem = function (props) {
    var _a = react_1.useState(null), formItem = _a[0], setFormItem = _a[1];
    console.log("SchedulerCustomEditItemProps", props);
    var onFormItemChange = react_1.useCallback(function (_a) {
        var value = _a.value;
        return setFormItem(value);
    }, []);
    return react_1["default"].createElement(kendo_react_scheduler_1.SchedulerEditItem, __assign({}, props, { formItem: formItem, onFormItemChange: onFormItemChange, form: _1.SchedulerCustomEditForm }));
};
