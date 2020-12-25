import { useEffect } from 'react';
import { Dispatch } from 'redux';
// Types
import { DomainStateActionsType } from '../../_sections/Grid/GridTypes';
import { CustomerDataItem } from '../CustomersTypes';

export const useFetchCustomersData = (
  customersDataLength: number,
  teamStaffDataLength: number,
  CustomerActions: DomainStateActionsType<CustomerDataItem>,
  dispatch: Dispatch
) => {
  useEffect(() => {
    if (customersDataLength > 0) return;

    CustomerActions.fetchData(dispatch, { teamStaffDataLength, customersDataLength: 1, servicesDataLength: 1 });
  }, [dispatch, teamStaffDataLength, customersDataLength, CustomerActions]);
};
