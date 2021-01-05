import { Dispatch } from 'redux';
// Types
import { StaffDataItem } from './TeamStaffTypes';
// ActionCreators
import {
  fetchDataInitAsyncAC,
  createDataItemInitAsyncAC,
  updateDataItemInitAsyncAC,
  deleteDataItemInitAsyncAC,
  validateFullNameFieldAC,
  validateJobTitleFieldAC,
  validateMobilePhoneFieldAC,
} from './TeamStaffAC';

export const TeamStaffActions = {
  fetchData: (dispatch: Dispatch) => dispatch(fetchDataInitAsyncAC()),
  createDataItem: (dispatch: Dispatch, createdDataItem: StaffDataItem, onAddDataItemToGridData: () => void) =>
    dispatch(createDataItemInitAsyncAC(createdDataItem, onAddDataItemToGridData)),
  updateDataItem: (dispatch: Dispatch, updatedDataItem: StaffDataItem, onUpdateDataItemInGridData: () => void) =>
    dispatch(updateDataItemInitAsyncAC(updatedDataItem, onUpdateDataItemInGridData)),
  deleteDataItem: (dispatch: Dispatch, deletedDataItemID: number, onDeleteDataItemInGridData: () => void) =>
    dispatch(deleteDataItemInitAsyncAC(deletedDataItemID, onDeleteDataItemInGridData)),
};

export const TeamStaffEditCellsActions = {
  validateFullNameField: (dispatch: Dispatch, isValid: boolean) => dispatch(validateFullNameFieldAC(isValid)),
  validateJobTitleField: (dispatch: Dispatch, isValid: boolean) => dispatch(validateJobTitleFieldAC(isValid)),
  validateMobilePhoneField: (dispatch: Dispatch, isValid: boolean) => dispatch(validateMobilePhoneFieldAC(isValid)),
};
