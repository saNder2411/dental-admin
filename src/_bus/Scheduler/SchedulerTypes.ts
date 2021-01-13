// Types
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { InferValueTypes } from '../Entities/EntitiesTypes';
// Actions
import * as actions from './SchedulerAC';

export const ActionTypes = {
  CHANGE_MAP_TEAM_TO_FILTERED: 'SCHEDULER/CHANGE_MAP_TEAM_TO_FILTERED' as const,
  SET_FORM_ITEM_ID: 'SCHEDULER/SET_FORM_ITEM_ID' as const,
  CHANGE_SELECTED_DATE: 'SCHEDULER/CHANGE_SELECTED_DATE' as const,
  CHANGE_SELECTED_VIEW: 'SCHEDULER/CHANGE_SELECTED_VIEW' as const,
  CHANGE_UPDATED_RECURRING_DATA_ITEM: 'SCHEDULER/CHANGE_UPDATED_RECURRING_DATA_ITEM' as const,
};

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type ViewType = 'day' | 'week' | 'month';

export interface SchedulerState {
  mapTeamToFiltered: { [key: string]: boolean };
  formItemID: number | null;
  selectedDate: Date;
  selectedView: ViewType;
  updatableRecurringDataItem: null | AppointmentDataItem;
}
