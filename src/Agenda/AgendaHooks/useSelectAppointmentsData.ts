import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalAppointmentsData, selectDataIsLoading } from '../../_sections/Grid/GridSelectors';

export const useSelectAppointmentsData = () => {
  const selectData = useMemo(selectMemoOriginalAppointmentsData, []);

  const appointmentsData = useSelector(selectData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { appointmentsData, isDataLoading };
};