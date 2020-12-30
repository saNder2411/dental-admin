// import { combineReducers } from 'redux';
// Types
import { ActionTypes, GridState, Actions, GridDataName } from './GridTypes';
// Helpers
import {
  getNormalizedData,
  updateDataAfterAddItemToEdit,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  updateDataOnChangeItem,
  getNewDataItem,
  updateDataAfterEditNewItem,
  setTitleForAddNewItemSectionAndDataName,
  updateDataAfterCancelEdit,
} from './GridHelpers';

const initialState = {
  originalData: [],
  eventDrivenData: [],
  originalObjectData: {},
  processData: {},
  allIDs: [],
  dataName: GridDataName.Default,
  isDataItemLoading: false,
  editField: 'inEdit' as const,
  titleForAddNewItemSection: '',
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      const [processData, allIDs] = getNormalizedData(action.payload);
      return {
        ...state,
        eventDrivenData: action.payload,
        originalData: [...action.payload],
        processData,
        originalObjectData: { ...processData },
        allIDs,
        ...setTitleForAddNewItemSectionAndDataName(action.payload[0]),
      };

    case ActionTypes.SET_DATA_NAME_DEFAULT:
      return { ...state, dataName: GridDataName.Default };

    case ActionTypes.ADD_ITEM_TO_EDIT:
      const inEditDataItem = { ...state.processData[action.payload], inEdit: true };
      return {
        ...state,
        eventDrivenData: updateDataAfterAddItemToEdit(state.eventDrivenData, action.payload),
        processData: { ...state.processData, [action.payload]: inEditDataItem },
        // originalObjectData: { ...state.originalObjectData, [action.payload]: { ...inEditDataItem } },
      };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.eventDrivenData, action.payload);
      const updatedNormalizeItem = { ...action.payload, inEdit: false, isNew: false };
      return {
        ...state,
        eventDrivenData: newDataAfterEditItem,
        originalData: [...newDataAfterEditItem],
        processData: { ...state.processData, [action.payload.ID]: updatedNormalizeItem },
        originalObjectData: { ...state.originalObjectData, [action.payload.ID]: { ...updatedNormalizeItem } },
        isDataItemLoading: false,
      };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.eventDrivenData, action.payload);
      const newAllIDs = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.processData[action.payload];
      delete state.originalObjectData[action.payload];
      return {
        ...state,
        eventDrivenData: newDataAfterRemoveItem,
        originalData: [...newDataAfterRemoveItem],
        processData: { ...state.processData },
        originalObjectData: { ...state.originalObjectData },
        allIDs: [...newAllIDs],
        isDataItemLoading: false,
      };

    case ActionTypes.CANCEL_EDIT:
      const originalDataItem = state.originalObjectData[action.payload];
      return {
        ...state,
        eventDrivenData: updateDataAfterCancelEdit(state.eventDrivenData, state.originalData, action.payload),
        processData: { ...state.processData, [action.payload]: { ...originalDataItem, inEdit: false } },
        // originalObjectData: { ...state.originalObjectData, [action.payload]: { ...originalDataItem } },
      };

    case ActionTypes.CHANGE_ITEM:
      const changeNormalizeItem = state.processData[action.payload.dataItem];
      return {
        ...state,
        eventDrivenData: updateDataOnChangeItem(state.eventDrivenData, action.payload),
        processData: {
          ...state.processData,
          [action.payload.dataItem]: { ...changeNormalizeItem, [action.payload.field as string]: action.payload.value },
        },
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataItem = getNewDataItem(state.eventDrivenData, state.dataName);
      return {
        ...state,
        eventDrivenData: [newDataItem, ...state.eventDrivenData],
        originalData: [newDataItem, ...state.originalData],
        processData: { ...state.processData, [newDataItem.ID]: newDataItem },
        originalObjectData: { ...state.originalObjectData, [newDataItem.ID]: { ...newDataItem } },
        allIDs: [newDataItem.ID, ...state.allIDs],
      };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.eventDrivenData, action.payload);
      return {
        ...state,
        eventDrivenData: newDataAfterEditNewItem,
        originalData: [...newDataAfterEditNewItem],
        processData: { ...state.processData, [action.payload.ID]: action.payload },
        originalObjectData: { ...state.originalObjectData, [action.payload.ID]: { ...action.payload } },
        isDataItemLoading: false,
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem(state.eventDrivenData, action.payload);
      const updatedAllIDs = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.processData[action.payload];
      delete state.originalObjectData[action.payload];
      return {
        ...state,
        eventDrivenData: newDataAfterDiscardAddNewItem,
        originalData: [...newDataAfterDiscardAddNewItem],
        processData: { ...state.processData },
        originalObjectData: { ...state.originalObjectData },
        allIDs: [...updatedAllIDs],
      };

    case ActionTypes.DATA_ITEM_FETCHING:
      return { ...state, isDataItemLoading: action.payload };

    default:
      return state;
  }
};
