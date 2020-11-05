import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes, GridState, Actions, GridDataItem, GridDataName } from './GridTypes';
// Actions
import {
  setDataAC,
  addItemToEditAC,
  updateItemAfterEditAC,
  removeItemFromDataAC,
  cancelEditAC,
  changeItemAC,
  addNewItemToEditAC,
  addNewItemToDataAC,
} from './GridActionCreators';
// Helpers
import {
  updateDataAfterAddItemToEdit,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  updateDataOnChangeItem,
  updateDataOnAddNewItemToChange,
  updateDataAfterEditNewItem,
  setTitleForAddNewItemSectionAndDataName,
} from './GridHelpers';

const initialState = {
  data: [],
  originData: [],
  dataName: GridDataName.Default,
  editField: 'inEdit' as const,
  titleForAddNewItemSection: '',
  setData: (dispatch: Dispatch, data: GridDataItem[]) => dispatch(setDataAC(data)),
  onItemEdit: (dispatch: Dispatch, { id }: GridDataItem) => dispatch(addItemToEditAC(id)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: GridDataItem) => dispatch(updateItemAfterEditAC(dataItem)),
  onItemRemove: (dispatch: Dispatch, { id }: GridDataItem) => dispatch(removeItemFromDataAC(id)),
  onCancelEdit: (dispatch: Dispatch, { id }: GridDataItem) => dispatch(cancelEditAC(id)),
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => dispatch(changeItemAC(evt)),
  onAddNewItem: (dispatch: Dispatch) => dispatch(addNewItemToEditAC()),
  onAddNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => dispatch(addNewItemToDataAC(dataItem)),
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
        originData: [...action.payload],
        ...setTitleForAddNewItemSectionAndDataName(action.payload[0]),
      };

    case ActionTypes.ADD_ITEM_TO_EDIT:
      return { ...state, data: updateDataAfterAddItemToEdit(state.data, action.payload) };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.data, action.payload);
      return { ...state, data: newDataAfterEditItem, originData: [...newDataAfterEditItem] };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.data, action.payload);
      return { ...state, data: newDataAfterRemoveItem, originData: [...newDataAfterRemoveItem] };

    case ActionTypes.CANCEL_EDIT:
      return { ...state, data: [...state.originData] };

    case ActionTypes.CHANGE_ITEM:
      return { ...state, data: updateDataOnChangeItem(state.data, action.payload) };

    case ActionTypes.ADD_NEW_ITEM_TO_EDIT:
      return { ...state, data: updateDataOnAddNewItemToChange(state.data, state.dataName) };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.data, action.payload);
      return { ...state, data: newDataAfterEditNewItem, originData: [...newDataAfterEditNewItem] };

    default:
      return state;
  }
};
