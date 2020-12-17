import { Dispatch } from 'redux';
// Types
import { SchedulerDataItem, SchedulerStateActions, DefaultDataForFormItem } from './SchedulerTypes';
// Actions
import {
  setDataAC,
  changeMapTeamToFilteredAC,
  setFormItemIdAC,
  addNewItemToEditAC,
  discardAddNewItemToDataAC,
  setDefaultDataForFormItemAC,
} from './SchedulerAC';

export const SchedulerActions: SchedulerStateActions = {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => dispatch(setDataAC(data)),
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => dispatch(changeMapTeamToFilteredAC(employeeID)),
  setFormItemID: (dispatch: Dispatch, formItemID: number | null) => dispatch(setFormItemIdAC(formItemID)),

  addNewItemToEdit: (dispatch: Dispatch, defaultDataForFormItem: DefaultDataForFormItem) => dispatch(addNewItemToEditAC(defaultDataForFormItem)),
  discardNewItemToData: (dispatch: Dispatch) => dispatch(discardAddNewItemToDataAC()),

  setDefaultDataForFormItem: (dispatch: Dispatch, defaultDataForFormItem: DefaultDataForFormItem) =>
    dispatch(setDefaultDataForFormItemAC(defaultDataForFormItem)),
};
