import { Dispatch } from 'redux';
// Types
import { InferValueTypes } from '../_sections/Grid/GridTypes';
// Actions
import * as actions from './ServicesAC';

export enum OfferIcons {
  Tooth = 'Tooth',
}

export interface APIServicesDataItem {
  Amount: number;
  AmountSalesTaxLocal: string;
  AmountTotal: string;
  ConsultReq: boolean;
  ID: number;
  Id: number;
  MinutesDuration: number;
  OfferingCatType: string;
  OfferingDiscount: number;
  OfferingsName_Edit: string;
  SalesTaxRate: number;
  ShowOnline: boolean;
  Title: string;
  __metadata: {
    etag: string;
    id: string;
    type: string;
    uri: string;
  };
}

export interface ServicesDataItem {
  Amount: number;
  AmountSalesTaxLocal: string;
  AmountTotal: string;
  ConsultReq: boolean;
  ID: number;
  Id: number;
  id: number;
  MinutesDuration: number;
  OfferingCatType: string;
  OfferingDiscount: number;
  OfferingsName_Edit: string;
  OfferIconName: OfferIcons;
  RoleSkills: string;
  SalesTaxRate: number;
  ShowOnline: boolean;
  Title: string;
  __metadata: {
    etag: string;
    id: string;
    type: string;
    uri: string;
  };
  inEdit?: boolean;
  isNew?: boolean;
}

export type ServicesDataItemKeys = keyof ServicesDataItem;

export type ServicesDataItemValues = ServicesDataItem[ServicesDataItemKeys];

export interface ServicesState {
  isDataLoading: boolean;
  data: ServicesDataItem[];
  dataError: string;
  isDataItemLoading: boolean;
  dataItemError: string;
  roleSkills: string[];
  actions: {
    fetchServicesData: (dispatch: Dispatch) => void;
    createService: (dispatch: Dispatch, createdService: ServicesDataItem) => void;
    updateService: (dispatch: Dispatch, updatedService: ServicesDataItem) => void;
    deleteService: (dispatch: Dispatch, deletedServiceID: number) => void;
  };
}

export const ActionTypes = {
  FETCH_INIT_ASYNC: 'SERVICES/FETCH_INIT_ASYNC' as const,
  FETCH_REQUEST: `SERVICES/FETCH_REQUEST` as const,
  FETCH_SUCCESS: `SERVICES/FETCH_SUCCESS` as const,
  FETCH_FAILURE: `SERVICES/FETCH_FAILURE` as const,
  FETCH_FINALLY: `SERVICES/FETCH_FINALLY` as const,
  CREATE_INIT_ASYNC: 'SERVICES/CREATE_INIT_ASYNC' as const,
  CREATE_REQUEST: `SERVICE/CREATE_REQUEST` as const,
  CREATE_SUCCESS: `SERVICE/CREATE_SUCCESS` as const,
  CREATE_FAILURE: `SERVICE/CREATE_FAILURE` as const,
  CREATE_FINALLY: `SERVICE/CREATE_FINALLY` as const,
  UPDATE_INIT_ASYNC: 'SERVICES/UPDATE_INIT_ASYNC' as const,
  UPDATE_REQUEST: `SERVICE/UPDATE_REQUEST` as const,
  UPDATE_SUCCESS: `SERVICE/UPDATE_SUCCESS` as const,
  UPDATE_FAILURE: `SERVICE/UPDATE_FAILURE` as const,
  UPDATE_FINALLY: `SERVICE/UPDATE_FINALLY` as const,
  DELETE_INIT_ASYNC: 'SERVICES/DELETE_INIT_ASYNC' as const,
  DELETE_REQUEST: `SERVICE/DELETE_REQUEST` as const,
  DELETE_SUCCESS: `SERVICE/DELETE_SUCCESS` as const,
  DELETE_FAILURE: `SERVICE/DELETE_FAILURE` as const,
  DELETE_FINALLY: `SERVICE/DELETE_FINALLY` as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type ServiceCreateInitAsyncAC = ReturnType<typeof actions.serviceCreateInitAsyncAC>;

export type ServiceUpdateInitAsyncAC = ReturnType<typeof actions.serviceUpdateInitAsyncAC>;

export type ServiceDeleteInitAsyncAC = ReturnType<typeof actions.serviceDeleteInitAsyncAC>;
