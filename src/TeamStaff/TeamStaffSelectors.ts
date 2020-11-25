import { createSelector } from 'reselect';
// Types
import { GlobalState } from '../_init';

const selectTeamStaffData = ({ TeamStaffState }: GlobalState) => TeamStaffState.data;

export const selectTeamStaffIsDataLoading = ({ TeamStaffState }: GlobalState) => TeamStaffState.isDataLoading;

export const selectTeamStaffMemoData = () => createSelector(selectTeamStaffData, (data) => data);
