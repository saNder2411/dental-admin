"use strict";
exports.__esModule = true;
exports.CancelDragModal = exports.EditOccurrenceConfirmModal = exports.RemoveOccurrenceConfirmModal = exports.RemoveConfirmModal = void 0;
var react_1 = require("react");
var kendo_react_dialogs_1 = require("@progress/kendo-react-dialogs");
// Components
var _components_1 = require("../../../_components");
exports.RemoveConfirmModal = function (_a) {
    var isDataItemLoading = _a.isDataItemLoading, onClose = _a.onClose, onCancel = _a.onCancel, onConfirm = _a.onConfirm;
    return (react_1["default"].createElement(kendo_react_dialogs_1.Dialog, { title: "Delete Event", onClose: onClose },
        react_1["default"].createElement("span", null, "Are you sure you want to delete this event?"),
        react_1["default"].createElement(kendo_react_dialogs_1.DialogActionsBar, null,
            react_1["default"].createElement("button", { className: "k-button", onClick: onCancel, disabled: isDataItemLoading }, "Cancel"),
            react_1["default"].createElement("button", { className: "k-button", onClick: onConfirm, disabled: isDataItemLoading }, isDataItemLoading ? (react_1["default"].createElement(_components_1.Loader, { className: "d-flex justify-content-center align-items-center", type: "pulsing", isLoading: isDataItemLoading, themeColor: "primary" })) : ("Delete")))));
};
exports.RemoveOccurrenceConfirmModal = function (_a) {
    var onClose = _a.onClose, onCancel = _a.onCancel, onConfirm = _a.onConfirm;
    return (react_1["default"].createElement(kendo_react_dialogs_1.Dialog, { title: "Delete Recurring Item", onClose: onClose },
        react_1["default"].createElement("span", null, "Do you want to delete only this event occurrence or the whole series?"),
        react_1["default"].createElement(kendo_react_dialogs_1.DialogActionsBar, null,
            react_1["default"].createElement("button", { className: "k-button", onClick: onCancel }, "Delete current occurrence"),
            react_1["default"].createElement("button", { className: "k-button", onClick: onConfirm }, "Delete the series"))));
};
exports.EditOccurrenceConfirmModal = function (_a) {
    var onClose = _a.onClose, onCancel = _a.onCancel, onConfirm = _a.onConfirm;
    return (react_1["default"].createElement(kendo_react_dialogs_1.Dialog, { title: "Edit Recurring Item", onClose: onClose },
        react_1["default"].createElement("span", null, "Do you want to edit only this event occurrence or the whole series?"),
        react_1["default"].createElement(kendo_react_dialogs_1.DialogActionsBar, null,
            react_1["default"].createElement("button", { className: "k-button", onClick: onCancel }, "Edit current occurrence"),
            react_1["default"].createElement("button", { className: "k-button", onClick: onConfirm }, "Edit the series"))));
};
exports.CancelDragModal = function (_a) {
    var onClose = _a.onClose, onCancel = _a.onCancel, title = _a.title, message = _a.message;
    return (react_1["default"].createElement(kendo_react_dialogs_1.Dialog, { title: title, onClose: onClose },
        react_1["default"].createElement("span", null, message),
        react_1["default"].createElement(kendo_react_dialogs_1.DialogActionsBar, null,
            react_1["default"].createElement("button", { className: "k-button", onClick: onCancel }, "OK"))));
};
