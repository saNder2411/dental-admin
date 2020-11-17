import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectStaffMemoActions, selectStaffMemoData, selectStaffIsDataLoading } from '../TeamStaffSelectors';

export const useTeamStaffStateForDomain = () => {
  const selectStaffData = useMemo(selectStaffMemoData, []);
  const selectStaffActions = useMemo(selectStaffMemoActions, []);

  const staffData = useSelector(selectStaffData);
  const staffIsDataLoading = useSelector(selectStaffIsDataLoading);
  const StaffActions = useSelector(selectStaffActions);

  return { staffData, staffIsDataLoading, StaffActions };
};
