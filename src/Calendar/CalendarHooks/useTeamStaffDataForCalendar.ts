import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalStaffData } from '../../_sections/Grid/GridSelectors';
import { selectMemoMapTeamToFiltered } from '../../_sections/Scheduler/SchedulerSelectors';

export const useTeamStaffDataForScheduler = () => {
  const selectStaffData = useMemo(selectMemoOriginalStaffData, []);
  const staffData = useSelector(selectStaffData);

  const selectSchedulerMapTeamToFiltered = useMemo(selectMemoMapTeamToFiltered, []);
  const mapTeamToFiltered = useSelector(selectSchedulerMapTeamToFiltered);

  return { staffData, mapTeamToFiltered };
};
