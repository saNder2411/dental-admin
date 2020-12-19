import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';
import { selectMemoMapTeamToFiltered } from '../../_sections/Scheduler/SchedulerSelectors';

export const useTeamStaffDataForScheduler = () => {
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamData = useSelector(selectTeamStaffData);

  const selectSchedulerMapTeamToFiltered = useMemo(selectMemoMapTeamToFiltered, []);
  const mapTeamToFiltered = useSelector(selectSchedulerMapTeamToFiltered);

  return { teamData, mapTeamToFiltered };
};
