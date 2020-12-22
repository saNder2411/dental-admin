import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';

const selectData = ({ SchedulerState }: GlobalState) => SchedulerState.data;

export const selectMemoData = () => createSelector(selectData, (originalData) => originalData);

const selectTeamToFiltered = ({ SchedulerState }: GlobalState) => SchedulerState.mapTeamToFiltered;

export const selectMemoMapTeamToFiltered = () => createSelector(selectTeamToFiltered, (mapTeamToFiltered) => mapTeamToFiltered);

export const selectFormItemID = ({ SchedulerState }: GlobalState) => SchedulerState.formItemID;

export const selectMemoOriginalDataItem = (dataItemID: number) => createSelector(selectData, (data) => data.find(({ ID }) => ID === dataItemID));

const selectNewDataItem = ({ SchedulerState }: GlobalState) => SchedulerState.newDataItem;

export const selectMemoNewDataItem = (start: Date, TeamID: number) => {
  return createSelector(selectNewDataItem, (newDataItem) => {
    if (!newDataItem) return null;

    return newDataItem?.Start.getTime() === start.getTime() && newDataItem.TeamID === TeamID ? newDataItem : null;
  });
};

export const selectSelectedDate = ({ SchedulerState }: GlobalState) => SchedulerState.selectedDate;

export const selectSelectedView = ({ SchedulerState }: GlobalState) => SchedulerState.selectedView;

export const selectUpdatedRecurringDataItem = ({ SchedulerState }: GlobalState) => SchedulerState.updatedRecurringDataItem;

export const selectMemoUpdatedRecurringDataItem = () =>
  createSelector(selectUpdatedRecurringDataItem, (updatedRecurringDataItem) => updatedRecurringDataItem);
