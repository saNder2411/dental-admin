import { ActionTypes, SchedulerDataItem } from './SchedulerTypes';
import {
  fetchDataSuccessAC as fetchTeamStaffDataTSuccessAC,
  createDataItemSuccessAC as createTeamStaffDataDataItemSuccessAC,
  deleteDataItemSuccessAC as deleteTeamStaffDataDataItemSuccessAC,
} from '../../TeamStaff/TeamStaffAC';

export const setDataAC = (data: SchedulerDataItem[]) => ({ type: ActionTypes.SET_DATA, payload: data });

export const changeMapTeamToFilteredAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED, payload: employeeID });

export const setFormItemIdAC = (formItemID: number | null) => ({ type: ActionTypes.SET_FORM_ITEM_ID, payload: formItemID });

export const addNewItemToEditAC = (defaultDataForFormItem: { Start: Date; End: Date; TeamID: number }) => ({
  type: ActionTypes.ADD_NEW_ITEM_TO_EDIT,
  payload: defaultDataForFormItem,
});

export const discardAddNewItemToDataAC = (dataItemID: number) => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA, payload: dataItemID });

export { fetchTeamStaffDataTSuccessAC, createTeamStaffDataDataItemSuccessAC, deleteTeamStaffDataDataItemSuccessAC };
