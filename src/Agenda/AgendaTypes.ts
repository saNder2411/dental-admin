// Types
import { InferValueTypes } from '../_sections/Grid/GridTypes';
// Actions
import * as actions from './AgendaAC';

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

export interface LookupEntity {
  Id: number;
}

interface ImmutableDataItemKey {
  Id: number;
  Title: string;
  EventDate: string;
  EndDate: string;
  Duration: number;
  Description: string;
  fAllDayEvent: null | boolean;
  Email: string | null;
  AppointmentStatus: StatusNames;
  LastNameAppt: string;
  Notes: null | string;
  ServiceCharge: number;
  FilterStart: string;
  FilterEnd: string;
  MetroRRule: null | string;
  MetroRecException: null | Date[];
  Gender: null | '(1) Female' | '(2) Male';
  RecurrenceID: null | number;
  FirstName: string;
  CellPhone: string | null;
  ID: number;
  Modified: string;
}

export interface APIGetResAppointmentDataItem extends ImmutableDataItemKey {
  LookupMultiBP01offerings: { results: LookupEntity[] };
  LookupCM102customers: LookupEntity;
  LookupHR01team: LookupEntity;
}

export interface AppointmentDataItem extends APIGetResAppointmentDataItem {
  TeamID: number;
  Start: Date;
  End: Date;
  LastUpdate: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface AppointmentDataItemForCrtUpdActions extends ImmutableDataItemKey {
  LookupCM102customersId: number;
  LookupHR01teamId: number;
  LookupMultiBP01offeringsId: { results: number[] };
  __metadata: { type: string };
}

export interface AgendaState {
  isDataLoading: boolean;
  data: AppointmentDataItem[];
  dataError: string;
  isDataItemLoading: boolean;
  dataItemError: string;
  statusNameList: StatusNames[];
  isValidStartDateEvent: boolean;
  isValidEndDateEvent: boolean;
  isValidFullNameValue: boolean;
}

export const ActionTypes = {
  FETCH_DATA_INIT_ASYNC: 'AGENDA/FETCH_DATA_INIT_ASYNC' as const,
  FETCH_DATA_REQUEST: `AGENDA/FETCH_DATA_REQUEST` as const,
  FETCH_DATA_SUCCESS: `AGENDA/FETCH_DATA_SUCCESS` as const,
  FETCH_DATA_FAILURE: `AGENDA/FETCH_DATA_FAILURE` as const,
  FETCH_DATA_FINALLY: `AGENDA/FETCH_DATA_FINALLY` as const,
  CREATE_DATA_ITEM_INIT_ASYNC: 'AGENDA/CREATE_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_DATA_ITEM_REQUEST: `AGENDA/CREATE_DATA_ITEM_REQUEST` as const,
  CREATE_DATA_ITEM_SUCCESS: `AGENDA/CREATE_DATA_ITEM_SUCCESS` as const,
  CREATE_DATA_ITEM_FAILURE: `AGENDA/CREATE_DATA_ITEM_FAILURE` as const,
  CREATE_DATA_ITEM_FINALLY: `AGENDA/CREATE_DATA_ITEM_FINALLY` as const,
  UPDATE_DATA_ITEM_INIT_ASYNC: 'AGENDA/UPDATE_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_DATA_ITEM_REQUEST: `AGENDA/UPDATE_DATA_ITEM_REQUEST` as const,
  UPDATE_DATA_ITEM_SUCCESS: `AGENDA/UPDATE_DATA_ITEM_SUCCESS` as const,
  UPDATE_DATA_ITEM_FAILURE: `AGENDA/UPDATE_DATA_ITEM_FAILURE` as const,
  UPDATE_DATA_ITEM_FINALLY: `AGENDA/UPDATE_DATA_ITEM_FINALLY` as const,
  DELETE_DATA_ITEM_INIT_ASYNC: 'AGENDA/DELETE_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_DATA_ITEM_REQUEST: `AGENDA/DELETE_DATA_ITEM_REQUEST` as const,
  DELETE_DATA_ITEM_SUCCESS: `AGENDA/DELETE_DATA_ITEM_SUCCESS` as const,
  DELETE_DATA_ITEM_FAILURE: `AGENDA/DELETE_DATA_ITEM_FAILURE` as const,
  DELETE_DATA_ITEM_FINALLY: `AGENDA/DELETE_DATA_ITEM_FINALLY` as const,
  VALIDATE_START_DATE_EVENT: `AGENDA/VALIDATE_START_DATE_EVENT` as const,
  VALIDATE_END_DATE_EVENT: `AGENDA/VALIDATE_END_DATE_EVENT` as const,
  VALIDATE_FULL_NAME_VALUE: `AGENDA/VALIDATE_FULL_NAME_VALUE` as const,
  UPDATE_RECURRING_DATA_ITEM_ASYNC: 'AGENDA/UPDATE_RECURRING_DATA_ITEM_ASYNC' as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type FetchDataInitAsyncActionType = ReturnType<typeof actions.fetchDataInitAsyncAC>;

export type CreateDataItemInitAsyncActionType = ReturnType<typeof actions.createDataItemInitAsyncAC>;

export type UpdateDataItemInitAsyncActionType = ReturnType<typeof actions.updateDataItemInitAsyncAC>;

export type DeleteDataItemInitAsyncActionType = ReturnType<typeof actions.deleteDataItemInitAsyncAC>;

export type UpdateRecurringDataItemInitAsyncActionType = ReturnType<typeof actions.updateRecurringDataItemInitAsyncAC>;
