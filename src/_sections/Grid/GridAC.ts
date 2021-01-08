// Types
import { ActionTypes, GridDataItem, GridDataName, InitDataForNewDataItem, ViewType, Auth } from './GridTypes';
import { AppointmentDataItem } from '../../Agenda/AgendaTypes';
import { CustomerDataItem } from '../../Customers/CustomersTypes';
import { StaffDataItem } from '../../Staff/StaffTypes';
import { ServiceDataItem } from '../../Services/ServicesTypes';

// Async Fetch Data
export const fetchAppointmentsDataInitAsyncAC = (meta: { servicesDataLength: number; staffDataLength: number; customersDataLength: number }) => ({
  type: ActionTypes.FETCH_APPOINTMENTS_DATA_INIT_ASYNC,
  meta,
});

export const fetchCustomersDataInitAsyncAC = (meta: { staffDataLength: number }) => ({
  type: ActionTypes.FETCH_CUSTOMERS_DATA_INIT_ASYNC,
  meta,
});

export const fetchStaffDataInitAsyncAC = () => ({ type: ActionTypes.FETCH_STAFF_DATA_INIT_ASYNC });

export const fetchServicesDataInitAsyncAC = () => ({ type: ActionTypes.FETCH_SERVICES_DATA_INIT_ASYNC });

// Async Create Data Item
export const createAppointmentDataItemInitAsyncAC = (
  createdDataItem: AppointmentDataItem,
  sideEffectAfterCreatedDataItem: () => void,
  onAddDataItemToSchedulerData?: () => void
) => ({
  type: ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: { sideEffectAfterCreatedDataItem, onAddDataItemToSchedulerData },
});

export const createCustomerDataItemInitAsyncAC = (createdDataItem: CustomerDataItem, sideEffectAfterCreatedDataItem: () => void) => ({
  type: ActionTypes.CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
});

export const createStaffDataItemInitAsyncAC = (createdDataItem: StaffDataItem, sideEffectAfterCreatedDataItem: () => void) => ({
  type: ActionTypes.CREATE_STAFF_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
});

export const createServiceDataItemInitAsyncAC = (createdDataItem: ServiceDataItem, sideEffectAfterCreatedDataItem: () => void) => ({
  type: ActionTypes.CREATE_SERVICE_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
});

// Async Update Data Item
export const updateAppointmentDataItemInitAsyncAC = (updatedDataItem: AppointmentDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateAppointmentRecurringDataItemInitAsyncAC = (
  updatedDataItem: AppointmentDataItem,
  createDataItem: AppointmentDataItem,
  sideEffectAfterUpdatedDataItem: () => void
) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC,
  payload: { updatedDataItem, createDataItem },
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateCustomerDataItemInitAsyncAC = (updatedDataItem: CustomerDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateStaffDataItemInitAsyncAC = (updatedDataItem: StaffDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_STAFF_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateServiceDataItemInitAsyncAC = (updatedDataItem: ServiceDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

// Async Delete Data Item
export const deleteAppointmentDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

export const deleteCustomerDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

export const deleteStaffDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_STAFF_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

export const deleteServiceDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_SERVICE_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

// Sync Data
export const fetchDataRequestAC = () => ({ type: ActionTypes.FETCH_DATA_REQUEST });

export const fetchAppointmentsDataSuccessAC = (data: AppointmentDataItem[]) => ({ type: ActionTypes.FETCH_APPOINTMENTS_DATA_SUCCESS, payload: data });

export const fetchCustomersDataSuccessAC = (data: CustomerDataItem[]) => ({ type: ActionTypes.FETCH_CUSTOMERS_DATA_SUCCESS, payload: data });

export const fetchStaffDataSuccessAC = (data: StaffDataItem[]) => ({ type: ActionTypes.FETCH_STAFF_DATA_SUCCESS, payload: data });

export const fetchServicesDataSuccessAC = (data: ServiceDataItem[]) => ({ type: ActionTypes.FETCH_SERVICES_DATA_SUCCESS, payload: data });

export const fetchDataFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_DATA_FAILURE, payload: errorMessage });

export const fetchDataFinallyAC = () => ({ type: ActionTypes.FETCH_DATA_FINALLY });

// Sync Create Data Item
export const createDataItemRequestAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_REQUEST });

export const createAppointmentDataItemSuccessAC = (data: AppointmentDataItem) => ({
  type: ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createCustomerDataItemSuccessAC = (data: CustomerDataItem) => ({
  type: ActionTypes.CREATE_CUSTOMER_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createStaffDataItemSuccessAC = (data: StaffDataItem) => ({
  type: ActionTypes.CREATE_STAFF_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createServiceDataItemSuccessAC = (data: ServiceDataItem) => ({
  type: ActionTypes.CREATE_SERVICE_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.CREATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const createDataItemFinallyAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_FINALLY });

// Sync Update Data Item
export const updateDataItemRequestAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_REQUEST });

export const updateAppointmentDataItemSuccessAC = (data: AppointmentDataItem) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_SUCCESS,
  payload: data,
});

export const updateCustomerDataItemSuccessAC = (data: CustomerDataItem) => ({ type: ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_SUCCESS, payload: data });

export const updateStaffDataItemSuccessAC = (data: StaffDataItem) => ({ type: ActionTypes.UPDATE_STAFF_DATA_ITEM_SUCCESS, payload: data });

export const updateServiceDataItemSuccessAC = (data: ServiceDataItem) => ({ type: ActionTypes.UPDATE_SERVICE_DATA_ITEM_SUCCESS, payload: data });

export const updateDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.UPDATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const updateDataItemFinallyAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_FINALLY });

// Sync Delete Data Item
export const deleteDataItemRequestAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_REQUEST });

export const deleteAppointmentDataItemSuccessAC = (deletedDataItemID: number) => ({
  type: ActionTypes.DELETE_APPOINTMENT_DATA_ITEM_SUCCESS,
  payload: deletedDataItemID,
});

export const deleteCustomerDataItemSuccessAC = (deletedDataItemID: number) => ({
  type: ActionTypes.DELETE_CUSTOMER_DATA_ITEM_SUCCESS,
  payload: deletedDataItemID,
});

export const deleteStaffDataItemSuccessAC = (deletedDataItemID: number) => ({
  type: ActionTypes.DELETE_STAFF_DATA_ITEM_SUCCESS,
  payload: deletedDataItemID,
});

export const deleteServiceDataItemSuccessAC = (deletedDataItemID: number) => ({
  type: ActionTypes.DELETE_SERVICE_DATA_ITEM_SUCCESS,
  payload: deletedDataItemID,
});

export const deleteDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.DELETE_DATA_ITEM_FAILURE, payload: errorMessage });

export const deleteDataItemFinallyAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_FINALLY });

// View
export const changeViewOriginalDataAC = (data: GridDataItem[]) => ({ type: ActionTypes.CHANGE_VIEW_ORIGINAL_DATA, payload: data });

export const changeDataNameAC = (dataName: GridDataName) => ({ type: ActionTypes.CHANGE_DATA_NAME, payload: dataName });

// Edit
export const addItemToEditAC = (dataItemID: number) => ({ type: ActionTypes.ADD_ITEM_TO_EDIT, payload: dataItemID });

export const cancelEditAC = (editItemID: number) => ({ type: ActionTypes.CANCEL_EDIT, payload: editItemID });

export const changeItemAC = (changeData: { dataItemID: number; field: string; value: any }) => ({
  type: ActionTypes.CHANGE_ITEM,
  payload: changeData,
});

export const addNewItemToEditAC = () => ({ type: ActionTypes.ADD_NEW_ITEM_TO_EDIT });

export const discardAddNewItemToDataAC = (dataItemID: number) => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA, payload: dataItemID });

// Scheduler

export const changeMapTeamToFilteredAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED, payload: employeeID });

export const setFormItemIdAC = (formItemID: number | null) => ({ type: ActionTypes.SET_FORM_ITEM_ID, payload: formItemID });

export const schAddNewItemToEditAC = (initDataForNewDataItem: InitDataForNewDataItem) => ({
  type: ActionTypes.SCHEDULER_ADD_NEW_ITEM_TO_EDIT_FORM,
  payload: initDataForNewDataItem,
});

export const schDiscardAddNewItemToDataAC = (dataItemID: number) => ({
  type: ActionTypes.SCHEDULER_DISCARD_ADD_NEW_ITEM_TO_DATA,
  payload: dataItemID,
});

export const changeSelectedDateAC = (date: Date) => ({ type: ActionTypes.CHANGE_SELECTED_DATE, payload: date });

export const changeSelectedViewAC = (view: ViewType) => ({ type: ActionTypes.CHANGE_SELECTED_VIEW, payload: view });

export const changeUpdatedRecurringDataItemAC = (dataItem: AppointmentDataItem | null) => ({
  type: ActionTypes.SCHEDULER_CHANGE_UPDATED_RECURRING_DATA_ITEM,
  payload: dataItem,
});

// Auth Async
export const fetchAuthDataInitAsyncAC = () => ({ type: ActionTypes.FETCH_AUTH_DATA_INIT_ASYNC });

// // Auth Sync
export const fetchAuthDataRequestAC = () => ({ type: ActionTypes.FETCH_AUTH_DATA_REQUEST });

export const fetchAuthDataSuccessAC = (data: Auth) => ({ type: ActionTypes.FETCH_AUTH_DATA_SUCCESS, payload: data });

export const fetchAuthDataFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_AUTH_DATA_FAILURE, payload: errorMessage });

export const fetchAuthDataFinallyAC = () => ({ type: ActionTypes.FETCH_AUTH_DATA_FINALLY });
