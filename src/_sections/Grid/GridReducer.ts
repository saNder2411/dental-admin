// import { combineReducers } from 'redux';
// Types
import { ActionTypes, GridState, Actions, GridDataName } from './GridTypes';
// Helpers
import {
  transformArrayDataToByIdData,
  // updateDataAfterAddItemToEdit,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  // updateDataOnChangeItem,
  getNewDataItem,
  updateDataAfterEditNewItem,
  setTitleForAddNewItemSectionAndDataName,
  // updateDataAfterCancelEdit,
} from './GridHelpers';

const initialState = {
  viewOriginalData: [],
  byId: {},
  processById: {},
  allIDs: [],
  dataName: GridDataName.Default,
  isDataLoading: false,
  isDataItemLoading: false,
  dataError: ``,
  dataItemError: ``,
  labelForAddNewItemBtn: '',
  entities: {
    appointments: { originalData: [], byId: {}, allIDs: [] },
    customers: { originalData: [], byId: {}, allIDs: [] },
    staff: { originalData: [], byId: {}, allIDs: [] },
    services: { originalData: [], byId: {}, allIDs: [] },
  },
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    // View
    case ActionTypes.CHANGE_VIEW_ORIGINAL_DATA:
      const [byId, allIDs] = transformArrayDataToByIdData(action.payload);
      return {
        ...state,
        viewOriginalData: action.payload,
        byId,
        processById: { ...byId },
        allIDs,
        ...setTitleForAddNewItemSectionAndDataName(action.payload[0]),
      };

    case ActionTypes.CHANGE_DATA_NAME:
      return { ...state, dataName: action.payload };

    // Edit
    case ActionTypes.ADD_ITEM_TO_EDIT:
      const inEditDataItem = { ...state.processById[action.payload], inEdit: true };
      return {
        ...state,
        processById: { ...state.processById, [action.payload]: inEditDataItem },
        byId: { ...state.byId, [action.payload]: { ...inEditDataItem } },
      };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.viewOriginalData, action.payload);
      const updatedByIdItem = { ...action.payload, inEdit: false, isNew: false };
      return {
        ...state,
        viewOriginalData: newDataAfterEditItem,
        processById: { ...state.processById, [action.payload.ID]: updatedByIdItem },
        byId: { ...state.byId, [action.payload.ID]: { ...updatedByIdItem } },
        isDataItemLoading: false,
      };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.viewOriginalData, action.payload);
      const newAllIDsAfterRemoveItem = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.processById[action.payload];
      delete state.byId[action.payload];
      return {
        ...state,
        viewOriginalData: newDataAfterRemoveItem,
        processById: { ...state.processById },
        byId: { ...state.byId },
        allIDs: [...newAllIDsAfterRemoveItem],
        isDataItemLoading: false,
      };

    case ActionTypes.CANCEL_EDIT:
      const originalDataItem = state.byId[action.payload];
      return {
        ...state,
        processById: { ...state.processById, [action.payload]: { ...originalDataItem, inEdit: false } },
        byId: { ...state.byId, [action.payload]: { ...originalDataItem, inEdit: false } },
      };

    case ActionTypes.CHANGE_ITEM:
      const changeProcessItem = state.processById[action.payload.dataItem];
      return {
        ...state,
        processById: {
          ...state.processById,
          [action.payload.dataItem]: { ...changeProcessItem, [action.payload.field as string]: action.payload.value },
        },
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataItem = getNewDataItem(state.viewOriginalData, state.dataName);
      return {
        ...state,
        viewOriginalData: [newDataItem, ...state.viewOriginalData],
        processById: { ...state.processById, [newDataItem.ID]: newDataItem },
        byId: { ...state.byId, [newDataItem.ID]: { ...newDataItem } },
        allIDs: [newDataItem.ID, ...state.allIDs],
      };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.viewOriginalData, action.payload);
      return {
        ...state,
        viewOriginalData: newDataAfterEditNewItem,
        processById: { ...state.processById, [action.payload.ID]: action.payload },
        byId: { ...state.byId, [action.payload.ID]: { ...action.payload } },
        isDataItemLoading: false,
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem(state.viewOriginalData, action.payload);
      const updatedAllIDs = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.processById[action.payload];
      delete state.byId[action.payload];
      return {
        ...state,
        viewOriginalData: newDataAfterDiscardAddNewItem,
        processById: { ...state.processById },
        byId: { ...state.byId },
        allIDs: [...updatedAllIDs],
      };

    default:
      return state;
  }
};
