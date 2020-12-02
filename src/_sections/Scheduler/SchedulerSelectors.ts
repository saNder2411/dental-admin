import { createSelector } from 'reselect';
import { GlobalState } from '../../_init';

const selectSchedulerEventDrivenData = ({ SchedulerState }: GlobalState) => SchedulerState.eventDrivenData;

const selectSchedulerOriginalData = ({ SchedulerState }: GlobalState) => SchedulerState.originalData;

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

export const selectFormItem = (dataItemID: number) => {
  // console.log(`render ${dataItemID}`);
  return createSelector(
    ({ SchedulerState: { formItemID } }: GlobalState) => formItemID,
    (formItemID) => (formItemID === dataItemID ? formItemID : null)
  );
};
