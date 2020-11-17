import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectServicesMemoActions, selectServicesMemoData, selectServicesIsDataLoading } from '../ServicesSelectors';

export const useServicesStateForDomain = () => {
  const selectServicesData = useMemo(selectServicesMemoData, []);
  const selectServicesActions = useMemo(selectServicesMemoActions, []);

  const servicesData = useSelector(selectServicesData);
  const servicesIsDataLoading = useSelector(selectServicesIsDataLoading);
  const ServicesActions = useSelector(selectServicesActions);

  return { servicesData, servicesIsDataLoading, ServicesActions };
};
