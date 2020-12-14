// Types
import { ActionTypes, CustomersDataItem } from './CustomersTypes';
// Helpers
import { transformDataItemForAPI } from './CustomersHelpers';
// Sync
export const fetchDataRequestAC = () => ({ type: ActionTypes.FETCH_DATA_REQUEST });

export const fetchDataSuccessAC = (data: CustomersDataItem[]) => ({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: data });

export const fetchDataFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_DATA_FAILURE, payload: errorMessage });

export const fetchDataFinallyAC = () => ({ type: ActionTypes.FETCH_DATA_FINALLY });

export const createDataItemRequestAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_REQUEST });

export const createDataItemSuccessAC = (data: CustomersDataItem) => ({ type: ActionTypes.CREATE_DATA_ITEM_SUCCESS, payload: data });

export const createDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.CREATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const createDataItemFinallyAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_FINALLY });

export const updateDataItemRequestAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_REQUEST });

export const updateDataItemSuccessAC = (data: CustomersDataItem) => ({ type: ActionTypes.UPDATE_DATA_ITEM_SUCCESS, payload: data });

export const updateDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.UPDATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const updateDataItemFinallyAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_FINALLY });

export const deleteDataItemRequestAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_REQUEST });

export const deleteDataItemSuccessAC = (deletedDataItemID: number) => ({ type: ActionTypes.DELETE_DATA_ITEM_SUCCESS, payload: deletedDataItemID });

export const deleteDataItemFailureAC = (errorMessage: string) => ({ type: ActionTypes.DELETE_DATA_ITEM_FAILURE, payload: errorMessage });

export const deleteDataItemFinallyAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_FINALLY });

export const validateMobilePhoneFieldAC = (isValid: boolean) => ({ type: ActionTypes.VALIDATE_MOBILE_PHONE_FIELD, payload: isValid });
// Async
export const fetchDataInitAsyncAC = (meta: { teamStaffDataLength: number }) => ({
  type: ActionTypes.FETCH_DATA_INIT_ASYNC,
  meta,
});

export const createDataItemInitAsyncAC = (createdDataItem: CustomersDataItem, onAddDataItemToGridData: () => void) => ({
  type: ActionTypes.CREATE_DATA_ITEM_INIT_ASYNC,
  payload: transformDataItemForAPI(createdDataItem),
  meta: onAddDataItemToGridData,
});

export const updateDataItemInitAsyncAC = (updatedDataItem: CustomersDataItem, onUpdateDataItemInGridData: () => void) => ({
  type: ActionTypes.UPDATE_DATA_ITEM_INIT_ASYNC,
  payload: transformDataItemForAPI(updatedDataItem),
  meta: onUpdateDataItemInGridData,
});

export const deleteDataItemInitAsyncAC = (deletedDataItemID: number, onDeleteDataItemInGridData: () => void) => ({
  type: ActionTypes.DELETE_DATA_ITEM_INIT_ASYNC,
  payload: deletedDataItemID,
  meta: onDeleteDataItemInGridData,
});
