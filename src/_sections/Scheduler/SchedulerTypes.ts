import { Dispatch } from 'redux';
// Types
import { CalendarDataItem } from '../../Calendar';
import { TeamStaffTeamData, TeamStaffDataItem } from '../../TeamStaff';
// Actions
import * as actions from './SchedulerAC';

export const ActionTypes = {
  SET_DATA: 'SCHEDULER/SET_DATA' as const,
  SET_FILTER_EMPLOYEE: 'SCHEDULER/SET_FILTER_EMPLOYEE' as const,
  CHANGE_FILTER_EMPLOYEE: 'SCHEDULER/CHANGE_FILTER_EMPLOYEE' as const,
  SET_FORM_ITEM: 'SCHEDULER/SET_FORM_ITEM' as const,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type SchedulerDataItem = InferValueTypes<{ type1: CalendarDataItem }>;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export interface SchedulerState {
  data: SchedulerDataItem[];
  filterEmployee: { [key: string]: boolean };
  teams: TeamStaffTeamData[];
  employees: TeamStaffDataItem[];
  formItem: SchedulerDataItem | null;
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => void;
  setFilterEmployee: (dispatch: Dispatch, data: { [key: string]: boolean }) => void;
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => void;
  setFormItem: (dispatch: Dispatch, formItem: SchedulerDataItem | null) => void;
}
