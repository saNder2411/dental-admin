import { createSelector } from 'reselect';
import { GlobalState } from '../../_init';

export const selectSchedulerState = ({ SchedulerState }: GlobalState) => SchedulerState;

export const selectFormItem = (dataItemID: number) => {
  console.log(`render ${dataItemID}`)
  return createSelector([({ SchedulerState: { formItemID } }: GlobalState) => formItemID], (formItemID) =>
  formItemID === dataItemID ? formItemID : null
  );
};
