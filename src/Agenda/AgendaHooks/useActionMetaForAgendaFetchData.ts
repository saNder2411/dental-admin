import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectServicesMemoData } from '../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../TeamStaff/TeamStaffSelectors';
import {selectCustomersMemoData} from '../../Customers/CustomersSelectors';

export const useActionMetaForAgendaFetchData = () => {
  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const customersData = useSelector(selectCustomersData);

  return { servicesDataLength: servicesData.length, teamStaffDataLength: teamStaffData.length, customersDataLength: customersData.length };
};
