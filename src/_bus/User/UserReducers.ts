import { combineReducers } from 'redux';
// Types
import { UserInfo, ActionTypes, UserActions } from './UserTypes';

const userReducer = (state: UserInfo | null = null, action: UserActions): UserInfo | null => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_DATA_SUCCESS:
      return action.userData;
    default:
      return state;
  }
};

export const UserReducer = combineReducers({
  user: userReducer,
});
