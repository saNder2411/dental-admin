// Types
import { ActionTypes, GridState, Actions, GridDataName } from './GridTypes';
// Helpers
import {
  updateDataAfterAddItemToEdit,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  updateDataOnChangeItem,
  updateDataOnAddNewItemToChange,
  updateDataAfterEditNewItem,
  setTitleForAddNewItemSectionAndDataName,
  updateDataAfterCancelEdit,
} from './GridHelpers';

const initialState = {
  data: [],
  dataID: [],
  originalData: [],
  dataName: GridDataName.Default,
  isDataItemLoading: false,
  editField: 'inEdit' as const,
  titleForAddNewItemSection: '',
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
        dataID: action.payload.map(({ ID }) => ID),
        originalData: [...action.payload],
        ...setTitleForAddNewItemSectionAndDataName(action.payload[0]),
      };

    case ActionTypes.ADD_ITEM_TO_EDIT:
      return { ...state, data: updateDataAfterAddItemToEdit(state.data, action.payload) };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.data, action.payload);
      return { ...state, data: newDataAfterEditItem, originalData: [...newDataAfterEditItem], isDataItemLoading: false };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.data, action.payload);
      return { ...state, data: newDataAfterRemoveItem, originalData: [...newDataAfterRemoveItem], isDataItemLoading: false };

    case ActionTypes.CANCEL_EDIT:
      return { ...state, data: updateDataAfterCancelEdit(state.data, state.originalData, action.payload) };

    case ActionTypes.CHANGE_ITEM:
      return { ...state, data: updateDataOnChangeItem(state.data, action.payload) };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      const newDataAfterAddNewItemToEdit = updateDataOnAddNewItemToChange(state.data, state.dataName);
      return { ...state, data: newDataAfterAddNewItemToEdit, originalData: [...newDataAfterAddNewItemToEdit] };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.data, action.payload);
      return { ...state, data: newDataAfterEditNewItem, originalData: [...newDataAfterEditNewItem], isDataItemLoading: false };

    case ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA:
      const newDataAfterDiscardAddNewItem = updateDataAfterRemoveItem(state.data, action.payload);
      return { ...state, data: newDataAfterDiscardAddNewItem, originalData: [...newDataAfterDiscardAddNewItem] };

    case ActionTypes.DATA_ITEM_FETCHING:
      return { ...state, isDataItemLoading: action.payload };

    default:
      return state;
  }
};
