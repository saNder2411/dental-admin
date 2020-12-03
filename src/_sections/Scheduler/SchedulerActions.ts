import { Dispatch } from 'redux';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
// Types
import { SchedulerDataItem, SchedulerStateActions } from './SchedulerTypes';
// Actions
import {
  setDataAC,
  setMapTeamToFilteredAC,
  changeMapTeamToFilteredAC,
  setFormItemIdAC,
  // addItemToEditAC,
  updateItemAfterEditAC,
  removeItemFromDataAC,
  // cancelEditAC,
  changeItemAC,
  addNewItemToEditAC,
  addNewItemToDataAC,
  discardAddNewItemToDataAC,
  dataItemFetchingAC,
} from './SchedulerAC';

export const SchedulerActions: SchedulerStateActions = {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => dispatch(setDataAC(data)),
  setMapTeamToFiltered: (dispatch: Dispatch, data: { [key: string]: boolean }) => dispatch(setMapTeamToFilteredAC(data)),
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => dispatch(changeMapTeamToFilteredAC(employeeID)),
  setFormItemID: (dispatch: Dispatch, formItemID: number | null) => dispatch(setFormItemIdAC(formItemID)),
  setIsSchedulerDataItemLoading: (dispatch: Dispatch, isLoading: boolean) => dispatch(dataItemFetchingAC(isLoading)),
  // onItemEdit: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(addItemToEditAC(ID)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: SchedulerDataItem) => dispatch(updateItemAfterEditAC(dataItem)),
  onAddNewItem: (dispatch: Dispatch, defaultDataForFormItem: { Start: Date; End: Date; TeamID: number }) => dispatch(addNewItemToEditAC(defaultDataForFormItem)),

  onItemRemove: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(removeItemFromDataAC(ID)),
  // onCancelEdit: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(cancelEditAC(ID)),
  onItemChange: (dispatch: Dispatch) => (evt: SchedulerDataChangeEvent) => dispatch(changeItemAC(evt)),
  onAddNewItemToData: (dispatch: Dispatch, dataItem: SchedulerDataItem) => dispatch(addNewItemToDataAC(dataItem)),
  onDiscardNewItemToData: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(discardAddNewItemToDataAC(ID)),
};
