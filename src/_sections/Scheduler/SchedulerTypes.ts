import { Dispatch } from 'redux';
import { SchedulerProps } from '@progress/kendo-react-scheduler';
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

  SET_DEFAULT_DATA_FOR_FORM_ITEM: 'SCHEDULER/SET_DEFAULT_DATA_FOR_FORM_ITEM' as const,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type SchedulerDataItem = InferValueTypes<{ type1: AgendaDataItem }>;

export interface DefaultDataForFormItem {
  Start: Date;
  End: Date;
  TeamID: number;
}

export interface SchedulerStateActions {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => void;
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => void;
  setFormItemID: (dispatch: Dispatch, formItemID: number | null) => void;

  addNewItemToEdit: (dispatch: Dispatch, defaultDataForFormItem: DefaultDataForFormItem) => void;
  discardNewItemToData: (dispatch: Dispatch) => void;

  setDefaultDataForFormItem: (dispatch: Dispatch, defaultDataForFormItem: DefaultDataForFormItem) => void;
}

export interface SchedulerState {
  eventDrivenData: SchedulerDataItem[];
  originalData: SchedulerDataItem[];
  mapTeamToFiltered: { [key: string]: boolean };
  formItemID: number | null;
  newFormItem: null | SchedulerDataItem;
  defaultDataForFormItem: DefaultDataForFormItem;
}

export interface CustomSchedulerProps extends SchedulerProps {
  setIsAgendaDataItemLoading: (isLoading: boolean) => void;
}
