import { ActionTypes, SchedulerDataItem } from './SchedulerTypes';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';

export const setDataAC = (data: SchedulerDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const setFilterEmployeeAC = (data: { [key: string]: boolean }) => ({ type: ActionTypes.SET_FILTER_EMPLOYEE, payload: data });

export const changeFilterEmployeeAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_FILTER_EMPLOYEE, payload: employeeID });

export const setFormItemAC = (formItemID: number | null) => ({ type: ActionTypes.SET_FORM_ITEM, payload: formItemID });

export const setSelectedItemIdAC = (selectedItemID: number | null) => ({ type: ActionTypes.SET_SELECTED_ITEM_ID, payload: selectedItemID });

export const addItemToEditAC = (dataItemID: number) => ({ type: ActionTypes.ADD_ITEM_TO_EDIT, payload: dataItemID });

export const updateItemAfterEditAC = (dataItem: SchedulerDataItem) => ({ type: ActionTypes.UPDATE_ITEM_AFTER_EDIT, payload: dataItem });

export const removeItemFromDataAC = (removeItemID: number) => ({ type: ActionTypes.REMOVE_ITEM_FROM_DATA, payload: removeItemID });

export const cancelEditAC = (editItemID: number) => ({ type: ActionTypes.CANCEL_EDIT, payload: editItemID });

export const changeItemAC = (schedulerEvent: SchedulerDataChangeEvent) => ({ type: ActionTypes.CHANGE_ITEM, payload: schedulerEvent });

export const addNewItemToEditAC = () => ({ type: ActionTypes.ADD_NEW_ITEM_TO_EDIT });

export const addNewItemToDataAC = (dataItem: SchedulerDataItem) => ({ type: ActionTypes.ADD_NEW_ITEM_TO_DATA, payload: dataItem });

export const discardAddNewItemToDataAC = (dataItemID: number) => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA, payload: dataItemID });

export const dataItemFetchingAC = (isLoading: boolean) => ({ type: ActionTypes.DATA_ITEM_FETCHING, payload: isLoading });