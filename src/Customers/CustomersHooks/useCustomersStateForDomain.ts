import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectCustomersMemoActions, selectCustomersMemoData, selectCustomersIsDataLoading } from '../CustomersSelectors';

export const useCustomersStateForDomain = () => {
  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const selectCustomersActions = useMemo(selectCustomersMemoActions, []);

  const customersData = useSelector(selectCustomersData);
  const customersIsDataLoading = useSelector(selectCustomersIsDataLoading);
  const CustomersActions = useSelector(selectCustomersActions);

  return { customersData, customersIsDataLoading, CustomersActions };
};
