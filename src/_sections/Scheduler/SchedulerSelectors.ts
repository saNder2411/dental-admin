import { createSelector } from 'reselect';
import { GlobalState } from '../../_init';

export const selectSchedulerState = ({ SchedulerState }: GlobalState) => SchedulerState;

export const selectFormItem = (dataItemID: number) =>
  createSelector([({ SchedulerState: { formItem } }: GlobalState) => formItem], (formItem) => (formItem?.orderID === dataItemID ? formItem : null));
