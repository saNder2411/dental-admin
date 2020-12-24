// Types
import { InferValueTypes } from '../_sections/Grid/GridTypes';
import { LookupEntity } from '../Agenda/AgendaTypes';
// Actions
import * as actions from './CustomersAC';

export interface APICustomersDataItem {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: string;
  };
  LookupMultiHR01team: { results: LookupEntity[] };
  Id: number;
  Title: string;
  FirstName: string;
  FullName: string;
  CellPhone: string | null;
  Email: string | null;
  Gender: '(1) Female' | '(2) Male';
  AgeGroup: null | string;
  TrackingComments: null | string;
  WorkPhone: null | string;
  HomePhone: null | string;
  ClientPhoto: {
    Description: string;
    Url: string;
    __metadata: { type: string };
  } | null;
  ID: number;
  Modified: string;
  Created: string;

  SvcStaff: null | string;
  id: number;
  Upcoming: null | string;
}

export interface CustomersDataItem extends APICustomersDataItem {
  ClientPhotoUrl: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface CustomersState {
  isDataLoading: boolean;
  data: CustomersDataItem[];
  dataError: string;
  isDataItemLoading: boolean;
  dataItemError: string;
  isValidMobilePhoneField: boolean;
}

export const ActionTypes = {
  FETCH_DATA_INIT_ASYNC: 'CUSTOMERS/FETCH_DATA_INIT_ASYNC' as const,
  FETCH_DATA_REQUEST: `CUSTOMERS/FETCH_DATA_REQUEST` as const,
  FETCH_DATA_SUCCESS: `CUSTOMERS/FETCH_DATA_SUCCESS` as const,
  FETCH_DATA_FAILURE: `CUSTOMERS/FETCH_DATA_FAILURE` as const,
  FETCH_DATA_FINALLY: `CUSTOMERS/FETCH_DATA_FINALLY` as const,
  CREATE_DATA_ITEM_INIT_ASYNC: 'CUSTOMERS/CREATE_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_DATA_ITEM_REQUEST: `CUSTOMERS/CREATE_DATA_ITEM_REQUEST` as const,
  CREATE_DATA_ITEM_SUCCESS: `CUSTOMERS/CREATE_DATA_ITEM_SUCCESS` as const,
  CREATE_DATA_ITEM_FAILURE: `CUSTOMERS/CREATE_DATA_ITEM_FAILURE` as const,
  CREATE_DATA_ITEM_FINALLY: `CUSTOMERS/CREATE_DATA_ITEM_FINALLY` as const,
  UPDATE_DATA_ITEM_INIT_ASYNC: 'CUSTOMERS/UPDATE_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_DATA_ITEM_REQUEST: `CUSTOMERS/UPDATE_DATA_ITEM_REQUEST` as const,
  UPDATE_DATA_ITEM_SUCCESS: `CUSTOMERS/UPDATE_DATA_ITEM_SUCCESS` as const,
  UPDATE_DATA_ITEM_FAILURE: `CUSTOMERS/UPDATE_DATA_ITEM_FAILURE` as const,
  UPDATE_DATA_ITEM_FINALLY: `CUSTOMERS/UPDATE_DATA_ITEM_FINALLY` as const,
  DELETE_DATA_ITEM_INIT_ASYNC: 'CUSTOMERS/DELETE_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_DATA_ITEM_REQUEST: `CUSTOMERS/DELETE_DATA_ITEM_REQUEST` as const,
  DELETE_DATA_ITEM_SUCCESS: `CUSTOMERS/DELETE_DATA_ITEM_SUCCESS` as const,
  DELETE_DATA_ITEM_FAILURE: `CUSTOMERS/DELETE_DATA_ITEM_FAILURE` as const,
  DELETE_DATA_ITEM_FINALLY: `CUSTOMERS/DELETE_DATA_ITEM_FINALLY` as const,
  VALIDATE_MOBILE_PHONE_FIELD: `CUSTOMERS/VALIDATE_MOBILE_PHONE_FIELD` as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type FetchDataInitAsyncActionType = ReturnType<typeof actions.fetchDataInitAsyncAC>;

export type CreateDataItemInitAsyncActionType = ReturnType<typeof actions.createDataItemInitAsyncAC>;

export type UpdateDataItemInitAsyncActionType = ReturnType<typeof actions.updateDataItemInitAsyncAC>;

export type DeleteDataItemInitAsyncActionType = ReturnType<typeof actions.deleteDataItemInitAsyncAC>;
