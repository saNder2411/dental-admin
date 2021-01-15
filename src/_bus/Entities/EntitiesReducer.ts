// Types
import { ActionTypes, EntitiesState, Actions, GenericDataItem } from './EntitiesTypes';
// Helpers
import {
  updateStateSliceOnFetchDataSuccess,
  updateStateSliceOnCreateDataItem,
  updateStateSliceOnUpdateDataItem,
  updateStateSliceOnDeleteDataItem,
  updateStateSliceOnAddDataItemToEditInGrid,
  updateStateSliceOnCancelEditInGrid,
  updateStateSliceOnChangeDataItemInGrid,
  updateStateSliceOnAddNewItemToEditInGrid,
} from './EntitiesHelpers';

const initialState = {
  appointments: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  customers: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  staff: { originalData: [], processById: {}, byId: {}, allIDs: [] },
  services: { originalData: [], processById: {}, byId: {}, allIDs: [] },
};

export const reducer = (state: EntitiesState = initialState, action: Actions): EntitiesState => {
  switch (action.type) {
    // Sync Data
    case ActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [] },
      };

    case ActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnFetchDataSuccess(state[action.entityName], action.data),
      };

    case ActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        [action.entityName]: { originalData: [], processById: {}, byId: {}, allIDs: [] },
      };
    // Sync Data Item
    case ActionTypes.CREATE_DATA_ITEM_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnCreateDataItem(state[action.entityName], action.dataItem),
      };

    case ActionTypes.UPDATE_DATA_ITEM_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnUpdateDataItem(state[action.entityName], action.dataItem),
      };

    case ActionTypes.DELETE_DATA_ITEM_SUCCESS:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnDeleteDataItem<GenericDataItem>(state[action.entityName], action.deletedDataItemID),
      };
    // Grid
    case ActionTypes.ADD_ITEM_TO_EDIT:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnAddDataItemToEditInGrid<GenericDataItem>(state[action.entityName], action.dataItemID),
      };

    case ActionTypes.CANCEL_EDIT:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnCancelEditInGrid<GenericDataItem>(state[action.entityName], action.dataItemID),
      };

    case ActionTypes.CHANGE_ITEM:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnChangeDataItemInGrid<GenericDataItem>(state[action.entityName], action.changeData),
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnAddNewItemToEditInGrid<GenericDataItem>(state[action.entityName], action.entityName),
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      return {
        ...state,
        [action.entityName]: updateStateSliceOnDeleteDataItem<GenericDataItem>(state[action.entityName], action.dataItemID),
      };

    default:
      return state;
  }
};
