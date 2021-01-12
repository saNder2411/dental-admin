import { combineReducers } from 'redux';
// Types
import { ActionTypes, Actions } from '../Types';

const dataLoadingReducer = (state: boolean = false, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_REQUEST:
      return true;
    case ActionTypes.FETCH_DATA_FINALLY:
      return false;
    default:
      return state;
  }
};

const dataItemLoadingReducer = (state: boolean = false, action: Actions) => {
  switch (action.type) {
    case ActionTypes.CREATE_DATA_ITEM_REQUEST:
      return true;

    case ActionTypes.CREATE_DATA_ITEM_FINALLY:
      return false;

    case ActionTypes.UPDATE_DATA_ITEM_REQUEST:
      return true;

    case ActionTypes.UPDATE_DATA_ITEM_FINALLY:
      return false;

    case ActionTypes.DELETE_DATA_ITEM_REQUEST:
      return true;

    case ActionTypes.DELETE_DATA_ITEM_FINALLY:
      return false;

    default:
      return state;
  }
};

const dataErrorReducer = (state: string = ``, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_REQUEST:
      return ``;

    case ActionTypes.FETCH_DATA_FAILURE:
      return action.errorMessage;

    default:
      return state;
  }
};

const dataItemErrorReducer = (state: string = ``, action: Actions) => {
  switch (action.type) {
    case ActionTypes.CREATE_DATA_ITEM_REQUEST:
      return ``;

    case ActionTypes.CREATE_DATA_ITEM_FAILURE:
      return action.errorMessage;

    case ActionTypes.UPDATE_DATA_ITEM_REQUEST:
      return ``;

    case ActionTypes.UPDATE_DATA_ITEM_FAILURE:
      return action.errorMessage;

    case ActionTypes.DELETE_DATA_ITEM_REQUEST:
      return ``;

    case ActionTypes.DELETE_DATA_ITEM_FAILURE:
      return action.errorMessage;

    default:
      return state;
  }
};

const userAuthErrorReducer = (state: string = ``, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_AUTH_DATA_FAILURE:
      return action.errorMessage;
    default:
      return state;
  }
};

export const UIReducer = combineReducers({
  isDataLoading: dataLoadingReducer,
  isDataItemLoading: dataItemLoadingReducer,
  dataError: dataErrorReducer,
  dataItemError: dataItemErrorReducer,
  userAuthError: userAuthErrorReducer,
});
