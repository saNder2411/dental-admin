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
exports.SchedulerItem = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var kendo_react_scheduler_1 = require("@progress/kendo-react-scheduler");
var kendo_react_popup_1 = require("@progress/kendo-react-popup");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
// Styled Components
var SC = require("../SchedulerItemsStyled/SchedulerItemStyled");
// Components
var SchedulerEditItem_1 = require("./SchedulerEditItem");
var SchedulerItemPopupContent_1 = require("./SchedulerItemPopupContent");
var SchedulerConfirmModals_1 = require("./SchedulerConfirmModals");
// Instruments
var _instruments_1 = require("../../../_instruments");
// Types
var EntitiesTypes_1 = require("../../../_bus/Entities/EntitiesTypes");
var AppointmentsTypes_1 = require("../../../_bus/_Appointments/AppointmentsTypes");
//Action Creators
var EntitiesAC_1 = require("../../../_bus/Entities/EntitiesAC");
var SchedulerAC_1 = require("../../../_bus/Scheduler/SchedulerAC");
// Selectors
var SchedulerSelectors_1 = require("../../../_bus/Scheduler/SchedulerSelectors");
var EntitiesSelectors_1 = require("../../../_bus/Entities/EntitiesSelectors");
var UISelectors_1 = require("../../../_bus/UI/UISelectors");
// Helpers
var SchedulerHelpers_1 = require("../SchedulerHelpers");
exports.SchedulerItem = function (props) {
    var _a, _b, _c, _d, _e;
    var dataItem = props.dataItem, children = props.children, _ref = props._ref, group = props.group, isRecurring = props.isRecurring;
    var dispatch = react_redux_1.useDispatch();
    var appointmentIsDataItemLoading = react_redux_1.useSelector(UISelectors_1.selectDataItemIsLoading);
    var selectedView = react_redux_1.useSelector(SchedulerSelectors_1.selectSelectedView);
    // const [showCancelDragPopup, setShowCancelDragPopup] = useState(false);
    // const [titleCancelDragPopup, setTitleCancelDragPopup] = useState(`Edit Recurring Item`);
    // const [messageCancelDragPopup, setMessageCancelDragPopup] = useState(`Editing Recurring items is not supported here. please request admin assitance`);
    var _f = react_1.useState(false), showEditForm = _f[0], setShowEditForm = _f[1];
    var _g = react_1.useState(false), showPopup = _g[0], setShowPopup = _g[1];
    var _h = react_1.useState(false), showRemoveDialog = _h[0], setShowRemoveDialog = _h[1];
    var _j = react_1.useState(false), showEditOccurrenceDialog = _j[0], setShowEditOccurrenceDialog = _j[1];
    var _k = react_1.useState(false), showRemoveOccurrenceDialog = _k[0], setShowRemoveOccurrenceDialog = _k[1];
    var _l = react_1.useState(false), isRemoveOccurrence = _l[0], setIsRemoveOccurrence = _l[1];
    var _m = react_1.useState(false), isDataItemLoading = _m[0], setIsDataItemLoading = _m[1];
    var resource = group.resources[0];
    var iconName = dataItem.AppointmentStatus;
    var iconDentalName = AppointmentsTypes_1.StatusNames.Tooth;
    var width = (_b = (_a = _ref.current) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.offsetWidth;
    var height = (_d = (_c = _ref.current) === null || _c === void 0 ? void 0 : _c.element) === null || _d === void 0 ? void 0 : _d.offsetHeight;
    var appointmentsAllIDs = react_redux_1.useSelector(EntitiesSelectors_1.selectAppointmentsAllIds);
    var servicesById = react_redux_1.useSelector(EntitiesSelectors_1.selectServicesById());
    var staffById = react_redux_1.useSelector(EntitiesSelectors_1.selectStaffById());
    var customersById = react_redux_1.useSelector(EntitiesSelectors_1.selectCustomersById());
    var onSchedulerItemClick = react_1.useCallback(function () { return !appointmentIsDataItemLoading && setShowPopup(function (prevState) { return !prevState; }); }, [appointmentIsDataItemLoading]);
    var onCloseBtnClick = react_1.useCallback(function () { return setShowPopup(false); }, [setShowPopup]);
    var onEditBtnClick = react_1.useCallback(function () {
        setShowPopup(false);
        if (isRecurring) {
            setShowEditOccurrenceDialog(true);
            // setTitleCancelDragPopup(`Edit Recurring Item`);
            // setMessageCancelDragPopup(`Editing Recurring items is not supported here. please request admin assitance`);
            // setShowCancelDragPopup(true);
            return;
        }
        dispatch(EntitiesAC_1.addItemToEditAC(dataItem.ID, EntitiesTypes_1.EntitiesKeys.Appointments));
        setShowEditForm(true);
    }, [dispatch, dataItem.ID, isRecurring]);
    var onDeleteBtnClick = react_1.useCallback(function () {
        setShowPopup(function (prevState) { return !prevState; });
        // setShowPopup(true);
        if (isRecurring) {
            setShowRemoveOccurrenceDialog(true);
            // setTitleCancelDragPopup(`Delete Recurring Item`);
            // setMessageCancelDragPopup(`Deleting Recurring items is not supported here. please request admin assitance`);
            // setShowCancelDragPopup(true);
            return;
        }
        setShowRemoveDialog(true);
    }, [isRecurring]);
    var onConfirmDeleteDataItem = function () {
        setIsDataItemLoading(true);
        if (isRemoveOccurrence) {
            var exception = new Date(dataItem.Start.getTime());
            var newDataItem = SchedulerHelpers_1.getNewDataItemWithUpdateException(dataItem, exception);
            dispatch(EntitiesAC_1.updateAppointmentDataItemInitAsyncAC(newDataItem, null, servicesById, staffById, customersById, function () { }));
            return;
        }
        dispatch(EntitiesAC_1.deleteAppointmentDataItemInitAsyncAC(dataItem, customersById, function () { }));
    };
    return resource ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(kendo_react_scheduler_1.SchedulerItem, __assign({}, props, { onClick: onSchedulerItemClick, onDoubleClick: onEditBtnClick, onRemoveClick: onDeleteBtnClick }), height && height > 25 && (react_1["default"].createElement(SC.SchedulerItemTopWrapper, { isSmallDisplay: !!(width && width < 120) },
            width && width > 120 && children,
            react_1["default"].createElement("div", { className: "SchedulerItem__icons" },
                react_1["default"].createElement("div", { className: "SchedulerItem__icon" },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: _instruments_1.IconMap[iconDentalName].icon, color: _instruments_1.IconMap[iconDentalName].statusColor })),
                react_1["default"].createElement("div", { className: "SchedulerItem__icon" },
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: _instruments_1.IconMap[iconName].icon, style: _instruments_1.IconMap[iconName].style })))))),
        react_1["default"].createElement(kendo_react_popup_1.Popup, { show: showPopup, anchorAlign: { horizontal: 'right', vertical: 'center' }, popupAlign: { horizontal: 'left', vertical: 'center' }, popupClass: "SchedulerItemContent-popup-content", anchor: (_e = _ref.current) === null || _e === void 0 ? void 0 : _e.element, style: { width: 330 } },
            react_1["default"].createElement(SchedulerItemPopupContent_1.SchedulerItemPopupContent, { resource: resource, dataItem: dataItem, onEditBtnClick: onEditBtnClick, onDeleteBtnClick: onDeleteBtnClick, onCloseBtnClick: onCloseBtnClick })),
        showRemoveDialog && (react_1["default"].createElement(SchedulerConfirmModals_1.RemoveConfirmModal, { isDataItemLoading: isDataItemLoading, onClose: function () { return !isDataItemLoading && setShowRemoveDialog(false); }, onCancel: function () { return setShowRemoveDialog(false); }, onConfirm: onConfirmDeleteDataItem })),
        showRemoveOccurrenceDialog && (react_1["default"].createElement(SchedulerConfirmModals_1.RemoveOccurrenceConfirmModal, { onClose: function () { return setShowRemoveOccurrenceDialog(false); }, onCancel: function () {
                setIsRemoveOccurrence(true);
                setShowRemoveOccurrenceDialog(false);
                setShowRemoveDialog(true);
            }, onConfirm: function () {
                setShowRemoveOccurrenceDialog(false);
                setShowRemoveDialog(true);
            } })),
        showEditOccurrenceDialog && (react_1["default"].createElement(SchedulerConfirmModals_1.EditOccurrenceConfirmModal, { onClose: function () { return setShowEditOccurrenceDialog(false); }, onCancel: function () {
                var _a;
                setShowEditOccurrenceDialog(false);
                dispatch(SchedulerAC_1.changeUpdatedRecurringDataItemAC(SchedulerHelpers_1.getNewDataItemWithUpdateException(dataItem, new Date(dataItem.Start.getTime()))));
                dispatch(SchedulerAC_1.addNewItemToEditFormAC(SchedulerHelpers_1.getInitDataForNewDataItem(dataItem.Start, selectedView, (_a = resource === null || resource === void 0 ? void 0 : resource.ID) !== null && _a !== void 0 ? _a : 1), appointmentsAllIDs));
            }, onConfirm: function () {
                setShowEditOccurrenceDialog(false);
                setShowEditForm(true);
                dispatch(EntitiesAC_1.addItemToEditAC(dataItem.ID, EntitiesTypes_1.EntitiesKeys.Appointments));
            } })),
        showEditForm && react_1["default"].createElement(SchedulerEditItem_1.SchedulerEditItem, { dataItemID: dataItem.ID, onHideForm: function () { return setShowEditForm(false); } }))) : null;
};
