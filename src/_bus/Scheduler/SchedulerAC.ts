// Types
import { ActionTypes, ViewType } from './SchedulerTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';

export const changeMapTeamToFilteredAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED, employeeID });

export const setFormItemIdAC = (formItemID: number | null) => ({ type: ActionTypes.SET_FORM_ITEM_ID, formItemID });

export const changeSelectedDateAC = (date: Date) => ({ type: ActionTypes.CHANGE_SELECTED_DATE, date });

export const changeSelectedViewAC = (view: ViewType) => ({ type: ActionTypes.CHANGE_SELECTED_VIEW, view });

export const changeUpdatedRecurringDataItemAC = (dataItem: AppointmentDataItem | null) => ({
  type: ActionTypes.CHANGE_UPDATED_RECURRING_DATA_ITEM,
  dataItem,
});
