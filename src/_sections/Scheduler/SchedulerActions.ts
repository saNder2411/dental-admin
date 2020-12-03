import { Dispatch } from 'redux';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
// Types
import { SchedulerDataItem, SchedulerStateActions } from './SchedulerTypes';
// Actions
import {
  setDataAC,
  changeMapTeamToFilteredAC,
  setFormItemIdAC,
  changeItemAC,
  addNewItemToEditAC,
  discardAddNewItemToDataAC,
} from './SchedulerAC';

export const SchedulerActions: SchedulerStateActions = {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => dispatch(setDataAC(data)),
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => dispatch(changeMapTeamToFilteredAC(employeeID)),
  setFormItemID: (dispatch: Dispatch, formItemID: number | null) => dispatch(setFormItemIdAC(formItemID)),

  onAddNewItem: (dispatch: Dispatch, defaultDataForFormItem: { Start: Date; End: Date; TeamID: number }) =>
    dispatch(addNewItemToEditAC(defaultDataForFormItem)),
  
  onItemChange: (dispatch: Dispatch) => (evt: SchedulerDataChangeEvent) => dispatch(changeItemAC(evt)),
  onDiscardNewItemToData: (dispatch: Dispatch, { ID }: SchedulerDataItem) => dispatch(discardAddNewItemToDataAC(ID)),
};
