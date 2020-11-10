import { ActionTypes, SchedulerDataItem } from './SchedulerTypes';

export const setDataAC = (data: SchedulerDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const setFilterEmployeeAC = (data: { [key: string]: boolean }) => ({ type: ActionTypes.SET_FILTER_EMPLOYEE, payload: data });

export const changeFilterEmployeeAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_FILTER_EMPLOYEE, payload: employeeID });

export const setFormItemAC = (formItem: SchedulerDataItem | null) => ({ type: ActionTypes.SET_FORM_ITEM, payload: formItem });

export const setSelectedItemIdAC = (selectedItemID: number | null) => ({ type: ActionTypes.SET_SELECTED_ITEM_ID, payload: selectedItemID });
