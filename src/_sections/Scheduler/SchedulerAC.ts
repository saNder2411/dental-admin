import { ActionTypes, SchedulerDataItem, DefaultDataForFormItem } from './SchedulerTypes';
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

export const discardAddNewItemToDataAC = () => ({ type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA });

export const setDefaultDataForFormItemAC = (data: DefaultDataForFormItem) => ({ type: ActionTypes.SET_DEFAULT_DATA_FOR_FORM_ITEM, payload: data });

export { fetchTeamStaffDataTSuccessAC, createTeamStaffDataDataItemSuccessAC, deleteTeamStaffDataDataItemSuccessAC };
