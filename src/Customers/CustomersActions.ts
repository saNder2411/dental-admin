import { Dispatch } from 'redux';
// Types
import { CustomersDataItem } from './CustomersTypes';
// Actions
import { fetchDataInitAsyncAC, createDataItemInitAsyncAC, updateDataItemInitAsyncAC, deleteDataItemInitAsyncAC } from './CustomersAC';

export const CustomersActions = {
  fetchData: (dispatch: Dispatch, meta?: { servicesDataLength: number; teamStaffDataLength: number; customersDataLength: number }) =>
    dispatch(fetchDataInitAsyncAC({ teamStaffDataLength: meta?.teamStaffDataLength ?? 0 })),
  createDataItem: (dispatch: Dispatch, createdDataItem: CustomersDataItem, onAddDataItemToGridData: () => void) =>
    dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGridData)),
  updateDataItem: (dispatch: Dispatch, updatedDataItem: CustomersDataItem, onUpdateDataItemInGridData: () => void) =>
    dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
    dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
};
