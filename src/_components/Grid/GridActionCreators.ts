import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes } from './GridTypes';
import { AgendaDataItem } from '../../Agenda';

export const setData = (data: AgendaDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const addItemToEdit = (dataItemID: number) => ({ type: ActionTypes.ADD_ITEM_TO_EDIT, payload: dataItemID });

export const updateItemAfterEdit = (dataItem: AgendaDataItem) => ({ type: ActionTypes.UPDATE_ITEM_AFTER_EDIT, payload: dataItem });

export const removeItemFromData = (removeItemID: number) => ({ type: ActionTypes.REMOVE_ITEM_FROM_DATA, payload: removeItemID });

export const cancelEdit = (editItemID: number) => ({ type: ActionTypes.CANCEL_EDIT, payload: editItemID });

export const changeItem = (gridEvent: GridItemChangeEvent) => ({ type: ActionTypes.CHANGE_ITEM, payload: gridEvent });
