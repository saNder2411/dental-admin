import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Selectors
import { selectGridMemoData, selectGridDataName } from '../GridSelectors';

export const useGridStateForDomain = () => {
  const selectGridData = useMemo(selectGridMemoData, []);

  const data = useSelector(selectGridData);
  const dataName = useSelector(selectGridDataName);

  return { data, dataName };
};

export const useGridStateForDomainID = () => {
  const dataName = useSelector(selectGridDataName);

  return { dataName };
};
