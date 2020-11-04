import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { AgendaDataItem } from '../../Agenda';
// Actions
import * as actions from './GridActionCreators';

export const ActionTypes = {
  SET_DATA: 'GRID/SET_DATA' as const,
  ADD_ITEM_TO_EDIT: 'GRID/ADD_ITEM_TO_EDIT' as const,
  UPDATE_ITEM_AFTER_EDIT: 'GRID/UPDATE_ITEM_AFTER_EDIT' as const,
  REMOVE_ITEM_FROM_DATA: 'GRID/REMOVE_ITEM_FROM_DATA' as const,
  CANCEL_EDIT: 'GRID/CANCEL_EDIT' as const,
  CHANGE_ITEM: 'GRID/CHANGE_ITEM' as const,
};

export interface GridState {
  data: AgendaDataItem[];
  originData: AgendaDataItem[];
  editField: 'inEdit';
  setData: (dispatch: Dispatch, data: AgendaDataItem[]) => void;
  onItemEdit: (dispatch: Dispatch, dataItem: AgendaDataItem) => void;
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: AgendaDataItem) => void;
  onItemRemove: (dispatch: Dispatch, dataItem: AgendaDataItem) => void;
  onCancelEdit: (dispatch: Dispatch, dataItem: AgendaDataItem) => void;
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => void;
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;
