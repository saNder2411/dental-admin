import { Dispatch } from 'redux';
// Types
import { GridDataItem } from './GridTypes';
import { GridStateActions, GridDataName } from './GridTypes';
// ActionCreators
import {
  changeViewOriginalDataAC,
  changeDataNameAC,
  addItemToEditAC,
  updateItemAfterEditAC,
  removeItemFromDataAC,
  cancelEditAC,
  changeItemAC,
  addNewItemToEditAC,
  addNewItemToDataAC,
  discardAddNewItemToDataAC,
} from './GridAC';

export const GridActions: GridStateActions = {
  changeViewOriginalData: (dispatch: Dispatch, data: GridDataItem[]) => dispatch(changeViewOriginalDataAC(data)),
  changeDataName: (dispatch: Dispatch, dataName: GridDataName) => dispatch(changeDataNameAC(dataName)),
  onItemEdit: (dispatch: Dispatch, dataItemID: number) => dispatch(addItemToEditAC(dataItemID)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: GridDataItem) => dispatch(updateItemAfterEditAC(dataItem)),
  onItemRemove: (dispatch: Dispatch, dataItemID: number) => dispatch(removeItemFromDataAC(dataItemID)),
  onCancelEdit: (dispatch: Dispatch, dataItemID: number) => dispatch(cancelEditAC(dataItemID)),
  onItemChange: (dispatch: Dispatch) => (evt: any) => dispatch(changeItemAC(evt)),
  onAddNewItem: (dispatch: Dispatch) => dispatch(addNewItemToEditAC()),
  onAddNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => dispatch(addNewItemToDataAC(dataItem)),
  onDiscardNewItemToData: (dispatch: Dispatch, dataItemID: number) => dispatch(discardAddNewItemToDataAC(dataItemID)),
};
