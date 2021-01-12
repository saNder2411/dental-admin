// Types
import { InferValueTypes } from '../Types';
// Actions
import * as actions from './UserAC';

export type UserActions = ReturnType<InferValueTypes<typeof actions>>;

export const ActionTypes = {
  //Async Fetch User
  FETCH_USER_DATA_INIT_ASYNC: 'USER/FETCH_USER_DATA_INIT_ASYNC' as const,
  // Sync  User
  FETCH_USER_DATA_REQUEST: `USER/FETCH_USER_DATA_REQUEST` as const,
  FETCH_USER_DATA_SUCCESS: `USER/FETCH_USER_DATA_SUCCESS` as const,
  FETCH_USER_DATA_FAILURE: `USER/FETCH_USER_DATA_FAILURE` as const,
  FETCH_USER_DATA_FINALLY: `USER/FETCH_USER_DATA_FINALLY` as const,
};

export interface UserInfo {
  IsSiteAdmin: boolean;
}

export interface UserState {
  user: UserInfo | null;
}
