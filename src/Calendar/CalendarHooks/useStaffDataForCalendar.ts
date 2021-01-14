import { useSelector } from 'react-redux';
// Selectors
import { selectOriginalStaffData } from '../../_bus/Entities/EntitiesSelectors';
import { selectMapTeamToFiltered } from '../../_bus/Scheduler/SchedulerSelectors';

export const useStaffDataForScheduler = () => {
  const staffData = useSelector(selectOriginalStaffData);
  const mapTeamToFiltered = useSelector(selectMapTeamToFiltered);

  return { staffData, mapTeamToFiltered };
};
