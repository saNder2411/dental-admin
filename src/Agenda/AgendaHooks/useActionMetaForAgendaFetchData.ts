import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectServicesMemoData } from '../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';

export const useActionMetaForAgendaFetchData = () => {
  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  return { servicesDataLength: servicesData.length, teamStaffDataLength: teamStaffData.length };
};
