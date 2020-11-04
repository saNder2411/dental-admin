import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes, GridState, Actions } from './GridTypes';
import { AgendaDataItem } from '../../Agenda';
// Actions
import { setData, addItemToEdit, updateItemAfterEdit, removeItemFromData, cancelEdit, changeItem } from './GridActionCreators';
// Helpers
import {
  updateDataAfterAddItemToEdit,
  updateDataAfterEditItem,
  updateDataAfterRemoveItem,
  updateDataAfterCancelEdit,
  updateDataOnChangeItem,
} from './GridHelpers';

const initialState = {
  data: [],
  originData: [],
  editField: 'inEdit' as const,
  setData: (dispatch: Dispatch, data: AgendaDataItem[]) => dispatch(setData(data)),
  onItemEdit: (dispatch: Dispatch, { id }: AgendaDataItem) => dispatch(addItemToEdit(id)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: AgendaDataItem) => dispatch(updateItemAfterEdit(dataItem)),
  onItemRemove: (dispatch: Dispatch, { id }: AgendaDataItem) => dispatch(removeItemFromData(id)),
  onCancelEdit: (dispatch: Dispatch, { id }: AgendaDataItem) => dispatch(cancelEdit(id)),
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => dispatch(changeItem(evt)),
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
        originData: [...action.payload],
      };

    case ActionTypes.ADD_ITEM_TO_EDIT:
      return { ...state, data: updateDataAfterAddItemToEdit(state.data, action.payload) };

    case ActionTypes.UPDATE_ITEM_AFTER_EDIT:
      const newDataAfterEditItem = updateDataAfterEditItem(state.data, action.payload);
      return {
        ...state,
        data: newDataAfterEditItem,
        originData: [...newDataAfterEditItem],
      };

    case ActionTypes.REMOVE_ITEM_FROM_DATA:
      const newDataAfterRemoveItem = updateDataAfterRemoveItem(state.data, action.payload);
      return { ...state, data: newDataAfterRemoveItem, originData: [...newDataAfterRemoveItem] };

    case ActionTypes.CANCEL_EDIT:
      return { ...state, data: updateDataAfterCancelEdit(state.data, state.originData, action.payload) };

    case ActionTypes.CHANGE_ITEM:
      return { ...state, data: updateDataOnChangeItem(state.data, action.payload) };

    default:
      return state;
  }
};
