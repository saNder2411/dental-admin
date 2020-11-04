import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes, GridState, Actions } from './GridTypes';
import { AgendaDataItem } from '../../Agenda';
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
} from './GridHelpers';

const initialState = {
  data: [],
  originData: [],
  editField: 'inEdit' as const,
  setData: (dispatch: Dispatch, data: AgendaDataItem[]) => dispatch(setDataAC(data)),
  onItemEdit: (dispatch: Dispatch, { id }: AgendaDataItem) => dispatch(addItemToEditAC(id)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: AgendaDataItem) => dispatch(updateItemAfterEditAC(dataItem)),
  onItemRemove: (dispatch: Dispatch, { id }: AgendaDataItem) => dispatch(removeItemFromDataAC(id)),
  onCancelEdit: (dispatch: Dispatch, { id }: AgendaDataItem) => dispatch(cancelEditAC(id)),
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => dispatch(changeItemAC(evt)),
  onAddNewItem: (dispatch: Dispatch) => dispatch(addNewItemToEditAC()),
  onAddNewItemToData: (dispatch: Dispatch, dataItem: AgendaDataItem) => dispatch(addNewItemToDataAC(dataItem)),
};

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: action.payload, originData: [...action.payload] };

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
      return { ...state, data: updateDataOnAddNewItemToChange(state.data) };

    case ActionTypes.ADD_NEW_ITEM_TO_DATA:
      const newDataAfterEditNewItem = updateDataAfterEditNewItem(state.data, action.payload);
      return { ...state, data: newDataAfterEditNewItem, originData: [...newDataAfterEditNewItem] };

    default:
      return state;
  }
};
