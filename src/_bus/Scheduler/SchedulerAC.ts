// Types
import { ActionTypes, ViewType, InitDataForNewAppointmentDataItem } from './SchedulerTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';

export const changeMapTeamToFilteredAC = (employeeID: number) => ({ type: ActionTypes.CHANGE_MAP_TEAM_TO_FILTERED, employeeID });

export const changeSelectedDateAC = (date: Date) => ({ type: ActionTypes.CHANGE_SELECTED_DATE, date });

export const changeSelectedViewAC = (view: ViewType) => ({ type: ActionTypes.CHANGE_SELECTED_VIEW, view });

export const changeUpdatedRecurringDataItemAC = (dataItem: AppointmentDataItem | null) => ({
  type: ActionTypes.CHANGE_UPDATED_RECURRING_DATA_ITEM,
  dataItem,
});

export const addNewItemToEditFormAC = (initDataForNewDataItem: InitDataForNewAppointmentDataItem, appointmentsAllIDs: number[]) => ({
  type: ActionTypes.ADD_NEW_ITEM_TO_EDIT_FORM,
  initDataForNewDataItem,
  appointmentsAllIDs,
});

export const discardAddNewItemToDataInSchedulerAC = () => ({
  type: ActionTypes.DISCARD_ADD_NEW_ITEM_TO_DATA,
});
