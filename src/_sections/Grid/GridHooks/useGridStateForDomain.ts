import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Selectors
import { selectGridMemoData, selectGridDataName, selectGridMemoActions } from '../GridSelectors';

export const useGridStateForDomain = () => {
  const selectGridData = useMemo(selectGridMemoData, []);
  const selectGridActions = useMemo(selectGridMemoActions, []);

  const data = useSelector(selectGridData);
  const dataName = useSelector(selectGridDataName);
  const GridActions = useSelector(selectGridActions);

  return { data, dataName, GridActions };
};
