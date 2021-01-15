// Types
import { ActionTypes, GenericDataItem, EntitiesKeys } from './EntitiesTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { CustomerDataItem } from '../_Customers/CustomersTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { ServiceDataItem } from '../_Services/ServicesTypes';

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
  createdDataItem,
  meta: { sideEffectAfterCreatedDataItem, onAddDataItemToSchedulerData },
});

export const createCustomerDataItemInitAsyncAC = (createdDataItem: CustomerDataItem, sideEffectAfterCreatedDataItem: () => void) => ({
  type: ActionTypes.CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
});

export const createStaffDataItemInitAsyncAC = (createdDataItem: StaffDataItem, sideEffectAfterCreatedDataItem: () => void) => ({
  type: ActionTypes.CREATE_STAFF_DATA_ITEM_INIT_ASYNC,
  createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
});

export const createServiceDataItemInitAsyncAC = (createdDataItem: ServiceDataItem, sideEffectAfterCreatedDataItem: () => void) => ({
  type: ActionTypes.CREATE_SERVICE_DATA_ITEM_INIT_ASYNC,
  createdDataItem,
  meta: sideEffectAfterCreatedDataItem,
});

// Async Update Data Item
export const updateAppointmentDataItemInitAsyncAC = (updatedDataItem: AppointmentDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateAppointmentRecurringDataItemInitAsyncAC = (
  updatedDataItem: AppointmentDataItem,
  createDataItem: AppointmentDataItem,
  sideEffectAfterUpdatedDataItem: () => void
) => ({
  type: ActionTypes.UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC,
  updatedDataItem,
  createDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateCustomerDataItemInitAsyncAC = (updatedDataItem: CustomerDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateStaffDataItemInitAsyncAC = (updatedDataItem: StaffDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_STAFF_DATA_ITEM_INIT_ASYNC,
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

export const updateServiceDataItemInitAsyncAC = (updatedDataItem: ServiceDataItem, sideEffectAfterUpdatedDataItem: () => void) => ({
  type: ActionTypes.UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC,
  updatedDataItem,
  meta: sideEffectAfterUpdatedDataItem,
});

// Async Delete Data Item
export const deleteAppointmentDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC,
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

export const deleteCustomerDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC,
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

export const deleteStaffDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_STAFF_DATA_ITEM_INIT_ASYNC,
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

export const deleteServiceDataItemInitAsyncAC = (deletedDataItemID: number, sideEffectAfterDeletedDataItem: () => void) => ({
  type: ActionTypes.DELETE_SERVICE_DATA_ITEM_INIT_ASYNC,
  deletedDataItemID,
  meta: sideEffectAfterDeletedDataItem,
});

// Sync Data
export const fetchDataRequestAC = (entityName: EntitiesKeys) => ({ type: ActionTypes.FETCH_DATA_REQUEST, entityName });

export const fetchDataSuccessAC = (data: GenericDataItem[], entityName: EntitiesKeys) => ({
  type: ActionTypes.FETCH_DATA_SUCCESS,
  data,
  entityName,
});

export const fetchDataFailureAC = (errorMessage: string, entityName: EntitiesKeys) => ({
  type: ActionTypes.FETCH_DATA_FAILURE,
  errorMessage,
  entityName,
});

export const fetchDataFinallyAC = () => ({ type: ActionTypes.FETCH_DATA_FINALLY });

// Sync Create Data Item
export const createDataItemRequestAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_REQUEST });

export const createDataItemSuccessAC = (dataItem: GenericDataItem, entityName: EntitiesKeys, clientID?: number) => ({
  type: ActionTypes.CREATE_DATA_ITEM_SUCCESS,
  dataItem,
  entityName,
  clientID
});

export const createDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.CREATE_DATA_ITEM_FAILURE, errorMessage });

export const createDataItemFinallyAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_FINALLY });

// Sync Update Data Item
export const updateDataItemRequestAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_REQUEST });

export const updateDataItemSuccessAC = (dataItem: GenericDataItem, entityName: EntitiesKeys) => ({
  type: ActionTypes.UPDATE_DATA_ITEM_SUCCESS,
  dataItem,
  entityName,
});

export const updateDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.UPDATE_DATA_ITEM_FAILURE, errorMessage });

export const updateDataItemFinallyAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_FINALLY });

// Sync Delete Data Item
export const deleteDataItemRequestAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_REQUEST });

export const deleteDataItemSuccessAC = (deletedDataItemID: number, entityName: EntitiesKeys) => ({
  type: ActionTypes.DELETE_DATA_ITEM_SUCCESS,
  deletedDataItemID,
  entityName,
});

export const deleteDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.DELETE_DATA_ITEM_FAILURE, errorMessage });

export const deleteDataItemFinallyAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_FINALLY });

// Edit
export const addItemToEditAC = (dataItemID: number, entityName: EntitiesKeys) => ({
  type: ActionTypes.ADD_ITEM_TO_EDIT,
  dataItemID,
  entityName,
});

export const cancelEditAC = (dataItemID: number, entityName: EntitiesKeys) => ({ type: ActionTypes.CANCEL_EDIT, dataItemID, entityName });

export const changeItemAC = (changeData: { dataItemID: number; field: string; value: any }, entityName: EntitiesKeys) => ({
  type: ActionTypes.CHANGE_ITEM,
  entityName,
  changeData,
});

export const addNewItemToEditAC = (entityName: EntitiesKeys) => ({ type: ActionTypes.ADD_NEW_ITEM_TO_EDIT, entityName });

export const discardAddNewItemToDataAC = (dataItemID: number, entityName: EntitiesKeys) => ({
  type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA,
  dataItemID,
  entityName,
});