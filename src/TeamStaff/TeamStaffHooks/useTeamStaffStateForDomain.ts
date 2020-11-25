import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectTeamStaffMemoData, selectTeamStaffIsDataLoading } from '../TeamStaffSelectors';

export const useTeamStaffStateForDomain = () => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);

  const teamStaffData = useSelector(selectTeamStaffData);
  const teamStaffIsDataLoading = useSelector(selectTeamStaffIsDataLoading);

  return { teamStaffData, teamStaffIsDataLoading };
};
