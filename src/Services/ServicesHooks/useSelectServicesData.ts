import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalServicesData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectServicesData = () => {
  const selectServicesData = useMemo(selectMemoOriginalServicesData, []);

  const servicesData = useSelector(selectServicesData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { servicesData, isDataLoading };
};
