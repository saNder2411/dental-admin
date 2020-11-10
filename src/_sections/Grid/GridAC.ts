import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { ActionTypes, GridDataItem } from './GridTypes';

export const setDataAC = (data: GridDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const addItemToEditAC = (dataItemID: number) => ({ type: ActionTypes.ADD_ITEM_TO_EDIT, payload: dataItemID });

export const updateItemAfterEditAC = (dataItem: GridDataItem) => ({ type: ActionTypes.UPDATE_ITEM_AFTER_EDIT, payload: dataItem });

export const removeItemFromDataAC = (removeItemID: number) => ({ type: ActionTypes.REMOVE_ITEM_FROM_DATA, payload: removeItemID });

export const cancelEditAC = (editItemID: number) => ({ type: ActionTypes.CANCEL_EDIT, payload: editItemID });

export const changeItemAC = (gridEvent: GridItemChangeEvent) => ({ type: ActionTypes.CHANGE_ITEM, payload: gridEvent });

export const addNewItemToEditAC = () => ({ type: ActionTypes.ADD_NEW_ITEM_TO_EDIT });

export const addNewItemToDataAC = (dataItem: GridDataItem) => ({ type: ActionTypes.ADD_NEW_ITEM_TO_DATA, payload: dataItem });

export const discardAddNewItemToDataAC = (dataItemID: number) => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA, payload: dataItemID });
