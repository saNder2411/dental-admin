import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';
import { AgendaDataItem } from '../../Agenda';
// import { GridDataItem } from './GridTypes';

const selectGridData = ({ GridState }: GlobalState) => GridState.data;

const selectGridOriginalData = ({ GridState }: GlobalState) => GridState.originalData;

export const selectGridDataName = ({ GridState }: GlobalState) => GridState.dataName;

export const selectGridEditField = ({ GridState }: GlobalState) => GridState.editField;

export const selectGridTitleForAddNewItemSection = ({ GridState }: GlobalState) => GridState.titleForAddNewItemSection;

export const selectGridDataItemIsLoading = ({ GridState }: GlobalState) => GridState.isDataItemLoading;

export const selectGridMemoData = () => createSelector(selectGridData, (data) => data);

export const selectGridMemoOriginalData = () => createSelector(selectGridOriginalData, (originalData) => originalData);

export const selectGridMemoDataItem = (ID: number) => createSelector(selectGridData, (data) => data.find((dataItem) => dataItem.ID === ID));

export const selectGridMemoCellValueForAgenda = (ID: number, field: keyof AgendaDataItem) => createSelector(selectGridData, (data) => data.find((dataItem) => dataItem.ID === ID));
