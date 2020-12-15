import { Dispatch } from 'redux';
// Types
import { AgendaDataItem } from '../../Agenda/AgendaTypes';
// Actions
import * as actions from './SchedulerAC';

export const ActionTypes = {
  SET_DATA: 'SCHEDULER/SET_DATA' as const,
  CHANGE_MAP_TEAM_TO_FILTERED: 'SCHEDULER/CHANGE_MAP_TEAM_TO_FILTERED' as const,
  SET_FORM_ITEM_ID: 'SCHEDULER/SET_FORM_ITEM_ID' as const,

  ADD_NEW_ITEM_TO_EDIT: 'SCHEDULER/ADD_NEW_ITEM_TO_EDIT' as const,
  DISCARD_ADD_NEW_ITEM_TO_DATA: 'SCHEDULER/DISCARD_ADD_NEW_ITEM_TO_DATA' as const,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type SchedulerDataItem = InferValueTypes<{ type1: AgendaDataItem }>;

export interface SchedulerStateActions {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => void;
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => void;
  setFormItemID: (dispatch: Dispatch, formItemID: number | null) => void;

  onAddNewItem: (dispatch: Dispatch, defaultDataForFormItem: { Start: Date; End: Date; TeamID: number }) => void;
  onDiscardNewItemToData: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
}

export interface SchedulerState {
  eventDrivenData: SchedulerDataItem[];
  originalData: SchedulerDataItem[];
  mapTeamToFiltered: { [key: string]: boolean };
  formItemID: number | null;
}
