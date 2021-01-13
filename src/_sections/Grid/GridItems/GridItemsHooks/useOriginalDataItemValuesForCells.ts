import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectByIdDataItemFieldValue } from '../../../../_bus/Entities/EntitiesSelectors';
// Types
import { GenericDataItem, EntitiesKeys } from '../../../../_bus/Entities/EntitiesTypes';

export const useOriginalDataItemValuesForCells = <T extends GenericDataItem = GenericDataItem, U = any>(
  ID: number,
  entityName: EntitiesKeys,
  field: keyof T
) => {
  const selectCellValue = useMemo(() => selectByIdDataItemFieldValue<T, U>(ID, entityName, field), [ID, entityName, field]);
  const selectDataItemInEditValue = useMemo(() => selectByIdDataItemFieldValue<T, boolean | undefined>(ID, entityName, `inEdit`), [ID, entityName]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;
  return { cellValue, dataItemInEditValue };
};
