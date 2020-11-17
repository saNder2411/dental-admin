import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectStaffData = ({ TeamStaffState }: GlobalState) => TeamStaffState.data;

const selectStaffActions = ({ TeamStaffState }: GlobalState) => TeamStaffState.actions;

export const selectStaffIsDataLoading = ({ TeamStaffState }: GlobalState) => TeamStaffState.isDataLoading;

export const selectStaffMemoData = () => createSelector(selectStaffData, (data) => data);

export const selectStaffMemoActions = () => createSelector(selectStaffActions, (actions) => actions);

export const selectStaffMemoLastNameList = () =>
  createSelector(selectStaffData, (data) => data.map(({ FullName }) => FullName.split(' ').slice(-1)[0]));
