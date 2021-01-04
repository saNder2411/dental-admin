import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';
import { GridDataItem } from '../Grid/GridTypes';

const selectViewOriginalData = ({ GridState }: GlobalState) => GridState.viewOriginalData;

const selectByIdData = ({ GridState }: GlobalState) => GridState.byId;

const selectProcessByIdData = ({ GridState }: GlobalState) => GridState.processById;

export const selectDataName = ({ GridState }: GlobalState) => GridState.dataName;

export const selectLabelForAddNewItemBtn = ({ GridState }: GlobalState) => GridState.labelForAddNewItemBtn;

export const selectDataItemIsLoading = ({ GridState }: GlobalState) => GridState.isDataItemLoading;

export const selectMemoViewOriginalData = () => createSelector(selectViewOriginalData, (viewOriginalData) => viewOriginalData);

export const selectMemoProcessDataItem = <T extends GridDataItem = GridDataItem>(ID: number) =>
  createSelector(selectProcessByIdData, (processById): T => processById[ID] as T);

export const selectGridDataItemMemoValueForCell = <T>(ID: number, field: keyof T) =>
  createSelector(
    ({ GridState }: GlobalState) => ((GridState.eventDrivenData.find((dataItem) => dataItem.ID === ID) as unknown) as T)[field],
    (value) => value
  );

export const selectByIdDataItemFieldValue = <T extends GridDataItem = GridDataItem, U extends unknown = any>(ID: number, field: keyof T) =>
  createSelector(selectByIdData, (byId): U => byId[ID][field as keyof GridDataItem] as U);

export const selectProcessDataItemFieldValue = <T extends GridDataItem = GridDataItem, U extends unknown = any>(ID: number, field: keyof T) =>
  createSelector(selectProcessByIdData, (processById): U => processById[ID][field as keyof GridDataItem] as U);
