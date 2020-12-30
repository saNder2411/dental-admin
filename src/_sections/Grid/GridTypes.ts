import { Dispatch } from 'redux';
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { AppointmentDataItem } from '../../Agenda';
import { TeamStaffDataItem } from '../../TeamStaff';
import { CustomerDataItem } from '../../Customers';
import { ServiceDataItem } from '../../Services';
// Actions
import * as actions from './GridAC';

export const ActionTypes = {
  SET_DATA: 'GRID/SET_DATA' as const,
  SET_DATA_NAME_DEFAULT: 'GRID/SET_DATA_NAME_DEFAULT' as const,
  DATA_ITEM_FETCHING: 'GRID/DATA_ITEM_FETCHING' as const,
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

export type GridDataItem = InferValueTypes<{ type1: AppointmentDataItem; type2: TeamStaffDataItem; type3: CustomerDataItem; type4: ServiceDataItem }>;

export enum GridDataName {
  Default = 'Empty',
  Agenda = 'Agenda',
  TeamStaff = 'TeamStaff',
  Customers = 'Customers',
  Services = 'Services',
}

export interface DomainStateActionsType<T> {
  fetchData: (dispatch: Dispatch, meta?: { servicesDataLength: number; teamStaffDataLength: number; customersDataLength: number }) => void;
  createDataItem: (dispatch: Dispatch, createdDataItem: T, onAddDataItemToGridData: () => void) => void;
  updateDataItem: (dispatch: Dispatch, updatedDataItem: T, onUpdateDataItemInGridData: () => void) => void;
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) => void;
}

export interface GridStateActions {
  setData: (dispatch: Dispatch, data: GridDataItem[]) => void;
  setDataNameDefault: (dispatch: Dispatch) => void;
  setIsGridDataItemLoading: (dispatch: Dispatch, isLoading: boolean) => void;
  onItemEdit: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onItemRemove: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onCancelEdit: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => void;
  onAddNewItem: (dispatch: Dispatch) => void;
  onAddNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => void;
  onDiscardNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => void;
}

export interface GridState {
  originalData: GridDataItem[];
  eventDrivenData: GridDataItem[];
  originalNormalizeData: { [key: string]: GridDataItem };
  normalizedData: { [key: string]: GridDataItem };
  allIDs: number[];
  dataName: GridDataName;
  isDataItemLoading: boolean;
  editField: 'inEdit';
  titleForAddNewItemSection: string;
}

export type DomainsStateActions = InferValueTypes<{
  type1: DomainStateActionsType<ServiceDataItem>;
  type2: DomainStateActionsType<TeamStaffDataItem>;
  type3: DomainStateActionsType<CustomerDataItem>;
  type4: DomainStateActionsType<AppointmentDataItem>;
}>;
