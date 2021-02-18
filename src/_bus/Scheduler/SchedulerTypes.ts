// Types
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { InferValueTypes } from '../Entities/EntitiesTypes';
// Actions
import * as actions from './SchedulerAC';

export const ActionTypes = {
  CHANGE_MAP_TEAM_TO_FILTERED: 'SCHEDULER/CHANGE_MAP_TEAM_TO_FILTERED' as const,
  CHANGE_SELECTED_DATE: 'SCHEDULER/CHANGE_SELECTED_DATE' as const,
  CHANGE_SELECTED_VIEW: 'SCHEDULER/CHANGE_SELECTED_VIEW' as const,
  CHANGE_UPDATED_RECURRING_DATA_ITEM: 'SCHEDULER/CHANGE_UPDATED_RECURRING_DATA_ITEM' as const,

  ADD_NEW_ITEM_TO_EDIT_FORM: 'SCHEDULER/SCHEDULER_ADD_NEW_ITEM_TO_EDIT_FORM' as const,
  DISCARD_ADD_NEW_ITEM_TO_DATA: 'SCHEDULER/SCHEDULER_DISCARD_ADD_NEW_ITEM_TO_DATA' as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type ViewType = 'day' | 'week' | 'month';

export interface InitDataForNewAppointmentDataItem {
  Start: Date;
  End: Date;
  TeamID: number;
}

export interface SchedulerState {
  mapTeamToFiltered: { [key: string]: boolean };
  selectedDate: Date;
  selectedView: ViewType;
  newAppointmentDataItem: null | AppointmentDataItem;
  updatableRecurringDataItem: null | AppointmentDataItem;
}
