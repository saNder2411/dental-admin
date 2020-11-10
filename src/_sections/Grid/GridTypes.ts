import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { AgendaDataItem } from '../../Agenda';
import { TeamStaffDataItem } from '../../TeamStaff';
import { CustomersDataItem } from '../../Customers';
import { ServicesDataItem } from '../../Services';
// Actions
import * as actions from './GridAC';

export const ActionTypes = {
  SET_DATA: 'GRID/SET_DATA' as const,
  ADD_ITEM_TO_EDIT: 'GRID/ADD_ITEM_TO_EDIT' as const,
  UPDATE_ITEM_AFTER_EDIT: 'GRID/UPDATE_ITEM_AFTER_EDIT' as const,
  REMOVE_ITEM_FROM_DATA: 'GRID/REMOVE_ITEM_FROM_DATA' as const,
  CANCEL_EDIT: 'GRID/CANCEL_EDIT' as const,
  CHANGE_ITEM: 'GRID/CHANGE_ITEM' as const,
  ADD_NEW_ITEM_TO_EDIT: 'GRID/ADD_NEW_ITEM_TO_EDIT' as const,
  ADD_NEW_ITEM_TO_DATA: 'GRID/ADD_NEW_ITEM_TO_DATA' as const,
  DISCARD_ADD_NEW_ITEM_TO_DATA: 'GRID/DISCARD_ADD_NEW_ITEM_TO_DATA' as const,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type GridDataItem = InferValueTypes<{ type1: AgendaDataItem; type2: TeamStaffDataItem; type3: CustomersDataItem; type4: ServicesDataItem }>;

export enum GridDataName {
  Default = 'Empty',
  Agenda = 'Agenda',
  TeamStaff = 'TeamStaff',
  Customers = 'Customers',
  Services = 'Services',
}

export interface GridState {
  data: GridDataItem[];
  originData: GridDataItem[];
  dataName: GridDataName;
  editField: 'inEdit';
  titleForAddNewItemSection: string;
  setData: (dispatch: Dispatch, data: GridDataItem[]) => void;
  onItemEdit: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onItemRemove: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onCancelEdit: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => void;
  onAddNewItem: (dispatch: Dispatch) => void;
  onAddNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onDiscardNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => void;
}
