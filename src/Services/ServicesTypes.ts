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
  RoleSkills?: string;
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
    createService: (dispatch: Dispatch, createdService: ServicesDataItem, onAddDataItemToGRidData: () => void) => void;
    updateService: (dispatch: Dispatch, updatedService: ServicesDataItem, onUpdateDataItemInGridData: () => void) => void;
    deleteService: (dispatch: Dispatch, deletedServiceID: number, onDeleteDataItemInGridData: () => void) => void;
  };
}

export const ActionTypes = {
  FETCH_DATA_INIT_ASYNC: 'SERVICES/FETCH_DATA_INIT_ASYNC' as const,
  FETCH_DATA_REQUEST: `SERVICES/FETCH_DATA_REQUEST` as const,
  FETCH_DATA_SUCCESS: `SERVICES/FETCH_DATA_SUCCESS` as const,
  FETCH_DATA_FAILURE: `SERVICES/FETCH_DATA_FAILURE` as const,
  FETCH_DATA_FINALLY: `SERVICES/FETCH_DATA_FINALLY` as const,
  CREATE_DATA_ITEM_INIT_ASYNC: 'SERVICES/CREATE_DATA_ITEM_INIT_ASYNC' as const,
  CREATE_DATA_ITEM_REQUEST: `SERVICE/CREATE_DATA_ITEM_REQUEST` as const,
  CREATE_DATA_ITEM_SUCCESS: `SERVICE/CREATE_DATA_ITEM_SUCCESS` as const,
  CREATE_DATA_ITEM_FAILURE: `SERVICE/CREATE_DATA_ITEM_FAILURE` as const,
  CREATE_DATA_ITEM_FINALLY: `SERVICE/CREATE_DATA_ITEM_FINALLY` as const,
  UPDATE_DATA_ITEM_INIT_ASYNC: 'SERVICES/UPDATE_DATA_ITEM_INIT_ASYNC' as const,
  UPDATE_DATA_ITEM_REQUEST: `SERVICE/UPDATE_DATA_ITEM_REQUEST` as const,
  UPDATE_DATA_ITEM_SUCCESS: `SERVICE/UPDATE_DATA_ITEM_SUCCESS` as const,
  UPDATE_DATA_ITEM_FAILURE: `SERVICE/UPDATE_DATA_ITEM_FAILURE` as const,
  UPDATE_DATA_ITEM_FINALLY: `SERVICE/UPDATE_DATA_ITEM_FINALLY` as const,
  DELETE_DATA_ITEM_INIT_ASYNC: 'SERVICES/DELETE_DATA_ITEM_INIT_ASYNC' as const,
  DELETE_DATA_ITEM_REQUEST: `SERVICE/DELETE_DATA_ITEM_REQUEST` as const,
  DELETE_DATA_ITEM_SUCCESS: `SERVICE/DELETE_DATA_ITEM_SUCCESS` as const,
  DELETE_DATA_ITEM_FAILURE: `SERVICE/DELETE_DATA_ITEM_FAILURE` as const,
  DELETE_DATA_ITEM_FINALLY: `SERVICE/DELETE_DATA_ITEM_FINALLY` as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type ServiceCreateInitAsyncAC = ReturnType<typeof actions.serviceCreateInitAsyncAC>;

export type ServiceUpdateInitAsyncAC = ReturnType<typeof actions.serviceUpdateInitAsyncAC>;

export type ServiceDeleteInitAsyncAC = ReturnType<typeof actions.serviceDeleteInitAsyncAC>;
