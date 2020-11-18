import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectTeamStaffData = ({ TeamStaffState }: GlobalState) => TeamStaffState.data;

const selectTeamStaffActions = ({ TeamStaffState }: GlobalState) => TeamStaffState.actions;

export const selectTeamStaffIsDataLoading = ({ TeamStaffState }: GlobalState) => TeamStaffState.isDataLoading;

export const selectTeamStaffMemoData = () => createSelector(selectTeamStaffData, (data) => data);

export const selectTeamStaffMemoActions = () => createSelector(selectTeamStaffActions, (actions) => actions);

export const selectTeamStaffMemoLastNameList = () =>
  createSelector(selectTeamStaffData, (data) => data.map(({ FullName }) => FullName.split(' ').slice(-1)[0]));
