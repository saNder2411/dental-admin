import { Dispatch } from 'redux';
// Types
import { ServicesDataItem } from './ServicesTypes';
// ActionCreators
import { fetchDataInitAsyncAC, createDataItemInitAsyncAC, updateDataItemInitAsyncAC, deleteDataItemInitAsyncAC } from './ServicesAC';

export const ServicesActions = {
  fetchData: (dispatch: Dispatch) => dispatch(fetchDataInitAsyncAC()),
  createDataItem: (dispatch: Dispatch, createdDataItem: ServicesDataItem, onAddDataItemToGRidData: () => void) =>
    dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGRidData)),
  updateDataItem: (dispatch: Dispatch, updatedDataItem: ServicesDataItem, onUpdateDataItemInGridData: () => void) =>
    dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
    dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
};
