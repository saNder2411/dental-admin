// Types
import { ActionTypes, ServicesDataItem } from './ServicesTypes';
// Sync
export const servicesFetchRequestAC = () => ({ type: ActionTypes.FETCH_DATA_REQUEST });

export const servicesFetchSuccessAC = (data: ServicesDataItem[]) => ({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: data });

export const servicesFetchFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_DATA_FAILURE, payload: errorMessage });

export const servicesFetchFinallyAC = () => ({ type: ActionTypes.FETCH_DATA_FINALLY });

export const serviceCreateRequestAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_REQUEST });

export const serviceCreateSuccessAC = (data: ServicesDataItem) => ({ type: ActionTypes.CREATE_DATA_ITEM_SUCCESS, payload: data });

export const serviceCreateFailureAC = (errorMessage: string) => ({ type: ActionTypes.CREATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const serviceCreateFinallyAC = () => ({ type: ActionTypes.CREATE_DATA_ITEM_FINALLY });

export const serviceUpdateRequestAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_REQUEST });

export const serviceUpdateSuccessAC = (data: ServicesDataItem) => ({ type: ActionTypes.UPDATE_DATA_ITEM_SUCCESS, payload: data });

export const serviceUpdateFailureAC = (errorMessage: string) => ({ type: ActionTypes.UPDATE_DATA_ITEM_FAILURE, payload: errorMessage });

export const serviceUpdateFinallyAC = () => ({ type: ActionTypes.UPDATE_DATA_ITEM_FINALLY });

export const serviceDeleteRequestAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_REQUEST });

export const serviceDeleteSuccessAC = (deletedServiceID: number) => ({ type: ActionTypes.DELETE_DATA_ITEM_SUCCESS, payload: deletedServiceID });

export const serviceDeleteFailureAC = (errorMessage: string) => ({ type: ActionTypes.DELETE_DATA_ITEM_FAILURE, payload: errorMessage });

export const serviceDeleteFinallyAC = () => ({ type: ActionTypes.DELETE_DATA_ITEM_FINALLY });
// Async
export const servicesFetchInitAsyncAC = () => ({ type: ActionTypes.FETCH_DATA_INIT_ASYNC });

export const serviceCreateInitAsyncAC = (createdService: ServicesDataItem, onAddDataItemToGRidData: () => void) => ({
  type: ActionTypes.CREATE_DATA_ITEM_INIT_ASYNC,
  payload: createdService,
  meta: onAddDataItemToGRidData,
});

export const serviceUpdateInitAsyncAC = (updatedService: ServicesDataItem) => ({ type: ActionTypes.UPDATE_DATA_ITEM_INIT_ASYNC, payload: updatedService });

export const serviceDeleteInitAsyncAC = (deletedServiceID: number) => ({ type: ActionTypes.DELETE_DATA_ITEM_INIT_ASYNC, payload: deletedServiceID });
