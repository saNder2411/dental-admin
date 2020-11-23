import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';

export const useActionMetaForCustomersFetchData = () => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  return teamStaffData.length;
};
