import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { AgendaDataItem, AgendaDataItemKeys, AgendaDataItemValues } from '../../Agenda';
import { TeamStaffDataItem, TeamStaffDataItemKeys, TeamStaffDataItemValues } from '../../TeamStaff';
import { CustomersDataItem, CustomersDataItemKeys, CustomersDataItemValues } from '../../Customers';
import { ServicesDataItem, ServicesDataItemKeys, ServicesDataItemValues } from '../../Services';
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

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type GridDataItem = InferValueTypes<{ type1: AgendaDataItem; type2: TeamStaffDataItem; type3: CustomersDataItem; type4: ServicesDataItem }>;

export type GridDataItemKeys = InferValueTypes<{
  type1: AgendaDataItemKeys;
  type2: TeamStaffDataItemKeys;
  type3: CustomersDataItemKeys;
  type4: ServicesDataItemKeys;
}>;

export type GridDataItemValues = InferValueTypes<{
  type1: AgendaDataItemValues;
  type2: TeamStaffDataItemValues;
  type3: CustomersDataItemValues;
  type4: ServicesDataItemValues;
}>;

export type GridDataItemDynamicIndex = {[key in GridDataItemKeys]: GridDataItemValues}

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
