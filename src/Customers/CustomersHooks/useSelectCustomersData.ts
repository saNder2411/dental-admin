import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalCustomersData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectCustomersData = () => {
  const selectCustomersData = useMemo(selectMemoOriginalCustomersData, []);

  const customersData = useSelector(selectCustomersData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { customersData, isDataLoading };
};
