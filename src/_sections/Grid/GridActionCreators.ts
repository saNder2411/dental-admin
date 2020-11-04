import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes } from './GridTypes';
import { AgendaDataItem } from '../../Agenda';

export const setDataAC = (data: AgendaDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const addItemToEditAC = (dataItemID: number) => ({ type: ActionTypes.ADD_ITEM_TO_EDIT, payload: dataItemID });

export const updateItemAfterEditAC = (dataItem: AgendaDataItem) => ({ type: ActionTypes.UPDATE_ITEM_AFTER_EDIT, payload: dataItem });

export const removeItemFromDataAC = (removeItemID: number) => ({ type: ActionTypes.REMOVE_ITEM_FROM_DATA, payload: removeItemID });

export const cancelEditAC = (editItemID: number) => ({ type: ActionTypes.CANCEL_EDIT, payload: editItemID });

export const changeItemAC = (gridEvent: GridItemChangeEvent) => ({ type: ActionTypes.CHANGE_ITEM, payload: gridEvent });

export const addNewItemToEditAC = () => ({ type: ActionTypes.ADD_NEW_ITEM_TO_EDIT });

export const addNewItemToDataAC = (dataItem: AgendaDataItem) => ({ type: ActionTypes.ADD_NEW_ITEM_TO_DATA, payload: dataItem });
