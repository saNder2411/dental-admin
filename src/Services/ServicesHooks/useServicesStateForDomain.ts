import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectServicesMemoData, selectServicesIsDataLoading } from '../ServicesSelectors';

export const useServicesStateForDomain = () => {
  const selectServicesData = useMemo(selectServicesMemoData, []);

  const servicesData = useSelector(selectServicesData);
  const servicesIsDataLoading = useSelector(selectServicesIsDataLoading);

  return { servicesData, servicesIsDataLoading };
};
