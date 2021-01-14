import { useSelector } from 'react-redux';
// Selectors
import { selectOriginalCustomersData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectCustomersData = () => {
  const customersData = useSelector(selectOriginalCustomersData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { customersData, isDataLoading };
};
