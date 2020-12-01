import { Dispatch } from 'redux';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
// Types
import { AgendaDataItem } from '../../Agenda/AgendaTypes';
// Actions
import * as actions from './SchedulerAC';

export const ActionTypes = {
  SET_DATA: 'SCHEDULER/SET_DATA' as const,
  SET_MAP_TEAM_TO_FILTERED: 'SCHEDULER/SET_MAP_TEAM_TO_FILTERED' as const,
  CHANGE_MAP_TEAM_TO_FILTERED: 'SCHEDULER/CHANGE_MAP_TEAM_TO_FILTERED' as const,
  SET_FORM_ITEM: 'SCHEDULER/SET_FORM_ITEM' as const,
  SET_SELECTED_ITEM_ID: 'SCHEDULER/SET_SELECTED_ITEM_ID' as const,

  DATA_ITEM_FETCHING: 'SCHEDULER/DATA_ITEM_FETCHING' as const,
  ADD_ITEM_TO_EDIT: 'SCHEDULER/ADD_ITEM_TO_EDIT' as const,
  UPDATE_ITEM_AFTER_EDIT: 'SCHEDULER/UPDATE_ITEM_AFTER_EDIT' as const,
  REMOVE_ITEM_FROM_DATA: 'SCHEDULER/REMOVE_ITEM_FROM_DATA' as const,
  CANCEL_EDIT: 'SCHEDULER/CANCEL_EDIT' as const,
  CHANGE_ITEM: 'SCHEDULER/CHANGE_ITEM' as const,
  ADD_NEW_ITEM_TO_EDIT: 'SCHEDULER/ADD_NEW_ITEM_TO_EDIT' as const,
  ADD_NEW_ITEM_TO_DATA: 'SCHEDULER/ADD_NEW_ITEM_TO_DATA' as const,
  DISCARD_ADD_NEW_ITEM_TO_DATA: 'SCHEDULER/DISCARD_ADD_NEW_ITEM_TO_DATA' as const,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type SchedulerDataItem = InferValueTypes<{ type1: AgendaDataItem }>;

export interface SchedulerStateActions {
  setData: (dispatch: Dispatch, data: SchedulerDataItem[]) => void;
  setMapTeamToFiltered: (dispatch: Dispatch, data: { [key: string]: boolean }) => void;
  onEmployeeChange: (dispatch: Dispatch, employeeID: number) => void;
  setFormItem: (dispatch: Dispatch, formItem: SchedulerDataItem | null) => void;
  setSelectedItemID: (dispatch: Dispatch, selectedItemID: number | null) => void;

  setIsSchedulerDataItemLoading: (dispatch: Dispatch, isLoading: boolean) => void;
  onItemEdit: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
  onItemRemove: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
  onCancelEdit: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
  onItemChange: (dispatch: Dispatch) => (evt: SchedulerDataChangeEvent) => void;
  onAddNewItem: (dispatch: Dispatch) => void;
  onAddNewItemToData: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
  onDiscardNewItemToData: (dispatch: Dispatch, dataItem: SchedulerDataItem) => void;
}

export interface SchedulerState {
  eventDrivenData: SchedulerDataItem[];
  originalData: SchedulerDataItem[];
  mapTeamToFiltered: { [key: string]: boolean };
  isDataItemLoading: boolean;
  formItemID: number | null;
  selectedItemID: number | null;
}
