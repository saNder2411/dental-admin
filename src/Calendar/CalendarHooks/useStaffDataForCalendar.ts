import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalStaffData, selectMemoMapTeamToFiltered } from '../../_bus/Selectors';

export const useStaffDataForScheduler = () => {
  const selectStaffData = useMemo(selectMemoOriginalStaffData, []);
  const staffData = useSelector(selectStaffData);

  const selectSchedulerMapTeamToFiltered = useMemo(selectMemoMapTeamToFiltered, []);
  const mapTeamToFiltered = useSelector(selectSchedulerMapTeamToFiltered);

  return { staffData, mapTeamToFiltered };
};
