import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';

const selectEventDrivenData = ({ SchedulerState }: GlobalState) => SchedulerState.eventDrivenData;

const selectOriginalData = ({ SchedulerState }: GlobalState) => SchedulerState.originalData;

export const selectFormItemID = ({ SchedulerState }: GlobalState) => SchedulerState.formItemID;

export const selectMemoEventDrivenData = () => createSelector(selectEventDrivenData, (eventDrivenData) => eventDrivenData);

export const selectMemoOriginalData = () => createSelector(selectOriginalData, (originalData) => originalData);

const selectTeamToFiltered = ({ SchedulerState }: GlobalState) => SchedulerState.mapTeamToFiltered;

export const selectMemoMapTeamToFiltered = () => createSelector(selectTeamToFiltered, (mapTeamToFiltered) => mapTeamToFiltered);

const selectNewDataItem = ({ SchedulerState }: GlobalState) => SchedulerState.newDataItem;

export const selectMemoNewDataItem = (start: Date, TeamID: number) => {
  return createSelector(selectNewDataItem, (newDataItem) => {
    if (!newDataItem) return null;

    return newDataItem?.Start.getTime() === start.getTime() && newDataItem.TeamID === TeamID ? newDataItem : null;
  });
};

export const selectSelectedDate = ({ SchedulerState }: GlobalState) => SchedulerState.selectedDate;

export const selectSelectedView = ({ SchedulerState }: GlobalState) => SchedulerState.selectedView;
