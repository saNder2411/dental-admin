import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalAppointmentsData } from '../../_bus/Entities/EntitiesSelectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectAppointmentsData = () => {
  const selectData = useMemo(selectMemoOriginalAppointmentsData, []);

  const appointmentsData = useSelector(selectData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { appointmentsData, isDataLoading };
};
