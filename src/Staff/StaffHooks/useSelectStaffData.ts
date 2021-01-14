import { useSelector } from 'react-redux';
// Selectors
import { selectOriginalStaffData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectStaffData = () => {
  const staffData = useSelector(selectOriginalStaffData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { staffData, isDataLoading };
};
