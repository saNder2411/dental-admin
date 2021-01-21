import { useSelector } from 'react-redux';
// Selectors
import { selectOriginalAppointmentsData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectAppointmentsData = () => {
  const appointmentsData = useSelector(selectOriginalAppointmentsData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { appointmentsData, isDataLoading };
};
