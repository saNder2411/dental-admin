import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectGridMemoActions, selectGridEditField, selectGridDataName } from '../GridSelectors';

export const useGridStateForActionsCell = () => {
  const selectGridActions = useMemo(selectGridMemoActions, []);
  const GridActions = useSelector(selectGridActions);
  const editField = useSelector(selectGridEditField);
  const gridDataName = useSelector(selectGridDataName);

  return { gridDataName, editField, GridActions };
};
