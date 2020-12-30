import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';
import { GridDataItem } from '../Grid/GridTypes';

const selectGridOriginalData = ({ GridState }: GlobalState) => GridState.originalData;

const selectGridOriginalObjectData = ({ GridState }: GlobalState) => GridState.originalObjectData;

const selectGridProcessData = ({ GridState }: GlobalState) => GridState.processData;

export const selectGridDataName = ({ GridState }: GlobalState) => GridState.dataName;

export const selectGridEditField = ({ GridState }: GlobalState) => GridState.editField;

export const selectGridTitleForAddNewItemSection = ({ GridState }: GlobalState) => GridState.titleForAddNewItemSection;

export const selectGridDataItemIsLoading = ({ GridState }: GlobalState) => GridState.isDataItemLoading;

export const selectGridMemoOriginalData = () => createSelector(selectGridOriginalData, (originalData) => originalData);

export const selectGridMemoDataItem = <T extends GridDataItem = GridDataItem>(ID: number) =>
  createSelector(selectGridProcessData, (processData): T => processData[ID] as T);

export const selectGridDataItemMemoValueForCell = <T>(ID: number, field: keyof T) =>
  createSelector(
    ({ GridState }: GlobalState) => ((GridState.eventDrivenData.find((dataItem) => dataItem.ID === ID) as unknown) as T)[field],
    (value) => value
  );

export const selectOriginalDataItemFieldValue = <T extends GridDataItem = GridDataItem>(ID: number, field: keyof T) =>
  createSelector(selectGridOriginalObjectData, (originalObjectData) => originalObjectData[ID][field as keyof GridDataItem]);

export const selectProcessDataItemFieldValue = <T extends GridDataItem = GridDataItem>(ID: number, field: keyof T) =>
  createSelector(selectGridProcessData, (processData) => processData[ID][field as keyof GridDataItem]);
