"use strict";
exports.__esModule = true;
exports.emailValidator = exports.phoneValidator = exports.SchedulerCustomEditForm = void 0;
var react_1 = require("react");
var kendo_react_dialogs_1 = require("@progress/kendo-react-dialogs");
var kendo_react_form_1 = require("@progress/kendo-react-form");
// Styled Components
var SC = require("./SchedulerCustomEditFormStyled");
// Form Inputs
var SchedulerCustomEditFormComponents_1 = require("./SchedulerCustomEditFormComponents");
// Mock
var CustomersMockData_1 = require("../../Customers/CustomersMockData");
var CalendarMockData_1 = require("../../Calendar/CalendarMockData");
var customers = CustomersMockData_1.CustomersGridData.map(function (_a) {
    var firstName = _a.firstName, lastName = _a.lastName;
    return firstName + " " + lastName;
});
var stuffs = CalendarMockData_1.employees.map(function (_a) {
    var fullName = _a.fullName;
    return fullName;
});
var statusList = Object.values(CalendarMockData_1.OrderStatus);
var recurrenceNames = ['Never', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
var endRecurrenceDailyData = [
    { label: 'Never', value: 'never' },
    { label: 'After', value: 'after' },
    { label: 'On', value: 'on' },
];
var recurrenceWeeklyData = [
    { name: 'Sun', isSelected: false },
    { name: 'Mon', isSelected: false },
    { name: 'Tue', isSelected: true },
    { name: 'Wed', isSelected: false },
    { name: 'Thu', isSelected: false },
    { name: 'Fri', isSelected: false },
    { name: 'Sat', isSelected: false },
];
var repeatOnMonthlyData = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
];
var weekNumbers = ['First', 'Second', 'Third', 'Fourth', 'Last'];
var monthlyDayNames = ['Day', 'Weekday', 'Weekend Day', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var repeatOnYearlyData = [
    { label: '', value: 'month' },
    { label: '', value: 'week' },
];
var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
exports.SchedulerCustomEditForm = function (_a) {
    var dataItem = _a.dataItem, onSubmit = _a.onSubmit, onCancel = _a.onCancel, onClose = _a.onClose;
    console.log("formDataItem", dataItem);
    return (react_1["default"].createElement(kendo_react_dialogs_1.Dialog, { title: 'Event', onClose: function () { return onClose && onClose({ value: dataItem }); }, minWidth: 700 },
        react_1["default"].createElement(SC.SchedulerCustomEditForm, null,
            react_1["default"].createElement(kendo_react_form_1.Form, { initialValues: dataItem, onSubmit: function (dataItem) { return onSubmit({ value: dataItem }); }, render: function (formRenderProps) {
                    console.log("formRenderProps", formRenderProps);
                    var repeatValue = formRenderProps.valueGetter('repeat');
                    var secondLabelForRepeatEvery;
                    switch (repeatValue) {
                        case 'Daily':
                            secondLabelForRepeatEvery = 'day(s)';
                            break;
                        case 'Weekly':
                            secondLabelForRepeatEvery = 'week(s)';
                            break;
                        case 'Monthly':
                            secondLabelForRepeatEvery = 'month(s)';
                            break;
                        case 'Yearly':
                            secondLabelForRepeatEvery = 'year(s)';
                            break;
                        default:
                            secondLabelForRepeatEvery = '';
                    }
                    return (react_1["default"].createElement(kendo_react_form_1.FormElement, { horizontal: true },
                        react_1["default"].createElement("fieldset", { className: "k-form-fieldset" },
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'customer', name: 'customer', label: 'Customer', data: customers, component: SchedulerCustomEditFormComponents_1.FormComboBox, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'firstName', name: 'firstName', label: 'First Name', component: SchedulerCustomEditFormComponents_1.FormInput, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'lastName', name: 'lastName', label: 'Last Name', component: SchedulerCustomEditFormComponents_1.FormInput, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'mobilePhone', name: 'mobilePhone', label: 'Mobile Phone', mask: '+1(999) 000-00-00-00', component: SchedulerCustomEditFormComponents_1.FormMaskedTextBox, validator: exports.phoneValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'email', name: 'email', label: 'Email', type: 'email', component: SchedulerCustomEditFormComponents_1.FormInput, validator: exports.emailValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'staff', name: 'staff', label: 'Support Stuff', data: stuffs, component: SchedulerCustomEditFormComponents_1.FormComboBox, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'start', name: 'start', label: 'Start', component: SchedulerCustomEditFormComponents_1.FormDateTimePicker, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'end', name: 'end', label: 'End', component: SchedulerCustomEditFormComponents_1.FormDateTimePicker, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'refID', name: 'refID', label: 'Services', component: SchedulerCustomEditFormComponents_1.FormInput, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'status', name: 'status', label: 'Status', data: statusList, component: SchedulerCustomEditFormComponents_1.FormDropDownList, validator: requiredValidator }),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeat', name: 'repeat', label: 'Repeat', data: recurrenceNames, component: SchedulerCustomEditFormComponents_1.FormDropDownList }),
                            repeatValue !== 'Never' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeatEvery', name: 'repeatEvery', label: 'Repeat every', format: 'n0', min: 1, defaultValue: 1, secondLabel: secondLabelForRepeatEvery, component: SchedulerCustomEditFormComponents_1.FormNumericTextBox }))),
                            repeatValue === 'Weekly' && (react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeatOnWeekday', name: 'repeatOnWeekday', label: 'Repeat on', data: recurrenceWeeklyData, component: SchedulerCustomEditFormComponents_1.FormButtonGroup })),
                            repeatValue === 'Monthly' && (react_1["default"].createElement("div", { className: "row m-0" },
                                react_1["default"].createElement("div", { className: "col-md-4 p-0" },
                                    react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeatOnMonthly', name: 'repeatOnMonthly', label: 'Repeat on', defaultValue: 'day', data: repeatOnMonthlyData, component: SchedulerCustomEditFormComponents_1.FormRadioGroup })),
                                react_1["default"].createElement("div", { className: "col-md-6 monthly-group" },
                                    react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeatOnMonthlyDay', name: 'repeatOnMonthlyDay', format: 'n0', min: 1, max: 31, defaultValue: 1, disabled: formRenderProps.valueGetter('repeatOnMonthly') === 'week', component: SchedulerCustomEditFormComponents_1.FormNumericTextBox }),
                                    react_1["default"].createElement("div", { className: "row m-0 pt-1" },
                                        react_1["default"].createElement("div", { className: "col-md-4 p-0" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'monthlyWeekNumber', name: 'monthlyWeekNumber', component: SchedulerCustomEditFormComponents_1.FormDropDownList, data: weekNumbers, defaultValue: weekNumbers[0], disabled: formRenderProps.valueGetter('repeatOnMonthly') !== 'week' })),
                                        react_1["default"].createElement("div", { className: "col-md-6 p-0" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'monthlyWeekday', name: 'monthlyWeekday', component: SchedulerCustomEditFormComponents_1.FormDropDownList, data: monthlyDayNames, defaultValue: monthlyDayNames[3], disabled: formRenderProps.valueGetter('repeatOnMonthly') !== 'week' })))))),
                            repeatValue === 'Yearly' && (react_1["default"].createElement("div", { className: "row m-0" },
                                react_1["default"].createElement("div", { className: "col-md-3 p-0" },
                                    react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeatOnYearly', name: 'repeatOnYearly', label: 'Repeat on', defaultValue: 'month', data: repeatOnYearlyData, component: SchedulerCustomEditFormComponents_1.FormRadioGroup })),
                                react_1["default"].createElement("div", { className: "col-md-6 yearly-group" },
                                    react_1["default"].createElement("div", { className: "row m-0 pt-1" },
                                        react_1["default"].createElement("div", { className: "col-md-6 p-0" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'monthNames', name: 'monthNames', data: monthName, defaultValue: monthName[0], disabled: formRenderProps.valueGetter('repeatOnYearly') === 'week', component: SchedulerCustomEditFormComponents_1.FormDropDownList })),
                                        react_1["default"].createElement("div", { className: "col-md-4 p-0" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'repeatOnYearlyDay', name: 'repeatOnYearlyDay', format: 'n0', min: 1, max: 31, defaultValue: 1, disabled: formRenderProps.valueGetter('repeatOnYearly') === 'week', component: SchedulerCustomEditFormComponents_1.FormNumericTextBox }))),
                                    react_1["default"].createElement("div", { className: "row pt-1  yearly-group yearly-group-dropdown" },
                                        react_1["default"].createElement("div", { className: "col-md-3 p-0 pr-1" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'yearlyWeekNumber', name: 'yearlyWeekNumber', component: SchedulerCustomEditFormComponents_1.FormDropDownList, data: weekNumbers, defaultValue: weekNumbers[0], disabled: formRenderProps.valueGetter('repeatOnYearly') !== 'week' })),
                                        react_1["default"].createElement("div", { className: "col-md-4 p-0" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'yearlyWeekday', name: 'yearlyWeekday', data: monthlyDayNames, defaultValue: monthlyDayNames[3], disabled: formRenderProps.valueGetter('repeatOnYearly') !== 'week', component: SchedulerCustomEditFormComponents_1.FormDropDownList })),
                                        react_1["default"].createElement("div", { className: "col-md-1 p-1" }, "of"),
                                        react_1["default"].createElement("div", { className: "col-md-4 p-0" },
                                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'monthNamess', name: 'monthNames', data: monthName, defaultValue: monthName[0], disabled: formRenderProps.valueGetter('repeatOnYearly') !== 'week', component: SchedulerCustomEditFormComponents_1.FormDropDownList })))))),
                            repeatValue !== 'Never' && (react_1["default"].createElement("div", { className: "row m-0" },
                                react_1["default"].createElement("div", { className: "col-md-4 p-0" },
                                    react_1["default"].createElement(kendo_react_form_1.Field, { id: 'endRecurrenceDaily', name: 'endRecurrenceDaily', label: 'End', defaultValue: 'never', component: SchedulerCustomEditFormComponents_1.FormRadioGroup, data: endRecurrenceDailyData })),
                                react_1["default"].createElement("div", { className: "col-md-6 p-0 pt-5 align-self-end" },
                                    react_1["default"].createElement(kendo_react_form_1.Field, { id: 'endAfterRepeatDayCount', name: 'endAfterRepeatDayCount', format: 'n0', min: 1, defaultValue: 1, disabled: formRenderProps.valueGetter('endRecurrenceDaily') !== 'after', secondLabel: 'occurrence(s)', component: SchedulerCustomEditFormComponents_1.FormNumericTextBox }),
                                    react_1["default"].createElement(kendo_react_form_1.Field, { id: 'endOn', name: 'start', disabled: formRenderProps.valueGetter('endRecurrenceDaily') !== 'on', component: SchedulerCustomEditFormComponents_1.FormDateTimePicker, validator: requiredValidator })))),
                            react_1["default"].createElement(kendo_react_form_1.Field, { id: 'notes', name: 'notes', label: 'Notes', component: SchedulerCustomEditFormComponents_1.FormTextArea }),
                            react_1["default"].createElement("div", { className: "form__actions-bar-wrapper" },
                                react_1["default"].createElement(kendo_react_dialogs_1.DialogActionsBar, null,
                                    react_1["default"].createElement("button", { className: "k-button", type: "submit", disabled: !formRenderProps.allowSubmit }, "Save"),
                                    react_1["default"].createElement("button", { className: "k-button", onClick: function () { return onCancel && onCancel({ value: dataItem }); } }, "Cancel"))))));
                } }))));
};
var phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
var emailRegex = new RegExp(/\S+@\S+\.\S+/);
var requiredValidator = function (value) { return (value ? '' : 'Error: This field is required.'); };
exports.phoneValidator = function (value) { return (!value ? 'Phone number is required.' : phoneRegex.test(value) ? '' : 'Not a valid phone number.'); };
exports.emailValidator = function (value) { return (!value ? 'Email field is required.' : emailRegex.test(value) ? '' : 'Email is not valid format.'); };
