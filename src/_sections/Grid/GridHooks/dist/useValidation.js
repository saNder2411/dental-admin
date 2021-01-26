"use strict";
exports.__esModule = true;
exports.useEndDateEventValidation = exports.useStartDateEventValidation = exports.useByIdValidation = exports.usePhoneFieldsValidation = exports.useTextFieldsValidation = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
// Selectors
var EntitiesSelectors_1 = require("../../../_bus/Entities/EntitiesSelectors");
exports.useTextFieldsValidation = function (value) {
    var _a = react_1.useState(true), isValid = _a[0], setIsValid = _a[1];
    react_1.useEffect(function () {
        if (value)
            return;
        setIsValid(false);
        return function () { return setIsValid(true); };
    }, [value]);
    return isValid;
};
exports.usePhoneFieldsValidation = function (errorMessage) {
    var _a = react_1.useState(true), isValid = _a[0], setIsValid = _a[1];
    react_1.useEffect(function () {
        if (!errorMessage)
            return;
        setIsValid(false);
        return function () { return setIsValid(true); };
    }, [errorMessage]);
    return isValid;
};
exports.useByIdValidation = function (ID) {
    var _a = react_1.useState(true), isValid = _a[0], setIsValid = _a[1];
    react_1.useEffect(function () {
        if (ID > 0)
            return;
        setIsValid(false);
        return function () { return setIsValid(true); };
    }, [ID]);
    return isValid;
};
exports.useStartDateEventValidation = function (value, LookupHR01teamId) {
    var _a = react_1.useState(true), isValid = _a[0], setIsValid = _a[1];
    var _b = react_1.useState(false), showPopup = _b[0], setShowPopup = _b[1];
    var selectEmployeeAppointments = react_1.useMemo(function () { return EntitiesSelectors_1.selectAppointmentByEmployeeID(LookupHR01teamId); }, [LookupHR01teamId]);
    var employeeAppointments = react_redux_1.useSelector(selectEmployeeAppointments);
    var actualAppointments = employeeAppointments.filter(function (_a) {
        var Start = _a.Start;
        return Date.now() < Start.getTime();
    });
    react_1.useEffect(function () {
        if (actualAppointments.length === 0)
            return;
        for (var _i = 0, actualAppointments_1 = actualAppointments; _i < actualAppointments_1.length; _i++) {
            var _a = actualAppointments_1[_i], Start = _a.Start, End = _a.End;
            var inputStartDateInTimestamp = value.getTime();
            if (inputStartDateInTimestamp > Start.getTime() && inputStartDateInTimestamp < End.getTime()) {
                setIsValid(false);
                break;
            }
            else if (!isValid) {
                setShowPopup(false);
                setIsValid(true);
            }
        }
    }, [actualAppointments, actualAppointments.length, isValid, value]);
    react_1.useEffect(function () {
        if (!isValid) {
            setShowPopup(true);
        }
        return function () { return setIsValid(true); };
    }, [isValid]);
    return { isValid: isValid, showPopup: showPopup, setShowPopup: setShowPopup, actualAppointments: actualAppointments };
};
exports.useEndDateEventValidation = function (value, LookupHR01teamId) {
    var _a = react_1.useState(true), isValid = _a[0], setIsValid = _a[1];
    var _b = react_1.useState(false), showPopup = _b[0], setShowPopup = _b[1];
    var selectEmployeeAppointments = react_1.useMemo(function () { return EntitiesSelectors_1.selectAppointmentByEmployeeID(LookupHR01teamId); }, [LookupHR01teamId]);
    var employeeAppointments = react_redux_1.useSelector(selectEmployeeAppointments);
    var actualAppointments = employeeAppointments.filter(function (_a) {
        var Start = _a.Start;
        return Date.now() < Start.getTime();
    });
    react_1.useEffect(function () {
        if (actualAppointments.length === 0)
            return;
        for (var _i = 0, actualAppointments_2 = actualAppointments; _i < actualAppointments_2.length; _i++) {
            var _a = actualAppointments_2[_i], Start = _a.Start, End = _a.End;
            var inputEndDateInTimestamp = value.getTime();
            if (inputEndDateInTimestamp > Start.getTime() && inputEndDateInTimestamp < End.getTime()) {
                setIsValid(false);
                break;
            }
            else if (!isValid) {
                setShowPopup(false);
                setIsValid(true);
            }
        }
    }, [actualAppointments, actualAppointments.length, isValid, value]);
    react_1.useEffect(function () {
        if (!isValid) {
            setShowPopup(true);
        }
        return function () { return setIsValid(true); };
    }, [isValid]);
    return { isValid: isValid, showPopup: showPopup, setShowPopup: setShowPopup, actualAppointments: actualAppointments };
};
