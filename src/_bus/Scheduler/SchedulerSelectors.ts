import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';

export const selectMapTeamToFiltered = ({ Scheduler }: GlobalState) => Scheduler.mapTeamToFiltered;

export const selectSelectedDate = ({ Scheduler }: GlobalState) => Scheduler.selectedDate;

export const selectSelectedView = ({ Scheduler }: GlobalState) => Scheduler.selectedView;

export const selectUpdatableRecurringDataItem = ({ Scheduler }: GlobalState) => Scheduler.updatableRecurringDataItem;

export const selectMemoUpdatableRecurringDataItem = () =>
  createSelector(selectUpdatableRecurringDataItem, (updatableRecurringDataItem) => updatableRecurringDataItem);

const selectNewAppointmentDataItem = ({ Scheduler }: GlobalState) => Scheduler.newAppointmentDataItem;

export const selectMemoNewAppointmentDataItem = (start: Date, TeamID: number) => {
  return createSelector(selectNewAppointmentDataItem, (newAppointmentDataItem) => {
    if (!newAppointmentDataItem) return null;

    return newAppointmentDataItem?.Start.getTime() === start.getTime() && newAppointmentDataItem.TeamID === TeamID ? newAppointmentDataItem : null;
  });
};
