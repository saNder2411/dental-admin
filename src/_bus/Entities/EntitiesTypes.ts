// Types
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { CustomerDataItem } from '../_Customers/CustomersTypes';
import { ServiceDataItem } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
// Actions
import * as actions from './EntitiesAC';

export const ActionTypes = {
  // Async Fetch Data
  FETCH_APPOINTMENTS_DATA_INIT_ASYNC: 'ENTITIES/FETCH_APPOINTMENTS_DATA_INIT_ASYNC' as const,
  FETCH_CUSTOMERS_DATA_INIT_ASYNC: 'ENTITIES/FETCH_CUSTOMERS_DATA_INIT_ASYNC' as const,
  FETCH_STAFF_DATA_INIT_ASYNC: 'ENTITIES/FETCH_STAFF_DATA_INIT_ASYNC' as const,
  FETCH_SERVICES_DATA_INIT_ASYNC: 'ENTITIES/FETCH_SERVICES_DATA_INIT_ASYNC' as const,
  // Async Create Data Item
  CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC: 'ENTITIES/CREATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC: 'ENTITIES/CREATE_CUSTOMER_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_STAFF_DATA_ITEM_INIT_ASYNC: 'ENTITIES/CREATE_STAFF_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_SERVICE_DATA_ITEM_INIT_ASYNC: 'ENTITIES/CREATE_SERVICE_DATA_ITEM_INIT_ASYNC' as const,
  // Async Update Data Item
  UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC: 'ENTITIES/UPDATE_APPOINTMENT_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC: 'ENTITIES/UPDATE_APPOINTMENT_RECURRING_DATA_ITEM_ASYNC' as const,
  UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC: 'ENTITIES/UPDATE_CUSTOMER_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_STAFF_DATA_ITEM_INIT_ASYNC: 'ENTITIES/UPDATE_STAFF_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC: 'ENTITIES/UPDATE_SERVICE_DATA_ITEM_INIT_ASYNC' as const,
  // Async Delete Data Item
  DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC: 'ENTITIES/DELETE_APPOINTMENT_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC: 'ENTITIES/DELETE_CUSTOMER_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_STAFF_DATA_ITEM_INIT_ASYNC: 'ENTITIES/DELETE_STAFF_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_SERVICE_DATA_ITEM_INIT_ASYNC: 'ENTITIES/DELETE_SERVICE_DATA_ITEM_INIT_ASYNC' as const,
  // Sync Data
  FETCH_DATA_REQUEST: `ENTITIES/FETCH_DATA_REQUEST` as const,
  FETCH_DATA_SUCCESS: `ENTITIES/FETCH_DATA_SUCCESS` as const,
  FETCH_DATA_FAILURE: `ENTITIES/FETCH_DATA_FAILURE` as const,
  FETCH_DATA_FINALLY: `ENTITIES/FETCH_DATA_FINALLY` as const,
  // Sync Create DataItem
  CREATE_DATA_ITEM_REQUEST: `ENTITIES/CREATE_DATA_ITEM_REQUEST` as const,
  CREATE_DATA_ITEM_SUCCESS: `ENTITIES/CREATE_DATA_ITEM_SUCCESS` as const,
  CREATE_DATA_ITEM_FAILURE: `ENTITIES/CREATE_DATA_ITEM_FAILURE` as const,
  CREATE_DATA_ITEM_FINALLY: `ENTITIES/CREATE_DATA_ITEM_FINALLY` as const,
  // Sync Update DataItem
  UPDATE_DATA_ITEM_REQUEST: `ENTITIES/UPDATE_DATA_ITEM_REQUEST` as const,
  UPDATE_DATA_ITEM_SUCCESS: `ENTITIES/UPDATE_DATA_ITEM_SUCCESS` as const,
  UPDATE_DATA_ITEM_FAILURE: `ENTITIES/UPDATE_DATA_ITEM_FAILURE` as const,
  UPDATE_DATA_ITEM_FINALLY: `ENTITIES/UPDATE_DATA_ITEM_FINALLY` as const,
  // Sync Delete DataItem
  DELETE_DATA_ITEM_REQUEST: `ENTITIES/DELETE_DATA_ITEM_REQUEST` as const,
  DELETE_DATA_ITEM_SUCCESS: `ENTITIES/DELETE_DATA_ITEM_SUCCESS` as const,
  DELETE_DATA_ITEM_FAILURE: `ENTITIES/DELETE_DATA_ITEM_FAILURE` as const,
  DELETE_DATA_ITEM_FINALLY: `ENTITIES/DELETE_DATA_ITEM_FINALLY` as const,
  // Edit
  ADD_ITEM_TO_EDIT: 'ENTITIES/ADD_ITEM_TO_EDIT' as const,
  CANCEL_EDIT: 'ENTITIES/CANCEL_EDIT' as const,
  CHANGE_ITEM: 'ENTITIES/CHANGE_ITEM' as const,
  ADD_NEW_ITEM_TO_EDIT: 'ENTITIES/ADD_NEW_ITEM_TO_EDIT' as const,
  DISCARD_ADD_NEW_ITEM_TO_DATA: 'ENTITIES/DISCARD_ADD_NEW_ITEM_TO_DATA' as const,
};

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type GenericDataItem = InferValueTypes<{ type1: AppointmentDataItem; type2: StaffDataItem; type3: CustomerDataItem; type4: ServiceDataItem }>;

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

export enum EntitiesKeys {
  Appointments = 'appointments',
  Staff = 'staff',
  Customers = 'customers',
  Services = 'services',
}

export interface EntitiesStateSlice<T extends GenericDataItem = GenericDataItem> {
  originalData: T[];
  processById: { [key: string]: T };
  byId: { [key: string]: T };
  allIDs: number[];
}
export interface ChartState {
  totalAppointmentHours: number;
  totalAppointmentSales: number;
  activeCustomersIDs: number[];
  appointmentReservations: number;
  appointmentBookings: number;
  appointmentAttended: number;
  paymentCompleted: number;
  totalStaffWorkHoursInWeekRange: number;
  totalSalesForEveryWeekInWeekRange: number[];
  serviceSalesForEveryWeekInWeekRange: number[];
  productSalesForEveryWeekInWeekRange: number[];
  appointmentPerStaffCategories: string[];
  appointmentPerStaffSeries: SeriesForChart<number[]>[];
  averageHourlyPerService: SeriesForChart<number>[];
  totalServiceSales: number;
  totalServiceHours: number;
}

export interface EntitiesState {
  [EntitiesKeys.Appointments]: EntitiesStateSlice<AppointmentDataItem>;
  [EntitiesKeys.Customers]: EntitiesStateSlice<CustomerDataItem>;
  [EntitiesKeys.Staff]: EntitiesStateSlice<StaffDataItem>;
  [EntitiesKeys.Services]: EntitiesStateSlice<ServiceDataItem>;
  chartData: ChartState;
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
