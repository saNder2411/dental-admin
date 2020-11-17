import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';

const selectGridData = ({ GridState }: GlobalState) => GridState.data;

export const selectGridDataName = ({ GridState }: GlobalState) => GridState.dataName;

export const selectGridEditField = ({ GridState }: GlobalState) => GridState.editField;

export const selectGridTitleForAddNewItemSection = ({ GridState }: GlobalState) => GridState.titleForAddNewItemSection;

const selectGridActions = ({ GridState }: GlobalState) => GridState.actions;

export const selectGridDataItemIsLoading = ({ GridState }: GlobalState) => GridState.isDataItemLoading;

export const selectGridMemoData = () => createSelector(selectGridData, (data) => data);

export const selectGridMemoActions = () => createSelector(selectGridActions, (actions) => actions);
