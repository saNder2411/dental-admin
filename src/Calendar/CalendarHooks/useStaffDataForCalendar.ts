import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectOriginalStaffData } from '../../_bus/Entities/EntitiesSelectors';
import { selectMemoMapTeamToFiltered } from '../../_bus/Scheduler/SchedulerSelectors';

export const useStaffDataForScheduler = () => {
  const staffData = useSelector(selectOriginalStaffData);

  const selectSchedulerMapTeamToFiltered = useMemo(selectMemoMapTeamToFiltered, []);
  const mapTeamToFiltered = useSelector(selectSchedulerMapTeamToFiltered);

  return { staffData, mapTeamToFiltered };
};
