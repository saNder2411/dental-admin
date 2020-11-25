import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// Selectors
import { selectGridDataItemMemoValueForCell } from '../../GridSelectors';
// Types
import { GridDataItem } from '../../GridTypes';

export interface Result<T, U = T[keyof T]> {
  memoID: number;
  memoField: keyof T;
  cellValue: U;
  dataItemInEditValue: boolean;
}

export const useMemoDataItemValuesForCells = <U, T = GridDataItem>(ID: number, field: keyof T): Result<T, U> => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);

  const selectCellValue = useMemo(() => selectGridDataItemMemoValueForCell<T>(memoID, memoField), [memoField, memoID]);
  const selectDataItemInEditValue = useMemo(() => selectGridDataItemMemoValueForCell<T>(memoID, (`inEdit` as unknown) as keyof T), [memoID]);

  const cellValue = useSelector(selectCellValue);
  const dataItemInEditValue = useSelector(selectDataItemInEditValue);

  return { memoID, memoField, cellValue, dataItemInEditValue } as { memoID: number, memoField, cellValue, dataItemInEditValue };
};
