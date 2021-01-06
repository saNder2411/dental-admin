import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalServicesData, selectDataIsLoading } from '../../_sections/Grid/GridSelectors';

export const useSelectServicesData = () => {
  const selectServicesData = useMemo(selectMemoOriginalServicesData, []);

  const servicesData = useSelector(selectServicesData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { servicesData, isDataLoading };
};
