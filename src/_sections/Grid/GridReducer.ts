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
  originalNormalizeData: {},
  normalizedData: {},
  allIDs: [],
  dataName: GridDataName.Default,
  isDataItemLoading: false,
  editField: 'inEdit' as const,
  titleForAddNewItemSection: '',
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      const [normalizedData, allIDs] = getNormalizedData(action.payload);
      return {
        ...state,
        eventDrivenData: action.payload,
        originalData: [...action.payload],
        normalizedData,
        originalNormalizeData: { ...normalizedData },
        allIDs,
        ...setTitleForAddNewItemSectionAndDataName(action.payload[0]),
      };

    case ActionTypes.SET_DATA_NAME_DEFAULT:
      return { ...state, dataName: GridDataName.Default };

    case ActionTypes.ADD_ITEM_TO_EDIT:
      const inEditNormalizeItem = { ...state.normalizedData[action.payload], inEdit: true };
      return {
        ...state,
        eventDrivenData: updateDataAfterAddItemToEdit(state.eventDrivenData, action.payload),
        normalizedData: { ...state.normalizedData, [action.payload]: inEditNormalizeItem },
      };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.eventDrivenData, action.payload);
      const updatedNormalizeItem = { ...action.payload, inEdit: false, isNew: false };
      return {
        ...state,
        eventDrivenData: newDataAfterEditItem,
        originalData: [...newDataAfterEditItem],
        normalizedData: { ...state.normalizedData, [action.payload.ID]: updatedNormalizeItem },
        originalNormalizeData: { ...state.originalNormalizeData, [action.payload.ID]: { ...action.payload, inEdit: false, isNew: false } },
        isDataItemLoading: false,
      };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.eventDrivenData, action.payload);
      const newAllIDs = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.normalizedData[action.payload];
      delete state.originalNormalizeData[action.payload];
      return {
        ...state,
        eventDrivenData: newDataAfterRemoveItem,
        originalData: [...newDataAfterRemoveItem],
        normalizedData: { ...state.normalizedData },
        originalNormalizeData: { ...state.originalNormalizeData },
        allIDs: [...newAllIDs],
        isDataItemLoading: false,
      };

    case ActionTypes.CANCEL_EDIT:
      return {
        ...state,
        eventDrivenData: updateDataAfterCancelEdit(state.eventDrivenData, state.originalData, action.payload),
        normalizedData: { ...state.originalNormalizeData },
      };

    case ActionTypes.CHANGE_ITEM:
      const changeNormalizeItem = state.normalizedData[action.payload.dataItem];
      return {
        ...state,
        eventDrivenData: updateDataOnChangeItem(state.eventDrivenData, action.payload),
        normalizedData: {
          ...state.normalizedData,
          [action.payload.dataItem]: { ...changeNormalizeItem, [action.payload.field as string]: action.payload.value },
        },
      };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataItem = getNewDataItem(state.eventDrivenData, state.dataName);
      return {
        ...state,
        eventDrivenData: [newDataItem, ...state.eventDrivenData],
        originalData: [newDataItem, ...state.originalData],
        normalizedData: { ...state.normalizedData, [newDataItem.ID]: newDataItem },
        originalNormalizeData: { ...state.originalNormalizeData, [newDataItem.ID]: newDataItem },
        allIDs: [newDataItem.ID, ...state.allIDs],
      };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.eventDrivenData, action.payload);
      return {
        ...state,
        eventDrivenData: newDataAfterEditNewItem,
        originalData: [...newDataAfterEditNewItem],
        normalizedData: { ...state.normalizedData, [action.payload.ID]: action.payload },
        originalNormalizeData: { ...state.originalNormalizeData, [action.payload.ID]: { ...action.payload } },
        isDataItemLoading: false,
      };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem(state.eventDrivenData, action.payload);
      const updatedAllIDs = state.allIDs.filter((ID) => ID !== action.payload);
      delete state.normalizedData[action.payload];
      delete state.originalNormalizeData[action.payload];
      return {
        ...state,
        eventDrivenData: newDataAfterDiscardAddNewItem,
        originalData: [...newDataAfterDiscardAddNewItem],
        normalizedData: { ...state.normalizedData },
        originalNormalizeData: { ...state.originalNormalizeData },
        allIDs: [...updatedAllIDs],
      };

    case ActionTypes.DATA_ITEM_FETCHING:
      return { ...state, isDataItemLoading: action.payload };

    default:
      return state;
  }
};


