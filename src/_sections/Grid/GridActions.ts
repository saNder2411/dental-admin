import { Dispatch } from 'redux';
// Types
import { GridItemChangeEvent } from '@progress/kendo-react-grid';
import { GridDataItem } from './GridTypes';
import { GridStateActions } from './GridTypes';
// ActionCreators
import {
  setDataAC,
  addItemToEditAC,
  updateItemAfterEditAC,
  removeItemFromDataAC,
  cancelEditAC,
  changeItemAC,
  addNewItemToEditAC,
  addNewItemToDataAC,
  discardAddNewItemToDataAC,
  dataItemFetchingAC,
} from './GridAC';

export const GridActions: GridStateActions = {
  setData: (dispatch: Dispatch, data: GridDataItem[]) => dispatch(setDataAC(data)),
  setIsGridDataItemLoading: (dispatch: Dispatch, isLoading: boolean) => dispatch(dataItemFetchingAC(isLoading)),
  onItemEdit: (dispatch: Dispatch, { ID }: GridDataItem) => dispatch(addItemToEditAC(ID)),
  onItemUpdatedAfterEdit: (dispatch: Dispatch, dataItem: GridDataItem) => dispatch(updateItemAfterEditAC(dataItem)),
  onItemRemove: (dispatch: Dispatch, { ID }: GridDataItem) => dispatch(removeItemFromDataAC(ID)),
  onCancelEdit: (dispatch: Dispatch, { ID }: GridDataItem) => dispatch(cancelEditAC(ID)),
  onItemChange: (dispatch: Dispatch) => (evt: GridItemChangeEvent) => dispatch(changeItemAC(evt)),
  onAddNewItem: (dispatch: Dispatch) => dispatch(addNewItemToEditAC()),
  onAddNewItemToData: (dispatch: Dispatch, dataItem: GridDataItem) => dispatch(addNewItemToDataAC(dataItem)),
  onDiscardNewItemToData: (dispatch: Dispatch, { ID }: GridDataItem) => dispatch(discardAddNewItemToDataAC(ID)),
};
