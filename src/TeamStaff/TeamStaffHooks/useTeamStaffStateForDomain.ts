import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectTeamStaffMemoActions, selectTeamStaffMemoData, selectTeamStaffIsDataLoading } from '../TeamStaffSelectors';

export const useTeamStaffStateForDomain = () => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const selectTeamStaffActions = useMemo(selectTeamStaffMemoActions, []);

  const teamStaffData = useSelector(selectTeamStaffData);
  const teamStaffIsDataLoading = useSelector(selectTeamStaffIsDataLoading);
  const TeamStaffActions = useSelector(selectTeamStaffActions);

  return { teamStaffData, teamStaffIsDataLoading, TeamStaffActions };
};
