// Types
import { AppointmentDataItem } from '../../Agenda';
import { StaffDataItem } from '../../TeamStaff';
import { CustomerDataItem } from '../../Customers';
import { ServiceDataItem } from '../../Services';
// Actions
import * as actions from './GridAC';

export const ActionTypes = {
  // Async Fetch Data
  FETCH_APPOINTMENTS_DATA_INIT_ASYNC: 'GRID/FETCH_APPOINTMENTS_DATA_INIT_ASYNC' as const,
  FETCH_CUSTOMERS_DATA_INIT_ASYNC: 'GRID/FETCH_CUSTOMERS_DATA_INIT_ASYNC' as const,
  FETCH_STAFF_DATA_INIT_ASYNC: 'GRID/FETCH_STAFF_DATA_INIT_ASYNC' as const,
  FETCH_SERVICES_DATA_INIT_ASYNC: 'GRID/FETCH_SERVICES_DATA_INIT_ASYNC' as const,
  // Async Create Data Item
  CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC: 'GRID/CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC: 'GRID/CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_STAFF_DATA_ITEM_INIT_ASYNC: 'GRID/CREATE_STAFF_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_SERVICE_DATA_ITEM_INIT_ASYNC: 'GRID/CREATE_SERVICE_DATA_ITEM_INIT_ASYNC' as const,
  // Async Update Data Item
  UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC: 'GRID/UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC: 'GRID/UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC' as const,
  UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC: 'GRID/UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_STAFF_DATA_ITEM_INIT_ASYNC: 'GRID/UPDATE_STAFF_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC: 'GRID/UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC' as const,
  // Async Delete Data Item
  DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC: 'GRID/DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC: 'GRID/DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_STAFF_DATA_ITEM_INIT_ASYNC: 'GRID/DELETE_STAFF_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_SERVICE_DATA_ITEM_INIT_ASYNC: 'GRID/DELETE_SERVICE_DATA_ITEM_INIT_ASYNC' as const,
  // Sync Data
  FETCH_DATA_REQUEST: `GRID/FETCH_DATA_REQUEST` as const,
  FETCH_APPOINTMENTS_DATA_SUCCESS: `GRID/FETCH_APPOINTMENTS_DATA_SUCCESS` as const,
  FETCH_CUSTOMERS_DATA_SUCCESS: `GRID/FETCH_CUSTOMERS_DATA_SUCCESS` as const,
  FETCH_STAFF_DATA_SUCCESS: `GRID/FETCH_STAFF_DATA_SUCCESS` as const,
  FETCH_SERVICES_DATA_SUCCESS: `GRID/FETCH_SERVICES_DATA_SUCCESS` as const,
  FETCH_DATA_FAILURE: `GRID/FETCH_DATA_FAILURE` as const,
  FETCH_DATA_FINALLY: `GRID/FETCH_DATA_FINALLY` as const,
  // Sync Create DataItem
  CREATE_DATA_ITEM_REQUEST: `GRID/CREATE_DATA_ITEM_REQUEST` as const,
  CREATE_APPOINTMENT_DATA_ITEM_SUCCESS: `GRID/CREATE_APPOINTMENT_DATA_ITEM_SUCCESS` as const,
  CREATE_CUSTOMER_DATA_ITEM_SUCCESS: `GRID/CREATE_CUSTOMER_DATA_ITEM_SUCCESS` as const,
  CREATE_STAFF_DATA_ITEM_SUCCESS: `GRID/CREATE_STAFF_DATA_ITEM_SUCCESS` as const,
  CREATE_SERVICE_DATA_ITEM_SUCCESS: `GRID/CREATE_SERVICE_DATA_ITEM_SUCCESS` as const,
  CREATE_DATA_ITEM_FAILURE: `GRID/CREATE_DATA_ITEM_FAILURE` as const,
  CREATE_DATA_ITEM_FINALLY: `GRID/CREATE_DATA_ITEM_FINALLY` as const,
  // Sync Update DataItem
  UPDATE_DATA_ITEM_REQUEST: `GRID/UPDATE_DATA_ITEM_REQUEST` as const,
  UPDATE_APPOINTMENT_DATA_ITEM_SUCCESS: `GRID/UPDATE_APPOINTMENT_DATA_ITEM_SUCCESS` as const,
  UPDATE_CUSTOMER_DATA_ITEM_SUCCESS: `GRID/UPDATE_CUSTOMER_DATA_ITEM_SUCCESS` as const,
  UPDATE_STAFF_DATA_ITEM_SUCCESS: `GRID/UPDATE_STAFF_DATA_ITEM_SUCCESS` as const,
  UPDATE_SERVICE_DATA_ITEM_SUCCESS: `GRID/UPDATE_SERVICE_DATA_ITEM_SUCCESS` as const,
  UPDATE_DATA_ITEM_FAILURE: `GRID/UPDATE_DATA_ITEM_FAILURE` as const,
  UPDATE_DATA_ITEM_FINALLY: `GRID/UPDATE_DATA_ITEM_FINALLY` as const,
  // Sync Delete DataItem
  DELETE_DATA_ITEM_REQUEST: `GRID/DELETE_DATA_ITEM_REQUEST` as const,
  DELETE_APPOINTMENT_DATA_ITEM_SUCCESS: `GRID/DELETE_APPOINTMENT_DATA_ITEM_SUCCESS` as const,
  DELETE_CUSTOMER_DATA_ITEM_SUCCESS: `GRID/DELETE_CUSTOMER_DATA_ITEM_SUCCESS` as const,
  DELETE_STAFF_DATA_ITEM_SUCCESS: `GRID/DELETE_STAFF_DATA_ITEM_SUCCESS` as const,
  DELETE_SERVICE_DATA_ITEM_SUCCESS: `GRID/DELETE_SERVICE_DATA_ITEM_SUCCESS` as const,
  DELETE_DATA_ITEM_FAILURE: `GRID/DELETE_DATA_ITEM_FAILURE` as const,
  DELETE_DATA_ITEM_FINALLY: `GRID/DELETE_DATA_ITEM_FINALLY` as const,
  // View
  CHANGE_VIEW_ORIGINAL_DATA: 'GRID/CHANGE_VIEW_ORIGINAL_DATA' as const,
  CHANGE_DATA_NAME: 'GRID/CHANGE_DATA_NAME' as const,
  // Edit
  ADD_ITEM_TO_EDIT: 'GRID/ADD_ITEM_TO_EDIT' as const,
  CANCEL_EDIT: 'GRID/CANCEL_EDIT' as const,
  CHANGE_ITEM: 'GRID/CHANGE_ITEM' as const,
  ADD_NEW_ITEM_TO_EDIT: 'GRID/ADD_NEW_ITEM_TO_EDIT' as const,
  DISCARD_ADD_NEW_ITEM_TO_DATA: 'GRID/DISCARD_ADD_NEW_ITEM_TO_DATA' as const,
  // Validation Staff
  VALIDATE_FULL_NAME_FIELD: 'STAFF/VALIDATE_FULL_NAME_FIELD' as const,
  VALIDATE_JOB_TITLE_FIELD: 'STAFF/VALIDATE_JOB_TITLE_FIELD' as const,
  VALIDATE_MOBILE_PHONE_FIELD: 'STAFF/VALIDATE_MOBILE_PHONE_FIELD' as const,
  // Validation Customers
  VALIDATE_CUSTOMER_MOBILE_PHONE_FIELD: 'CUSTOMERS/VALIDATE_MOBILE_PHONE_FIELD' as const,
  // Validation Appointments
  VALIDATE_START_DATE_EVENT: 'APPOINTMENTS/VALIDATE_START_DATE_EVENT' as const,
  VALIDATE_END_DATE_EVENT: 'APPOINTMENTS/VALIDATE_END_DATE_EVENT' as const,
  VALIDATE_FULL_NAME_VALUE: 'APPOINTMENTS/VALIDATE_FULL_NAME_VALUE' as const,
};

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type GridDataItem = InferValueTypes<{ type1: AppointmentDataItem; type2: StaffDataItem; type3: CustomerDataItem; type4: ServiceDataItem }>;

export enum GridDataName {
  Default = 'Empty',
  Appointments = 'Appointments',
  Staff = 'Staff',
  Customers = 'Customers',
  Services = 'Services',
}

export enum StatusNames {
  Consultation = '(1) Consultation',
  Pending = '(2) Pending',
  Reserved = '(3) Reserved',
  Booked = '(4) Booked',
  Paid = '(5) Paid',
  Checking = '(6) Checking',
  Cancelled = '(7) Cancelled',
  Closed = '(8) Closed',
  Unavailable = '(9) Unavailable',
  Other = '(10) Other',
  Tooth = '(11) Tooth',
}

export interface GridState {
  viewOriginalData: GridDataItem[];
  byId: { [key: string]: GridDataItem };
  processById: { [key: string]: GridDataItem };
  allIDs: number[];
  dataName: GridDataName;
  isDataLoading: boolean;
  isDataItemLoading: boolean;
  dataError: string;
  dataItemError: string;
  labelForAddNewItemBtn: string;
  statusNameList: StatusNames[];
  roleSkills: string[];
  entities: {
    appointments: { originalData: AppointmentDataItem[]; byId: { [key: string]: AppointmentDataItem }; allIDs: number[] };
    customers: { originalData: CustomerDataItem[]; byId: { [key: string]: CustomerDataItem }; allIDs: number[] };
    staff: { originalData: StaffDataItem[]; byId: { [key: string]: StaffDataItem }; allIDs: number[] };
    services: { originalData: ServiceDataItem[]; byId: { [key: string]: ServiceDataItem }; allIDs: number[] };
  };
}

export type FetchAppointmentsDataInitAsyncActionType = ReturnType<typeof actions.fetchAppointmentsDataInitAsyncAC>;

export type FetchCustomersDataInitAsyncActionType = ReturnType<typeof actions.fetchCustomersDataInitAsyncAC>;

export type CreateAppointmentDataItemInitAsyncActionType = ReturnType<typeof actions.createAppointmentDataItemInitAsyncAC>;

export type CreateCustomerDataItemInitAsyncActionType = ReturnType<typeof actions.createCustomerDataItemInitAsyncAC>;

export type CreateStaffDataItemInitAsyncActionType = ReturnType<typeof actions.createStaffDataItemInitAsyncAC>;

export type CreateServiceDataItemInitAsyncActionType = ReturnType<typeof actions.createServiceDataItemInitAsyncAC>;

export type UpdateAppointmentDataItemInitAsyncActionType = ReturnType<typeof actions.updateAppointmentDataItemInitAsyncAC>;

export type UpdateAppointmentRecurringDataItemInitAsyncActionType = ReturnType<typeof actions.updateAppointmentRecurringDataItemInitAsyncAC>;

export type UpdatCustomerDataItemInitAsyncActionType = ReturnType<typeof actions.updateCustomerDataItemInitAsyncAC>;

export type UpdateStaffDataItemInitAsyncActionType = ReturnType<typeof actions.updateStaffDataItemInitAsyncAC>;

export type UpdateServiceDataItemInitAsyncActionType = ReturnType<typeof actions.updateServiceDataItemInitAsyncAC>;

export type DeleteAppointmentDataItemInitAsyncActionType = ReturnType<typeof actions.deleteAppointmentDataItemInitAsyncAC>;

export type DeleteCustomerDataItemInitAsyncActionType = ReturnType<typeof actions.deleteCustomerDataItemInitAsyncAC>;

export type DeleteStaffDataItemInitAsyncActionType = ReturnType<typeof actions.deleteStaffDataItemInitAsyncAC>;

export type DeleteServiceDataItemInitAsyncActionType = ReturnType<typeof actions.deleteServiceDataItemInitAsyncAC>;
