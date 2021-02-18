import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';

const getUpdatableRecurringDataItem = ({ Scheduler }: RootState) => Scheduler.updatableRecurringDataItem;

const getNewAppointmentDataItem = ({ Scheduler }: RootState) => Scheduler.newAppointmentDataItem;

export const selectMapTeamToFiltered = ({ Scheduler }: RootState) => Scheduler.mapTeamToFiltered;

export const selectSelectedDate = ({ Scheduler }: RootState) => Scheduler.selectedDate;

export const selectSelectedView = ({ Scheduler }: RootState) => Scheduler.selectedView;

export const selectMemoUpdatableRecurringDataItem = () =>
  createSelector(getUpdatableRecurringDataItem, (updatableRecurringDataItem) => updatableRecurringDataItem);

export const selectMemoNewAppointmentDataItemForSlot = (start: Date, TeamID: number) => {
  return createSelector(getNewAppointmentDataItem, (newAppointmentDataItem) => {
    if (!newAppointmentDataItem) return null;

    return newAppointmentDataItem?.Start.getTime() === start.getTime() && newAppointmentDataItem.TeamID === TeamID ? newAppointmentDataItem : null;
  });
};

export const selectMemoNewAppointmentDataItemForItem = () =>
  createSelector(getNewAppointmentDataItem, (newAppointmentDataItem) => newAppointmentDataItem);
