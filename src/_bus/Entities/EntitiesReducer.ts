// Types
import { ActionTypes, EntitiesState, Actions, GenericDataItem, EntitiesKeys } from './EntitiesTypes';
import { AppointmentDataItem } from './../_Appointments/AppointmentsTypes';
// Helpers
import {
  updateStateSliceOnFetchDataSuccess,
  updateStateSliceOnCreateDataItem,
  updateStateSliceOnCreateAppointmentDataItem,
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
  appointments: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  customers: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  staff: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  services: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  skills: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  chartData: {
    totalAppointmentHours: 0,
    totalAppointmentSales: 0,
    totalAppointmentSalesPerLast12Months: 0,
    activeCustomersIDs: [],
    appointmentReservations: 0,
    appointmentBookings: 0,
    appointmentAttended: 0,
    paymentCompleted: 0,
    canceledAppointment: 0,
    amountAppointmentPerNextWeekRangeAndLastWeek: 0,
    totalStaffWorkHoursInWeekRange: 0,
    totalSalesForEveryWeekInWeekRange: [],
    serviceSalesForEveryWeekInWeekRange: [],
    productSalesForEveryWeekInWeekRange: [],
    totalAmountAppointmentsForEveryWeekPerWeekRange: [],
    amountNewCustomerAppointmentsForEveryWeekPerWeekRange: [],
    amountExistCustomerAppointmentsForEveryWeekPerWeekRange: [],
    staffCategories: [],
    appointmentPerStaffPerWeekSeries: [],
    percentsEmploymentPerWeekSeries: [],
    salesPerStaffPerWeekData: [],
    appointmentPerStaffSeries: [],
    averageHourlyPerService: [],
    totalServiceSales: 0,
    totalServiceHours: 0,
    serviceCategories: [],
    productCategories: [],
    salesPerServicePerWeekSeries: [],
    salesPerProductPerWeekSeries: [],
    salesPerOtherServicePerWeekSeries: { name: 'Other', data: 0 },
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
        [action.entityName]:
          action.entityName === EntitiesKeys.Appointments
            ? updateStateSliceOnCreateAppointmentDataItem(state.appointments, action.dataItem as AppointmentDataItem, action.clientID ?? -1)
            : updateStateSliceOnCreateDataItem(state[action.entityName], action.dataItem),
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
        [action.entityName]: updateStateSliceOnAddNewItemToEditInGrid<GenericDataItem>(state[action.entityName], action.entityName),
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
