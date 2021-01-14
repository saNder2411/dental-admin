import { useSelector } from 'react-redux';
// Selectors
import { selectOriginalServicesData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectServicesData = () => {
  const servicesData = useSelector(selectOriginalServicesData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { servicesData, isDataLoading };
};
