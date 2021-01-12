import { ActionTypes, UserInfo } from './UserTypes';

// UserInfo Async
export const fetchUserDataInitAsyncAC = () => ({ type: ActionTypes.FETCH_USER_DATA_INIT_ASYNC });

// // UserInfo Sync
export const fetchUserDataRequestAC = () => ({ type: ActionTypes.FETCH_USER_DATA_REQUEST });

export const fetchUserDataSuccessAC = (userData: UserInfo) => ({ type: ActionTypes.FETCH_USER_DATA_SUCCESS, userData });

export const fetchUserDataFailureAC = (errorMessage: string) => ({ type: ActionTypes.FETCH_USER_DATA_FAILURE, errorMessage });

export const fetchUserDataFinallyAC = () => ({ type: ActionTypes.FETCH_USER_DATA_FINALLY });
