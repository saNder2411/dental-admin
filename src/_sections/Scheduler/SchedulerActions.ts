import { Dispatch } from 'redux';
// Types
import { SchedulerDataItem, SchedulerStateActions, InitDataForNewDataItem, ViewType } from './SchedulerTypes';
// Actions
import {
  setDataAC,
  changeMapTeamToFilteredAC,
  setFormItemIdAC,
  addNewItemToEditAC,
  discardAddNewItemToDataAC,
  changeSelectedDateAC,
  changeSelectedViewAC,
  changeUpdatedRecurringDataItemAC,
} from './SchedulerAC';

export const SchedulerActions: SchedulerStateActions = {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => dispatch(setDataAC(data)),
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => dispatch(changeMapTeamToFilteredAC(employeeID)),
  setFormItemID: (dispatch: Dispatch, formItemID: number | null) => dispatch(setFormItemIdAC(formItemID)),

  addNewItemToEdit: (dispatch: Dispatch, initDataForNewDataItem: InitDataForNewDataItem) => dispatch(addNewItemToEditAC(initDataForNewDataItem)),
  discardNewItemToData: (dispatch: Dispatch) => dispatch(discardAddNewItemToDataAC()),

  changeSelectedDate: (dispatch: Dispatch, date: Date) => dispatch(changeSelectedDateAC(date)),
  changeSelectedView: (dispatch: Dispatch, view: ViewType) => dispatch(changeSelectedViewAC(view)),
  changeUpdatedRecurringDataItem: (dispatch: Dispatch, dataItem: SchedulerDataItem | null) => dispatch(changeUpdatedRecurringDataItemAC(dataItem)),
};
