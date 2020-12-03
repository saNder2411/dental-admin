import { createSelector } from 'reselect';
import { GlobalState } from '../../_init';

const selectSchedulerEventDrivenData = ({ SchedulerState }: GlobalState) => SchedulerState.eventDrivenData;

const selectSchedulerOriginalData = ({ SchedulerState }: GlobalState) => SchedulerState.originalData;

const selectSchedulerFormItemID = ({ SchedulerState: { formItemID } }: GlobalState) => formItemID;

export const selectSchedulerDataItemIsLoading = ({ SchedulerState }: GlobalState) => SchedulerState.isDataItemLoading;

export const selectSchedulerMemoEventDrivenData = () => createSelector(selectSchedulerEventDrivenData, (eventDrivenData) => eventDrivenData);

export const selectSchedulerMemoOriginalData = () => createSelector(selectSchedulerOriginalData, (originalData) => originalData);

export const selectSchedulerMemoDataItem = <T>(ID: number) =>
  createSelector(selectSchedulerEventDrivenData, (data) => (data.find((dataItem) => dataItem.ID === ID) as unknown) as T);

export const selectSchedulerMemoMapTeamToFiltered = () =>
  createSelector(
    ({ SchedulerState }: GlobalState) => SchedulerState.mapTeamToFiltered,
    (mapTeamToFiltered) => mapTeamToFiltered
  );

export const selectMemoFormItemID = (dataItemID: number) => {
  // console.log(`render ${dataItemID}`);
  return createSelector(selectSchedulerFormItemID, (formItemID) => (formItemID === dataItemID ? formItemID : null));
};

export const selectMemoFormItemForSlot = (start: Date, TeamID: number) => {
  return createSelector(selectSchedulerFormItemID, selectSchedulerEventDrivenData, (formItemID, eventDrivenData) => {
    if (!formItemID) return null;

    const formItem = eventDrivenData.find(({ ID }) => ID === formItemID);

    return formItem?.Start.getTime() === start.getTime() && formItem.TeamID === TeamID && formItem.isNew ? formItem : null;
  });
};
