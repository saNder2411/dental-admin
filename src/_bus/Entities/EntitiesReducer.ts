// Types
import { ActionTypes, EntitiesState, Actions, GenericDataItem } from './EntitiesTypes';
// Helpers
import {
  updateStateSliceOnFetchDataSuccess,
  updateStateSliceOnCreateDataItem,
  updateStateSliceOnUpdateDataItem,
  updateStateSliceOnDeleteDataItem,
  updateStateSliceOnAddDataItemToEditInGrid,
  updateStateSliceOnCancelEditInGrid,
  updateStateSliceOnChangeDataItemInGrid,
  updateStateSliceOnAddNewItemToEditInGrid,
} from './EntitiesHelpers';
// Chart Helpers
import { updateChartDataOnFinallyAppointmentsRequest } from './EntitiesChartReducerHelpers';

const initialState = {
  appointments: { originalData: [], processData: [], processById: {}, byId: {}, allIDs: [] },
  customers: { originalData: [], processData: [], processById: {}, byId: {}, allIDs: [] },
  staff: { originalData: [], processData: [], processById: {}, byId: {}, allIDs: [] },
  services: { originalData: [], processData: [], processById: {}, byId: {}, allIDs: [] },
  skills: { originalData: [], processData: [], processById: {}, byId: {}, allIDs: [] },
  chartData: {
    totalSalesForEveryWeekInWeekRange: [],
    serviceSalesForEveryWeekInWeekRange: [],
    productSalesForEveryWeekInWeekRange: [],
    totalAmountAppointmentsForEveryWeekInWeekRange: [],
    totalAmountProductUnitsForEveryWeekInWeekRange: [],
    amountNewCustomerAppointmentsForEveryWeekInWeekRange: [],
    amountCustomerAppointmentsForEveryWeekInWeekRange: [],

    totalAppointmentHours: 0,
    totalStaffWorkHoursInWeekRange: 0,

    staffCategories: [],
    amountAppointmentsPerStaffPerWeekSeries: [],
    percentsEmploymentPerStaffPerWeekSeries: [],

    serviceCategories: [],
    productCategories: [],
    salesPerServicePerMonthSeries: [],
    salesPerProductPerMonthSeries: [],
    salesPerOtherServicePerMonthSeries: { name: 'Other', data: 0 },

    totalAppointmentSales: 0,
    totalAppointmentSalesPerLast12Months: 0,
    activeCustomersIDs: [],
    appointmentReservations: 0,
    appointmentBookings: 0,
    appointmentAttended: 0,
    paymentCompleted: 0,
    canceledAppointment: 0,
    amountAppointmentPerNextWeekRangeAndLastWeek: 0,
    salesPerStaffPerWeekData: [],
    appointmentPerStaffSeries: [],
    averageHourlyPerService: [],
    totalServiceSales: 0,
    totalServiceHours: 0,
    appointmentValue: [],
  },
};

export const reducer = (state: EntitiesState = initialState, action: Actions): EntitiesState => {
  switch (action.type) {
    // Sync Data
    case ActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnFetchDataSuccess(state[action.entityName], action.data),
      };
    // Sync Data Item
    case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnCreateDataItem(state[action.entityName], action.dataItem, action.clientID),
      };

    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnUpdateDataItem(state[action.entityName], action.dataItem),
      };

    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnDeleteDataItem<GenericDataItem>(state[action.entityName], action.deletedDataItemID),
      };
    // Grid
    case ActionTypes.ADD_ITEM_TO_EDIT:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnAddDataItemToEditInGrid<GenericDataItem>(state[action.entityName], action.dataItemID),
      };

    case ActionTypes.CANCEL_EDIT:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnCancelEditInGrid<GenericDataItem>(state[action.entityName], action.dataItemID),
      };

    case ActionTypes.CHANGE_ITEM:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnChangeDataItemInGrid<GenericDataItem>(state[action.entityName], action.changeData),
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnAddNewItemToEditInGrid(state[action.entityName], action.entityName),
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnDeleteDataItem<GenericDataItem>(state[action.entityName], action.dataItemID),
      };
    // Chart
    case ActionTypes.CALC_CHART_DATA:
      return {
        ...state,
        chartData: updateChartDataOnFinallyAppointmentsRequest(state),
      };

    default:
      return state;
  }
};
