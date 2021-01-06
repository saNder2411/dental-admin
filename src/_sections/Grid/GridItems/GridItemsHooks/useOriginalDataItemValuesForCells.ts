import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectByIdDataItemFieldValue } from '../../GridSelectors';
// Types
import { GridDataItem } from '../../GridTypes';

export const useOriginalDataItemValuesForCells = <T extends GridDataItem = GridDataItem, U = any>(ID: number, field: keyof T) => {
  const selectCellValue = useMemo(() => selectByIdDataItemFieldValue<T, U>(ID, field), [ID, field]);
  const selectDataItemInEditValue = useMemo(() => selectByIdDataItemFieldValue<T, boolean | undefined>(ID, `inEdit`), [ID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = (useSelector(selectDataItemInEditValue) as unknown) as boolean;
  return { cellValue, dataItemInEditValue };
};
