import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../../_init';

export const selectMapTeamToFiltered = ({ Scheduler }: GlobalState) => Scheduler.mapTeamToFiltered;

export const selectFormItemID = ({ Scheduler }: GlobalState) => Scheduler.formItemID;

export const selectSelectedDate = ({ Scheduler }: GlobalState) => Scheduler.selectedDate;

export const selectSelectedView = ({ Scheduler }: GlobalState) => Scheduler.selectedView;

export const selectUpdatableRecurringDataItem = ({ Scheduler }: GlobalState) => Scheduler.updatableRecurringDataItem;

export const selectMemoUpdatableRecurringDataItem = () =>
  createSelector(selectUpdatableRecurringDataItem, (updatableRecurringDataItem) => updatableRecurringDataItem);
