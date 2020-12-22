import { Dispatch } from 'redux';
// Types
import { AgendaDataItem } from './AgendaTypes';
// ActionCreators
import {
  fetchDataInitAsyncAC,
  createDataItemInitAsyncAC,
  updateDataItemInitAsyncAC,
  deleteDataItemInitAsyncAC,
  validateStartDateEventAC,
  validateEndDateEventAC,
  validateFullNameValueAC,
  updateRecurringDataItemInitAsyncAC,
} from './AgendaAC';

export const AgendaActions = {
  fetchData: (dispatch: Dispatch, meta?: { servicesDataLength: number; teamStaffDataLength: number; customersDataLength: number }) =>
    dispatch(fetchDataInitAsyncAC(meta ?? { servicesDataLength: 0, teamStaffDataLength: 0, customersDataLength: 0 })),
  createDataItem: (
    dispatch: Dispatch,
    createdDataItem: AgendaDataItem,
    onAddDataItemToGridData: () => void,
    onAddDataItemToSchedulerData?: () => void
  ) => dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGridData, onAddDataItemToSchedulerData)),
  updateDataItem: (dispatch: Dispatch, updatedDataItem: AgendaDataItem, onUpdateDataItemInGridData: () => void) =>
    dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
    dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
};

export const AgendaEditCellsActions = {
  validateStartDateEvent: (dispatch: Dispatch, isValid: boolean) => dispatch(validateStartDateEventAC(isValid)),
  validateEndDateEvent: (dispatch: Dispatch, isValid: boolean) => dispatch(validateEndDateEventAC(isValid)),
  validateFullNameValue: (dispatch: Dispatch, isValid: boolean) => dispatch(validateFullNameValueAC(isValid)),
};

export const AgendaSchedulerActions = {
  updateRecurringDataItem: (dispatch: Dispatch, updatedDataItem: AgendaDataItem, createDataItem: AgendaDataItem, onUpdateDataItem: () => void) =>
    dispatch(updateRecurringDataItemInitAsyncAC(updatedDataItem, createDataItem, onUpdateDataItem)),
};
