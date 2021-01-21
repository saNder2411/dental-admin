// Types
import { InferValueTypes } from '../Entities/EntitiesTypes';
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

type NumberAsString<T> = string extends T ? number : string;

export interface EffectiveBasePermissions {
  __metadata: {
    type: 'SP.BasePermissions';
  };
  High: NumberAsString<string>;
  Low: NumberAsString<string>;
}

export enum UserRoles {
  Owner = 'Owner',
  Manager = 'Manager',
  NotAdmin = 'NotAdmin',
}

export interface UserInfo {
  role: UserRoles;
}

export interface UserState {
  user: UserInfo | null;
}
