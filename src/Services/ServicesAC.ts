// Types
import { ActionTypes, ServicesDataItem } from './ServicesTypes';
// Sync
export const servicesFetchRequestAC = () => ({ type: ActionTypes.FETCH_REQUEST });

export const servicesFetchSuccessAC = (data: ServicesDataItem[]) => ({ type: ActionTypes.FETCH_SUCCESS, payload: data });

export const servicesFetchFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_FAILURE, payload: errorMessage });

export const servicesFetchFinallyAC = () => ({ type: ActionTypes.FETCH_FINALLY });

export const serviceCreateRequestAC = () => ({ type: ActionTypes.CREATE_REQUEST });

export const serviceCreateSuccessAC = (data: ServicesDataItem) => ({ type: ActionTypes.CREATE_SUCCESS, payload: data });

export const serviceCreateFailureAC = (errorMessage: string) => ({ type: ActionTypes.CREATE_FAILURE, payload: errorMessage });

export const serviceCreateFinallyAC = () => ({ type: ActionTypes.CREATE_FINALLY });

export const serviceUpdateRequestAC = () => ({ type: ActionTypes.UPDATE_REQUEST });

export const serviceUpdateSuccessAC = (data: ServicesDataItem) => ({ type: ActionTypes.UPDATE_SUCCESS, payload: data });

export const serviceUpdateFailureAC = (errorMessage: string) => ({ type: ActionTypes.UPDATE_FAILURE, payload: errorMessage });

export const serviceUpdateFinallyAC = () => ({ type: ActionTypes.UPDATE_FINALLY });

export const serviceDeleteRequestAC = () => ({ type: ActionTypes.DELETE_REQUEST });

export const serviceDeleteSuccessAC = (deletedServiceID: number) => ({ type: ActionTypes.DELETE_SUCCESS, payload: deletedServiceID });

export const serviceDeleteFailureAC = (errorMessage: string) => ({ type: ActionTypes.DELETE_FAILURE, payload: errorMessage });

export const serviceDeleteFinallyAC = () => ({ type: ActionTypes.DELETE_FINALLY });
// Async
export const servicesFetchInitAsyncAC = () => ({ type: ActionTypes.FETCH_INIT_ASYNC });

export const serviceCreateInitAsyncAC = (createdService: ServicesDataItem) => ({ type: ActionTypes.CREATE_INIT_ASYNC, payload: createdService });

export const serviceUpdateInitAsyncAC = (updatedService: ServicesDataItem) => ({ type: ActionTypes.UPDATE_INIT_ASYNC, payload: updatedService });

export const serviceDeleteInitAsyncAC = (deletedServiceID: number) => ({ type: ActionTypes.DELETE_INIT_ASYNC, payload: deletedServiceID });
