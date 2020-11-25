import { Dispatch } from 'redux';
// Types
import { AgendaDataItem } from './AgendaTypes';
// ActionCreators
import { fetchDataInitAsyncAC, createDataItemInitAsyncAC, updateDataItemInitAsyncAC, deleteDataItemInitAsyncAC } from './AgendaAC';

export const AgendaActions = {
  fetchData: (dispatch: Dispatch, meta?: { servicesDataLength: number; teamStaffDataLength: number; customersDataLength: number }) =>
    dispatch(fetchDataInitAsyncAC(meta ?? { servicesDataLength: 0, teamStaffDataLength: 0, customersDataLength: 0 })),
  createDataItem: (dispatch: Dispatch, createdDataItem: AgendaDataItem, onAddDataItemToGridData: () => void) =>
    dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGridData)),
  updateDataItem: (dispatch: Dispatch, updatedDataItem: AgendaDataItem, onUpdateDataItemInGridData: () => void) =>
    dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
    dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
};
