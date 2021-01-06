import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalCustomersData, selectDataIsLoading } from '../../_sections/Grid/GridSelectors';

export const useSelectCustomersData = () => {
  const selectCustomersData = useMemo(selectMemoOriginalCustomersData, []);

  const customersData = useSelector(selectCustomersData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { customersData, isDataLoading };
};
