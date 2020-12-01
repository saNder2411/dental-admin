import { Dispatch } from 'redux';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
// Types
import { SchedulerDataItem, SchedulerStateActions } from './SchedulerTypes';
// Actions
import {
  setDataAC,
  setFilterEmployeeAC,
  changeFilterEmployeeAC,
  setFormItemAC,
  setSelectedItemIdAC,
  addItemToEditAC,
  updateItemAfterEditAC,
  removeItemFromDataAC,
  cancelEditAC,
  changeItemAC,
  addNewItemToEditAC,
  addNewItemToDataAC,
  discardAddNewItemToDataAC,
  dataItemFetchingAC,
} from './SchedulerAC';

export const SchedulerActions: SchedulerStateActions = {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => dispatch(setDataAC(data)),
  setMapTeamToFiltered: (dispatch: Dispatch, data: { [key: string]: boolean }) => dispatch(setFilterEmployeeAC(data)),
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => dispatch(changeFilterEmployeeAC(employeeID)),
  setFormItem: (dispatch: Dispatch, formItem: SchedulerDataItem | null) => dispatch(setFormItemAC(formItem ? formItem?.ID : null)),
  setSelectedItemID: (dispatch: Dispatch, selectedItemID: number | null) => dispatch(setSelectedItemIdAC(selectedItemID)),
  setIsSchedulerDataItemLoading: (dispatch: Dispatch, isLoading: boolean) => dispatch(dataItemFetchingAC(isLoading)),
  onItemEdit: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(addItemToEditAC(ID)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: SchedulerDataItem) => dispatch(updateItemAfterEditAC(dataItem)),
  onItemRemove: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(removeItemFromDataAC(ID)),
  onCancelEdit: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(cancelEditAC(ID)),
  onItemChange: (dispatch: Dispatch) => (evt: SchedulerDataChangeEvent) => dispatch(changeItemAC(evt)),
  onAddNewItem: (dispatch: Dispatch) => dispatch(addNewItemToEditAC()),
  onAddNewItemToData: (dispatch: Dispatch, dataItem: SchedulerDataItem) => dispatch(addNewItemToDataAC(dataItem)),
  onDiscardNewItemToData: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(discardAddNewItemToDataAC(ID)),
};
