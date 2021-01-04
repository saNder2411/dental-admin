import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes, GridDataItem, GridDataName } from './GridTypes';
import { AppointmentDataItem } from '../../Agenda/AgendaTypes';
import { CustomerDataItem } from '../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../TeamStaff/TeamStaffTypes';
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
  onAddDataItemToGridData: () => void,
  onAddDataItemToSchedulerData?: () => void
) => ({
  type: ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: { onAddDataItemToGridData, onAddDataItemToSchedulerData },
});

export const createCustomerDataItemInitAsyncAC = (createdDataItem: CustomerDataItem, onAddDataItemToGridData: () => void) => ({
  type: ActionTypes.CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: onAddDataItemToGridData,
});

export const createStaffDataItemInitAsyncAC = (createdDataItem: TeamStaffDataItem, onAddDataItemToGridData: () => void) => ({
  type: ActionTypes.CREATE_STAFF_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: onAddDataItemToGridData,
});

export const createServiceDataItemInitAsyncAC = (createdDataItem: ServiceDataItem, onAddDataItemToGridData: () => void) => ({
  type: ActionTypes.CREATE_SERVICE_DATA_ITEM_INIT_ASYNC,
  payload: createdDataItem,
  meta: onAddDataItemToGridData,
});

// Async Update Data Item
export const updateAppointmentDataItemInitAsyncAC = (updatedDataItem: AppointmentDataItem, onUpdateDataItemInGridData: () => void) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
});

export const updateAppointmentRecurringDataItemInitAsyncAC = (
  updatedDataItem: AppointmentDataItem,
  createDataItem: AppointmentDataItem,
  onUpdateDataItem: () => void
) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC,
  payload: { updatedDataItem, createDataItem },
  meta: onUpdateDataItem,
});

export const updateCustomerDataItemInitAsyncAC = (updatedDataItem: CustomerDataItem, onUpdateDataItemInGridData: () => void) => ({
  type: ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
});

export const updateStaffDataItemInitAsyncAC = (updatedDataItem: TeamStaffDataItem, onUpdateDataItemInGridData: () => void) => ({
  type: ActionTypes.UPDATE_STAFF_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
});

export const updateServiceDataItemInitAsyncAC = (updatedDataItem: ServiceDataItem, onUpdateDataItemInGridData: () => void) => ({
  type: ActionTypes.UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC,
  payload: updatedDataItem,
  meta: onUpdateDataItemInGridData,
});

// Async Delete Data Item
export const deleteAppointmentDataItemInitAsyncAC = (deletedDataItemID: number, onDeleteDataItemInGridData: () => void) => ({
  type: ActionTypes.DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
});

export const deleteCustomerDataItemInitAsyncAC = (deletedDataItemID: number, onDeleteDataItemInGridData: () => void) => ({
  type: ActionTypes.DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
});

export const deleteStaffDataItemInitAsyncAC = (deletedDataItemID: number, onDeleteDataItemInGridData: () => void) => ({
  type: ActionTypes.DELETE_STAFF_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
});

export const deleteServiceDataItemInitAsyncAC = (deletedDataItemID: number, onDeleteDataItemInGridData: () => void) => ({
  type: ActionTypes.DELETE_SERVICE_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
});

// Sync Data
export const fetchDataRequestAC = () => ({ type: ActionTypes.FETCH_DATA_REQUEST });

export const fetchAppointmentsDataSuccessAC = (data: AppointmentDataItem[]) => ({ type: ActionTypes.FETCH_APPOINTMENTS_DATA_SUCCESS, payload: data });

export const fetchCustomersDataSuccessAC = (data: CustomerDataItem[]) => ({ type: ActionTypes.FETCH_CUSTOMERS_DATA_SUCCESS, payload: data });

export const fetchStaffDataSuccessAC = (data: TeamStaffDataItem[]) => ({ type: ActionTypes.FETCH_STAFF_DATA_SUCCESS, payload: data });

export const fetchServicesDataSuccessAC = (data: ServiceDataItem[]) => ({ type: ActionTypes.FETCH_SERVICES_DATA_SUCCESS, payload: data });

export const fetchDataFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_DATA_FAILURE, payload: errorMessage });

export const fetchDataFinallyAC = () => ({ type: ActionTypes.FETCH_DATA_FINALLY });

// Sync Create DataItem
export const createDataItemRequestAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_REQUEST });

export const createAppointmentDataItemSuccessAC = (data: AppointmentDataItem) => ({
  type: ActionTypes.CREATE_APPOINTMENT_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createCustomerDataItemSuccessAC = (data: CustomerDataItem) => ({
  type: ActionTypes.CREATE_CUSTOMER_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createStaffDataItemSuccessAC = (data: TeamStaffDataItem) => ({
  type: ActionTypes.CREATE_STAFF_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createServiceDataItemSuccessAC = (data: ServiceDataItem) => ({
  type: ActionTypes.CREATE_SERVICE_DATA_ITEM_SUCCESS,
  payload: data,
});

export const createDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.CREATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const createDataItemFinallyAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_FINALLY });

// Sync Update DataItem
export const updateDataItemRequestAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_REQUEST });

export const updateAppointmentDataItemSuccessAC = (data: AppointmentDataItem) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_SUCCESS,
  payload: data,
});

export const updateCustomerDataItemSuccessAC = (data: CustomerDataItem) => ({ type: ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_SUCCESS, payload: data });

export const updateStaffDataItemSuccessAC = (data: TeamStaffDataItem) => ({ type: ActionTypes.UPDATE_STAFF_DATA_ITEM_SUCCESS, payload: data });

export const updateServiceDataItemSuccessAC = (data: ServiceDataItem) => ({ type: ActionTypes.UPDATE_SERVICE_DATA_ITEM_SUCCESS, payload: data });

export const updateDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.UPDATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const updateDataItemFinallyAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_FINALLY });

// Sync Delete DataItem
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

export const updateItemAfterEditAC = (dataItem: GridDataItem) => ({ type: ActionTypes.UPDATE_ITEM_AFTER_EDIT, payload: dataItem });

export const removeItemFromDataAC = (removeItemID: number) => ({ type: ActionTypes.REMOVE_ITEM_FROM_DATA, payload: removeItemID });

export const cancelEditAC = (editItemID: number) => ({ type: ActionTypes.CANCEL_EDIT, payload: editItemID });

export const changeItemAC = (gridEvent: GridItemChangeEvent) => ({ type: ActionTypes.CHANGE_ITEM, payload: gridEvent });

export const addNewItemToEditAC = () => ({ type: ActionTypes.ADD_NEW_ITEM_TO_EDIT });

export const addNewItemToDataAC = (dataItem: GridDataItem) => ({ type: ActionTypes.ADD_NEW_ITEM_TO_DATA, payload: dataItem });

export const discardAddNewItemToDataAC = (dataItemID: number) => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA, payload: dataItemID });
