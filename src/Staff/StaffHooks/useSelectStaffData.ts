import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectMemoOriginalStaffData } from '../../_bus/Selectors';
import { selectDataIsLoading } from '../../_bus/UI/UISelectors';

export const useSelectStaffData = () => {
  const selectStaffData = useMemo(selectMemoOriginalStaffData, []);

  const staffData = useSelector(selectStaffData);
  const isDataLoading = useSelector(selectDataIsLoading);

  return { staffData, isDataLoading };
};
