import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalStaffData, selectDataIsLoading } from '../../_sections/Grid/GridSelectors';

export const useSelectStaffData = () => {
  const selectStaffData = useMemo(selectMemoOriginalStaffData, []);

  const staffData = useSelector(selectStaffData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { staffData, isDataLoading };
};
