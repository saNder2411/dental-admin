import { createSelector } from 'reselect';
import { GlobalState } from '../../_init';

const selectSchedulerEventDrivenData = ({ SchedulerState }: GlobalState) => SchedulerState.eventDrivenData;

const selectSchedulerOriginalData = ({ SchedulerState }: GlobalState) => SchedulerState.originalData;

export const selectSchedulerFormItemID = ({ SchedulerState }: GlobalState) => SchedulerState.formItemID;

export const selectSchedulerMemoEventDrivenData = () => createSelector(selectSchedulerEventDrivenData, (eventDrivenData) => eventDrivenData);

export const selectSchedulerMemoOriginalData = () => createSelector(selectSchedulerOriginalData, (originalData) => originalData);

export const selectSchedulerMemoMapTeamToFiltered = () =>
  createSelector(
    ({ SchedulerState }: GlobalState) => SchedulerState.mapTeamToFiltered,
    (mapTeamToFiltered) => mapTeamToFiltered
  );

const selectNewFormItem = ({ SchedulerState }: GlobalState) => SchedulerState.newFormItem;

export const selectMemoFormItemForSlot = (start: Date, TeamID: number) => {
  return createSelector(selectNewFormItem, (newFormItem) => {
    if (!newFormItem) return null;

    return newFormItem?.Start.getTime() === start.getTime() && newFormItem.TeamID === TeamID ? newFormItem : null;
  });
};
