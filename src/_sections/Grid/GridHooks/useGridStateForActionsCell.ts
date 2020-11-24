import { useSelector } from 'react-redux';
// Selectors
import { selectGridEditField, selectGridDataName } from '../GridSelectors';

export const useGridStateForActionsCell = () => {
  const editField = useSelector(selectGridEditField);
  const gridDataName = useSelector(selectGridDataName);

  return { gridDataName, editField };
};
