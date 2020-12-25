import { Dispatch } from 'redux';
// Types
import { CustomerDataItem } from './CustomersTypes';
// Actions
import {
  fetchDataInitAsyncAC,
  createDataItemInitAsyncAC,
  updateDataItemInitAsyncAC,
  deleteDataItemInitAsyncAC,
  validateMobilePhoneFieldAC,
} from './CustomersAC';

export const CustomersActions = {
  fetchData: (dispatch: Dispatch, meta?: { servicesDataLength: number; teamStaffDataLength: number; customersDataLength: number }) =>
    dispatch(fetchDataInitAsyncAC({ teamStaffDataLength: meta?.teamStaffDataLength ?? 0 })),
  createDataItem: (dispatch: Dispatch, createdDataItem: CustomerDataItem, onAddDataItemToGridData: () => void) =>
    dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGridData)),
  updateDataItem: (dispatch: Dispatch, updatedDataItem: CustomerDataItem, onUpdateDataItemInGridData: () => void) =>
    dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
    dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
};

export const CustomersEditCellsActions = {
  validateMobilePhoneField: (dispatch: Dispatch, isValid: boolean) => dispatch(validateMobilePhoneFieldAC(isValid)),
};
