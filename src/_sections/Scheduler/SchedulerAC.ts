import { ActionTypes, SchedulerDataItem, InitDataForNewDataItem, ViewType } from './SchedulerTypes';
import {
  fetchDataSuccessAC as fetchTeamStaffDataTSuccessAC,
  createDataItemSuccessAC as createTeamStaffDataDataItemSuccessAC,
  deleteDataItemSuccessAC as deleteTeamStaffDataDataItemSuccessAC,
} from '../../TeamStaff/TeamStaffAC';

export const setDataAC = (data: SchedulerDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const changeMapTeamToFilteredAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED, payload: employeeID });

export const setFormItemIdAC = (formItemID: number | null) => ({ type: ActionTypes.SET_FORM_ITEM_ID, payload: formItemID });

export const addNewItemToEditAC = (initDataForNewDataItem: InitDataForNewDataItem) => ({
  type: ActionTypes.ADD_NEW_ITEM_TO_EDIT,
  payload: initDataForNewDataItem,
});

export const discardAddNewItemToDataAC = () => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA });

export const changeSelectedDateAC = (date: Date) => ({ type: ActionTypes.CHANGE_SELECTED_DATE, payload: date });

export const changeSelectedViewAC = (view: ViewType) => ({ type: ActionTypes.CHANGE_SELECTED_VIEW, payload: view });

export { fetchTeamStaffDataTSuccessAC, createTeamStaffDataDataItemSuccessAC, deleteTeamStaffDataDataItemSuccessAC };
