import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';
// import { AgendaDataItem } from '../../Agenda';
// import { GridDataItem } from './GridTypes';

const selectGridEventDrivenData = ({ GridState }: GlobalState) => GridState.eventDrivenData;

const selectGridOriginalData = ({ GridState }: GlobalState) => GridState.originalData;

export const selectGridDataName = ({ GridState }: GlobalState) => GridState.dataName;

export const selectGridEditField = ({ GridState }: GlobalState) => GridState.editField;

export const selectGridTitleForAddNewItemSection = ({ GridState }: GlobalState) => GridState.titleForAddNewItemSection;

export const selectGridDataItemIsLoading = ({ GridState }: GlobalState) => GridState.isDataItemLoading;

export const selectGridMemoEventDrivenData = () => createSelector(selectGridEventDrivenData, (data) => data);

export const selectGridMemoOriginalData = () => createSelector(selectGridOriginalData, (originalData) => originalData);

export const selectGridMemoDataItem = <T>(ID: number) =>
  createSelector(selectGridEventDrivenData, (data) => (data.find((dataItem) => dataItem.ID === ID) as unknown as T));

export const selectGridDataItemMemoValueForCell = <T>(ID: number, field: keyof T) =>
  createSelector(
    ({ GridState }: GlobalState) => (GridState.eventDrivenData.find((dataItem) => dataItem.ID === ID) as unknown as T)[field],
    (value) => value
  );
