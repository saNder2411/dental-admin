import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Selectors
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';
// Actions
import { SchedulerActions } from '../../_sections/Scheduler/SchedulerActions';

export const useTeamStaffDataForScheduler = () => {
  const dispatch = useDispatch();
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamData = useSelector(selectTeamStaffData);
  const mapTeamToFiltered: { [key: string]: boolean } = teamData.reduce((prevVal, employee) => ({ ...prevVal, [employee.ID]: true }), {});
  SchedulerActions.setMapTeamToFiltered(dispatch, mapTeamToFiltered);

  return { teamData, mapTeamToFiltered };
};
