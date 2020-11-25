import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectCustomersMemoData, selectCustomersIsDataLoading } from '../CustomersSelectors';

export const useCustomersStateForDomain = () => {
  const selectCustomersData = useMemo(selectCustomersMemoData, []);

  const customersData = useSelector(selectCustomersData);
  const customersIsDataLoading = useSelector(selectCustomersIsDataLoading);

  return { customersData, customersIsDataLoading };
};
